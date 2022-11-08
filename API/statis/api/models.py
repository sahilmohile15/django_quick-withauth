from ast import Sub
from operator import mod
import re
from unicodedata import category
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.deletion import CASCADE, DO_NOTHING, SET_NULL
from django.db.models.fields import AutoField
from django.utils.deconstruct import deconstructible
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator
from treebeard.mp_tree import MP_Node
from simple_history.models import HistoricalRecords

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError("Valid Email Address required.")

        if not username:
            raise ValueError("Valid username is Required.")

        user = self.model(
            email = self.normalize_email(email),
            username = (username)
        )

        user.set_password(password)
        user.is_teacher = True
        user.save(using = self._db)
        return user

    def create_superuser(self, email, username, password=None):
        
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """

        user = self.create_user(
            email = self.normalize_email(email),
            password=password,
            username= username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

USER_CHOICES = [ 
    ('parent', 'Parent'),
    ('teacher', 'Teacher'),
]

# Custom User Model
class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    username = models.CharField(verbose_name='username', max_length = 100, unique=True)
    name = models.CharField(max_length = 100)
    date_joined = models.DateTimeField(verbose_name="date-joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last-login", auto_now=True)
    u_type = models.CharField(choices=USER_CHOICES, max_length=255, default='teacher')
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=True)
    is_parent = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email',]

    objects = UserManager()
    
    def __str__(self):
        # return self.email
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
