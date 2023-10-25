from rest_framework.views import APIView
from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import EmailMessage
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.conf import settings
from .serializers import *
from django.contrib.auth import get_user_model,logout
from .models import *
from .models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import *

user2 = User.objects.all()
#Ver usuarios
class Users(APIView):
    def get(self,request):
        user = user2
        serializer = UserSerializer(user,many=True)
        return Response(serializer.data)

#registro de usuario en la API    
class Register(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():       
            #crear el usuario
            user = User.objects.create_user(**serializer.validated_data)
            user.save()

            #mandamos un correo para verificar
            page = get_current_site(request)
            mail = 'Activa tu cuenta para continuar'
            body = render_to_string('verificar.html',{
                'user':user,
                'domain':page,
                'user_id':urlsafe_base64_encode(force_bytes(user.pk)),
                'token':default_token_generator.make_token(user)
            })
            
            user_email = serializer.validated_data['email']
            send_mail = EmailMessage(
                mail,body,settings.EMAIL_HOST_USER,to=[user_email]
            )
            send_mail.from_email = False
            send_mail.send()
            
            return Response({'message': 'Usuario registrado, verifique su correo'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

#vista solo de activacion de cuenta bajo funcion
class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        User = get_user_model()
        try:
            user_id = urlsafe_base64_decode(uidb64).decode()
            user = User._default_manager.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            
            serialized_user = UserSerializer(user) 
            
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Enlace de activación inválido'}, status=status.HTTP_400_BAD_REQUEST)

#funcion para el envio del correo para recuperar contrasena
class ForgotView(APIView):
    def post(self,request):
        email = request.data.get('email')
        #validamos que el usuario exista
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email__exact=email)
            
            #parametros del correo que leera el usuario
            page = get_current_site(request)
            mail = 'Restaura tu contrasena'
            body = render_to_string('restaurar.html',{
                'user':user,
                'domain':page,
                'user_id':urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user)
            })
            user_email = email
            send_mail = EmailMessage(
                mail,body,settings.EMAIL_HOST_USER,to=[user_email]
            )
            send_mail.from_email = False
            send_mail.send()
            
            return Response({"message":"correo enviado"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'La cuenta no existe'}, status=status.HTTP_400_BAD_REQUEST)

        
#funcion para validar al usuario
class validation_user(APIView):
    def get(self, request, uidb64, token):
        User = get_user_model()
        try:
            user_id = urlsafe_base64_decode(uidb64).decode()
            user = User._default_manager.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            
            serialized_user = UserSerializer(user) 
            
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Enlace de activación inválido'}, status=status.HTTP_400_BAD_REQUEST)
    
#VISTAS PARA FOLLOW
class FollowingView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer, request):
        user_id = request.data.ge("id")
        followed_user = get_object_or_404(User, id=user_id)
        if self.request.user != followed_user:
            self.request.user.following.add(followed_user)
            serializer.save()
            return Response({'Message': 'Ahora sigues a este usuario.'}, status=status.HTTP_201_CREATED)
        return Response({'Message': 'No puedes seguirte a ti mismo.'}, status=status.HTTP_400_BAD_REQUEST)

class UnFollowingView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer, request):
        user_id = request.data.ge("id")
        followed_user = get_object_or_404(User, id=user_id)
        if self.request.user != followed_user:
            self.request.user.following.remove(followed_user)
            serializer.save()
            return Response({'Message': 'Ahora sigues a este usuario.'}, status=status.HTTP_201_CREATED)
        return Response({'Message': 'No puedes seguirte a ti mismo.'}, status=status.HTTP_400_BAD_REQUEST)

#Enviar solicitud de amistad
class FriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        p = request.data.get("id")
        pending = User.objects.get(id=p)
        try:
            FriendRequest.objects.get(user=user, pending=pending).delete()
            return Response({"Message": "Eliminaste la solicitud de amistad"})
        except:
            solicitud =FriendRequest.objects.create(user=user, pending=pending)
            serializer = FriendRequestSerializer(solicitud)
            return Response(serializer.data)

#Aceptar solicitud de amistad
class FriendsView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        friend = request.data.get("id")

        solicitud =Friends.objects.create(user=user, friend=friend)
        serializer = FriendsSerializer(solicitud)
        return Response(serializer.data)
    
