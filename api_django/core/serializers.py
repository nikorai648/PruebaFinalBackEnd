from rest_framework import serializer
from SerialApp.models import Tipotrabajador, Trabajador, Accidente, Asistencia, EficienciaTrabjador, DesempenoTrabajador, SueldoTrabajador


class Tipotrabajador(serializer.ModeSerializer):
    class Meta:
        model = Tipotrabajador
        fields = '__all__'

class Trabajador(serializer.ModeSerializer):
    class Meta:
        model = Trabajador
        fields = '__all__'