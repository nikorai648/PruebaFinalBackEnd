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

