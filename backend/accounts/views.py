from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse

# Create your views here.


class TestView(APIView):

    def get(self, request):
        return JsonResponse("You made it", safe=False)
