from django.contrib import admin
from .models import Inspections, User, Facility, Type

# Register your models here.

admin.site.register(Inspections)
admin.site.register(User)
admin.site.register(Facility)
admin.site.register(Type)

