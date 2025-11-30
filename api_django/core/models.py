from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class TipoTrabajador(models.Model):

    rol_cargo = models.CharField(max_length=60)
    tipo_contrato = models.CharField(max_length=20)

def __str__(self):
        return f"{self.rol_cargo} ({self.tipo_contrato})"
