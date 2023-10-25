from django.urls import path
from .views import *

urlpatterns = [
    path('chat/',ChatVIew.as_view(),name='chat')
]