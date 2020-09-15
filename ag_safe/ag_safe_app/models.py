from django.db import models

# Create your models here.


class User(models.Model):
    objects = None
    name = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=100, blank=True)
    image = models.CharField(max_length=100, blank=True)
    role_id = models.IntegerField()
    zipcode = models.CharField(max_length=100, blank=True)
    dob = models.CharField(max_length=100, blank=True)
    status = models.IntegerField()
    register_date = models.DateTimeField(auto_now_add=True)
    user_directory = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.username


class Inspections(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    draft_directory = models.CharField(max_length=100, blank=True)
    draft_name = models.CharField(max_length=100, blank=True)
    draft_form_name = models.CharField(max_length=100, blank=True)
    inspection_title = models.CharField(max_length=100)
    facility = models.CharField(max_length=100)
    stakeholders = models.CharField(max_length=100)
    inspection_type = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    supervisor = models.CharField(max_length=100, blank=True)
    datetime = models.DateField(max_length=50, blank=True)
    status = models.IntegerField(null=True)
    operating_area = models.CharField(max_length=100)
    inspection_approve = models.CharField(max_length=100, blank=True)
    user_id = models.IntegerField()

    def __str__(self):
        return self.inspection_title


class Facility(models.Model):
    objects = None
    facility = models.CharField(max_length=100)

    def __str__(self):
        return self.facility


class Type(models.Model):
    objects = None
    types = models.CharField(max_length=100)
    type_slug = models.CharField(max_length=200, blank=True)
    draft_html = models.TextField()

    def __str__(self):
        return self.types