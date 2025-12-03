from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Trabajador
from .serializers import TrabajadorSerializer


@api_view(['GET', 'POST'])
def trabajador_list(request):
    """
    GET  /api/trabajadores/      → lista todos
    POST /api/trabajadores/      → crea uno nuevo
    """
    if request.method == 'GET':
        trabajadores = Trabajador.objects.all()
        serializer = TrabajadorSerializer(trabajadores, many=True)
        return Response(serializer.data)
    
    
    if request.method == 'POST':
        serializer = TrabajadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


