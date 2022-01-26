from django.db import models


# Create your models here.
class UserModel(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email_id = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    user_age = models.IntegerField(null=True)
    date_of_birth = models.DateField(null=True)
    contact_no = models.CharField(null=True, max_length=20)
    last_login = models.DateField(null=True)

