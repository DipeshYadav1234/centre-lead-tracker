from django.urls import path
from .views import today_followups

urlpatterns = [
    path("today/", today_followups),
]