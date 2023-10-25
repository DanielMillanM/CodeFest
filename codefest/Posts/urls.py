from django.urls import path, re_path
from .views import *
urlpatterns = [
    path('post/',PostView.as_view(),name="post")
]