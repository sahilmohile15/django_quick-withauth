from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


api_name = 'statis'

# Registering Rest-API routes for Users
router = DefaultRouter()
# router.register(r'users', views.UserListView, 'user')

urlpatterns = [
    path('', include(router.urls)),
    
    # API for Authentication System URL's
    path('users/', views.UserListView.as_view(), name="users_list"),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    
    
]


