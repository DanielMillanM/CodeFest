from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from .models2 import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Obtener token de acceso
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Renovar token de acceso
    path('create/',Register.as_view(),name='create_user'), #vista para crear usuarios
    path('activate/<str:uidb64>/<str:token>/',ActivateAccountView.as_view(),name='activate'), #vista para activar usuario
    path('forgot/',ForgotView.as_view(),name='olvidar'), #vista para activar usuario
    path('user/',User.as_view(),name="user"),
    path('users/',Users.as_view(),name="users"),
    path('solicitud/',FriendRequestView2.as_view(),name="solicitud"),
    path('amigos/',FriendsView.as_view(),name="amigos"),
]