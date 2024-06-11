from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import User
from .serializers import UserSerializer
import logging
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError

logger = logging.getLogger(__name__)


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        logger.info(f'User created: {user.username}, Token: {token.key}')
        return Response({'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    errors = {}

    if 'username' not in request.data:
        errors['username'] = ["Username is required."]
    if 'password' not in request.data:
        errors['password'] = ["Password is required."]
    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, username=request.data['username'])

    if not user.check_password(request.data['password']):
        return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user, context={'request': request})
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request, format=None):
    serialiazer = UserSerializer(
        data=request.data, context={'request': request})

    if serialiazer.is_valid():

        if len(serialiazer.validated_data['password']) < 8:
            return Response({"detail": "password too short"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = serialiazer.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user': serialiazer.data}, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({"detail": "Username or email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        # Retorna el perfil del usuario autenticado
        user = request.user
        logger.info(f'Authenticated user: {user}')
        serializer = UserSerializer(user, context={'request': request})
        token, created = Token.objects.get_or_create(user=user)
        return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_200_OK)
