from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LeadViewSet, CurrentUserView

router = DefaultRouter()
router.register(r"leads", LeadViewSet)

urlpatterns = [
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path("", include(router.urls)),
]