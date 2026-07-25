from django.db import models
from django.contrib.auth.models import User


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

    phone = models.CharField(max_length=20)

    normalized_phone = models.CharField(
        max_length=10,
        editable=False,
        db_index=True
    )

    email = models.EmailField()

    preferred_centre = models.CharField(max_length=100)

    source = models.CharField(max_length=100)

    assigned_owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_leads"
    )

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
    
    def save(self, *args, **kwargs):

        phone = self.phone.replace(" ", "").replace("-", "")

        if phone.startswith("+91"):
            phone = phone[3:]

        if phone.startswith("91") and len(phone) == 12:
            phone = phone[2:]

        if phone.startswith("0") and len(phone) == 11:
            phone = phone[1:]

        self.normalized_phone = phone

        super().save(*args, **kwargs)