from django.db import models
from Users.models import User

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    text = models.CharField(max_length=280, null=True)
    #img = models.ImageField(upload_to='imgs/post_img', null=True)
    video = models.CharField(max_length=500)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
    
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.IntegerField()
    post = models.IntegerField()
    text = models.CharField(max_length=280)

class Like(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.IntegerField(unique=True)
    post = models.IntegerField()