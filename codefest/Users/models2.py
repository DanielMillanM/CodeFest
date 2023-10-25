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

#Enviar solicitud de amistad
class FriendRequestView2(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        p = FriendRequest.objects.filter(pending=user.id)
        serializer = FriendRequestSerializer(p,many=True)
        return Response(serializer.data)
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
        
#Ver info del usuario
class User(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
