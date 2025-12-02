from rest_framework import serializer
from SerialApp.models import Tipotrabajador, Trabajador, Accidente, Asistencia, EficienciaTrabajador, DesempenoTrabajador, SueldoTrabajador


class Tipotrabajador(serializer.ModelSerializer):
    class Meta:
        model = Tipotrabajador
        fields = '__all__'

class Trabajador(serializer.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = '__all__'

class Accidente(serializer.ModelSerializer):
    class Meta:
        model = Accidente
        fields = '__all__'

class Asistencia(serializer.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'

class EficienciaTrabajador(serializer.ModelSerializer):
    class Meta:
        model = EficienciaTrabajador
        fields = '__all__'

class DesempenoTrabajador(serializer.ModelSerializer):
    class Meta:
        model = DesempenoTrabajador
        fields = '__all__'              

class SueldoTrabajador(serializer.ModelSerializer):
    class Meta:
        model = SueldoTrabajador
        fields = '__all__'