from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Branch
from .serializers import BranchSerializer

# Create your views here.
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer