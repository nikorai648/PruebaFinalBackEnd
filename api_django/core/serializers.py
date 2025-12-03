from rest_framework import serializers
from .models import (   Trabajador, TipoTrabajador, Asistencia, Accidente, EficienciaTrabajador, DesempenoTrabajador, SueldoTrabajador
)

class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = "__all__"

class TipoTrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoTrabajador
        fields = "__all__"

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = "__all__"        

class AccidenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accidente
        fields = "__all__"

class EficienciaTrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EficienciaTrabajador
        fields = "__all__"

class DesempenoTrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesempenoTrabajador
        fields = "__all__"

class SueldoTrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SueldoTrabajador
        fields = "__all__"