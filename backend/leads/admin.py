from django.contrib import admin
from .models import Lead
# Register your models here.



@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "parent_name",
        "child_name",
        "phone",
        "status",
        "assigned_owner",
        "next_followup",
    )

    search_fields = (
        "parent_name",
        "child_name",
        "phone",
    )

    list_filter = (
        "status",
        "preferred_centre",
        "assigned_owner",
    )