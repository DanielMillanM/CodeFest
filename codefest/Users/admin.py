from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    filter_horizontal = ()
    list_display = ['username', 'email', 'name', 'last_name','is_superuser','is_active']
    list_filter = ['is_staff', 'is_superuser', 'is_active']
    search_fields = ('username', 'email', 'name', 'last_name')
    ordering = ('last_name',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

admin.site.register(User, CustomUserAdmin)

