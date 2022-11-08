from hashlib import new
from re import T, search
import re
from turtle import st
from unicodedata import category
from django.db.models import query, Q
from django.db.models.query import QuerySet
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from pandas import timedelta_range
from rest_framework import viewsets
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.serializers import Serializer
from rest_framework.utils import serializer_helpers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
# from .functions import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Empty, Request
from rest_framework.response import Response

import json
import datetime, time
import numpy as np
import itertools as it
from collections import defaultdict, Counter
from tablib import Dataset
from .resources import *

class UserListView(ListAPIView):
    serializer_class = UserSerializer   
    def get(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        
        context = {
            "Status": 200,
            "payload": serializer.data
        }
        
        return Response(context)
