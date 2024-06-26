"""
URL configuration for gpt_games project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from rest_framework.permissions import AllowAny
from django.views.generic import TemplateView

from rest_framework.authtoken.views import obtain_auth_token


schema_view = get_schema_view(
    title="API Schema",
    description="API for all things …",
    version="1.0.0",
    public=True,
    permission_classes=[AllowAny],
    authentication_classes=[]  # Para deshabilitar autenticación en esta vista
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user.urls')),
    path('', include('games.urls')),
    path('', include('billing_info.urls')),
    path('', include('offer.urls')),
    path('', include('review.urls')),
    path('', include('transaction.urls')),
    path('', include('shopping_car.urls')),
    path('', include('car_contains_offer.urls')),
    path('api_schema/', schema_view, name='api_schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url': 'api_schema'}
    ), name='swagger-ui'),

    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
