from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import export_leads_csv
from .views import LeadViewSet, CurrentUserView,UserListView

router = DefaultRouter()
router.register(r"leads", LeadViewSet, basename="leads")

urlpatterns = [
    path(
        "me/",
        CurrentUserView.as_view(),
        name="current-user",
    ),

    path(
        "",
        include(router.urls),
    ),
    path("users/", UserListView.as_view(), name="users"),
    path("export-csv/", export_leads_csv),

    
]