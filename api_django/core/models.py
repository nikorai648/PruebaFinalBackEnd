from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class TipoTrabajador(models.Model):

    rol_cargo = models.CharField(max_length=60)
    tipo_contrato = models.CharField(max_length=20)

def __str__(self):
        return f"{self.rol_cargo} ({self.tipo_contrato})"



class Trabajador(models.Model):
      rut = models.CharField(max_length=12, unique=True)
      nombre = models.CharField(max_length=60)
      apellido = models.CharField(max_length=60)
      fecha_nacimiento = models.DateField()
      email = models.EmailField(unique=True)
      telefono = models.CharField(max_length=20, blank=True)
      rol_cargo = models.CharField(max_length=60, help_text="Rol o cargo del trabajador")
      tipo_contrato = models.CharField(
        max_length=20,
        help_text="Tipo de contrato (Plazo fijo, Indefinido, Honorarios, etc.)"
    )

      area = models.CharField(max_length=60, blank=True)
      turno = models.CharField(max_length=20)  # DIURNO / NOCTURNO / ROTATIVO
      fecha_ingreso = models.DateField()
      sueldo_base = models.DecimalField(max_digits=12, decimal_places=2, default=0)
      estado = models.CharField(
        max_length=10,
        help_text="ACTIVO / INACTIVO"
    )
      contacto_emergencia = models.CharField(max_length=100, blank=True)
      telefono_emergencia = models.CharField(max_length=20, blank=True)

      def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.rut})"    