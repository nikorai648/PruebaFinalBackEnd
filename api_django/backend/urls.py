"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/trabajadores/', views.trabajador_list, name='trabajador_list'),
    path('api/trabajadores/<int:pk>/', views.trabajador_detail, name='trabajador_detail'),
    path('api/asistencias/', views.asistencia_list, name='asistencia_list'),
    path('api/asistencias/<int:pk>/', views.asistencia_detail, name='asistencia_detail'),
]
