from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import *
from django.utils import timezone


class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username",read_only=True)
    date_created = serializers.DateTimeField(format='%Y-%m-%d')
    days_ago= serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('text', 'video', 'user', 'date_created','days_ago')
    
    def get_days_ago(self, obj):
        today = timezone.now()
        delta = today - obj.date_created
        return delta.days

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'        
