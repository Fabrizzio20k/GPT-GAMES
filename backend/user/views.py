from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db.utils import IntegrityError
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer


# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
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
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serialiazer = UserSerializer(data=request.data)

    if serialiazer.is_valid():

        if( len(serialiazer.validated_data['password']) < 8):
            return  Response({"detail": "password too short"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serialiazer.save()
            user = User.objects.get(username=serialiazer.data['username'])
            user.set_password(serialiazer.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user': serialiazer.data}, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({"detail": "Username or email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]