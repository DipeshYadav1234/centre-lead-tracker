from django.db import models

# Create your models here.


class Lead(models.Model):
    STATUS_CHOICES = [
        ("New", "New"),
        ("Contacted", "Contacted"),
        ("Demo Scheduled", "Demo Scheduled"),
        ("Demo Completed", "Demo Completed"),
        ("Converted", "Converted"),
        ("Lost", "Lost"),
    ]

    parent_name = models.CharField(max_length=100)
    child_name = models.CharField(max_length=100)
    child_age = models.PositiveIntegerField()

    phone = models.CharField(max_length=15)
    email = models.EmailField()

    preferred_centre = models.CharField(max_length=100)
    source = models.CharField(max_length=100)

    assigned_owner = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="New"
    )

    next_followup = models.DateTimeField()

    notes = models.TextField(blank=True)

    is_archived = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.parent_name} - {self.child_name}"