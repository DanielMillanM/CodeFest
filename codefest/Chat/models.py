from django.db import models
from Users.models import User

class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User,on_delete=models.CASCADE,related_name="sender")
    responser = models.ForeignKey(User,on_delete=models.CASCADE,related_name="resonser")
    text = models.CharField(max_length=280)
    date = models.DateTimeField(auto_now=True)