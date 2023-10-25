from django.shortcuts import render
from .models import *
from rest_framework.parsers import FileUploadParser
from rest_framework import status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView

class PostView(APIView):
    #Autenticarse para poner producto en favorito
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        post = Post.objects.all()
        serializer = PostSerializer(post,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        user = request.user
        video = request.data.get('video')
        text = request.data.get('text')

        post = Post.objects.create(user=user,text=text,video=video)
        serializers = PostSerializer(post)
        return Response(serializers.data)

class CommentView(APIView):
    #Autenticarse para poner producto en favorito
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        post = request.data.get('post_id')
        text = request.data.get('post_txt')

        comment = Comment.objects.create(user=user,text=text,post=post)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
class LikeView(APIView):
    #Autenticarse para poner producto en favorito
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        post = request.data.get('post_id')

        like = Like.objects.create(user=user,post=post)
        serializer = LikeSerializer(like)
        return Response(serializer.data)


