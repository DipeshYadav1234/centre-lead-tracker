from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes
import csv
from django.http import HttpResponse
from django.contrib.auth.models import User

from .models import Lead
from .serializers import LeadSerializer, UserSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.filter(
        is_archived=False
    ).order_by("-created_at")

    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]

    # Archive Lead
    def destroy(self, request, *args, **kwargs):
        lead = self.get_object()
        lead.is_archived = True
        lead.save()

        return Response(
            {"message": "Lead archived successfully."},
            status=status.HTTP_200_OK,
        )

    # Update Lead
    def update(self, request, *args, **kwargs):
        lead = self.get_object()

        if lead.status in ["Converted", "Lost"]:

            allowed = {"notes"}

            for field in request.data.keys():
                if field not in allowed:
                    return Response(
                        {
                            "error": "Closed leads can only update notes."
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

        return super().update(request, *args, **kwargs)

    # GET /api/leads/archived/
    @action(detail=False, methods=["get"])
    def archived(self, request):
        leads = Lead.objects.filter(
            is_archived=True
        ).order_by("-updated_at")

        serializer = self.get_serializer(leads, many=True)
        return Response(serializer.data)

    # POST /api/leads/{id}/restore/
    @action(detail=True, methods=["post"])
    def restore(self, request, pk=None):
        try:
            lead = Lead.objects.get(pk=pk)
        except Lead.DoesNotExist:
            return Response(
                {"error": "Lead not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        lead.is_archived = False
        lead.save()

        return Response(
            {"message": "Lead restored successfully."},
            status=status.HTTP_200_OK,
        )


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    queryset = User.objects.filter(
        is_active=True
    ).order_by("username")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_leads_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="leads.csv"'

    writer = csv.writer(response)

    writer.writerow([
        "Parent Name",
        "Child Name",
        "Child Age",
        "Phone",
        "Email",
        "Preferred Centre",
        "Source",
        "Status",
        "Assigned Owner",
        "Next Follow-up",
        "Notes",
        "Created At",
    ])

    leads = Lead.objects.filter(is_archived=False).order_by("-created_at")

    for lead in leads:
        writer.writerow([
            lead.parent_name,
            lead.child_name,
            lead.child_age,
            lead.phone,
            lead.email,
            lead.preferred_centre,
            lead.source,
            lead.status,
            lead.assigned_owner.username if lead.assigned_owner else "",
            lead.next_followup,
            lead.notes,
            lead.created_at,
        ])

    return response