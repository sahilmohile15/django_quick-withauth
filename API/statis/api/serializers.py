from operator import mod
from pyexpat import model
from turtle import mode
from django.db import models
from django.db.models import fields
from rest_framework import response, serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from allauth.account.adapter import get_adapter
from datetime import datetime, timedelta
from django.contrib.auth.hashers import make_password

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","email", "username", "password", "name")


# Register Serializer
class RegisterUserSerializer(RegisterSerializer):
    u_type = serializers.ChoiceField(choices=[('parent', 'Parent'), ('teacher', 'Teacher')])
    name = serializers.CharField(max_length=100)
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "name",
            "password",
            "u_type",
        )
        
        def get_cleaned_data(self):
            return {
            'username': self.validated_data.get('username', ''),
            'name': self.validated_data.get('name', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'u_type': self.validated_data.get('u_type')
        }

        # override save method of RegisterSerializer
        def save(self, request):
            # adapter = get_adapter()
            user = super().save(request)
            self.cleaned_data = self.get_cleaned_data()
            print(self.cleaned_data)
            user.name = self.cleaned_data.get('name')
            user.u_type = self.cleaned_data.get('u_type')
            user.save()
            # adapter.save_user(request, user, self)
            
            return user


# Register Serializer
class RegisterParentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "is_parent"
            "subject",
        )
        # extra_kwargs = {'password': {'write_only': True }}

    def create_user(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            validated_data["is_parent"],
        )

        return user


# Login Serializer
class CustomLoginSerializer(LoginSerializer):
    # username = serializers.CharField()
    # password = serializers.CharField(
    #     style={'input_type': 'password'}, trim_whitespace=True)

    # class Meta:
    #     model = User
    #     fields = ('username', 'password')
    # def validate(self, data):
    #     user = authenticate(**data)
    #     if user:
    #         return user
    #     raise serializers.ValidationError("Incorrect Credentials")
    
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            if User.objects.filter(username=username).exists():
                user = authenticate(request=self.context.get('request'),
                                    username=username, password=password)

            else:
                msg = {'detail': 'Username is not registered.',
                       'register': False}
                raise serializers.ValidationError(msg)

            if not user:
                msg = {
                    'detail': 'Unable to log in with provided credentials.', 'register': True}
                raise serializers.ValidationError(msg, code='authorization')

        else:
            msg = 'Must include "username" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

