from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Trabajador, Asistencia
from .serializers import TrabajadorSerializer,  AsistenciaSerializer


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

@api_view(['GET', 'PUT', 'DELETE'])
def trabajador_detail(request, pk):
    """
    GET    /api/trabajadores/<pk>/   → detalle
    PUT    /api/trabajadores/<pk>/   → actualizar
    DELETE /api/trabajadores/<pk>/   → borrar
    """
    try:
        trabajador = Trabajador.objects.get(pk=pk)
    except Trabajador.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TrabajadorSerializer(trabajador)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TrabajadorSerializer(trabajador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        trabajador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def asistencia_list(request):
    """
    GET  /api/asistencias/      → lista todas
    POST /api/asistencias/      → crea una nueva
    """
    if request.method == 'GET':
        asistencias = Asistencia.objects.all()
        serializer = AsistenciaSerializer(asistencias, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = AsistenciaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def asistencia_detail(request, pk):
    """
    GET    /api/asistencias/<pk>/   → detalle
    PUT    /api/asistencias/<pk>/   → actualizar
    DELETE /api/asistencias/<pk>/   → borrar
    """
    try:
        asistencia = Asistencia.objects.get(pk=pk)
    except Asistencia.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AsistenciaSerializer(asistencia)
        return Response(serializer.data)
