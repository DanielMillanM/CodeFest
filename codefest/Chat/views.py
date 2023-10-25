from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated

class ChatVIew(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        sender = request.user
        responser = request.data.get("r")
        text = request.data.get("text")

        data = {
            'sender':sender,
            'responser':responser,
            'text':text
        }

        serializer = ChatSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Handle invalid data or validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
