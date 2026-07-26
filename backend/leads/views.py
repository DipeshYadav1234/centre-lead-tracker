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
from django.shortcuts import get_object_or_404
import os
from django.conf import settings

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

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def complete_followup(request, pk):

    lead = get_object_or_404(Lead, pk=pk)

    if not request.user.is_staff and lead.assigned_owner != request.user:
        return Response(
            {"detail": "Permission denied"},
            status=403
        )

    lead.status = request.data.get("status", lead.status)
    lead.notes = request.data.get("notes", lead.notes)
    lead.next_followup = request.data.get(
        "next_followup",
        lead.next_followup
    )

    lead.save()

    return Response({"message": "Follow-up updated successfully"})


@api_view(["POST"])
def register_user(request):

    company_code = request.data.get("company_code")

    if company_code != settings.COMPANY_CODE:
        return Response(
            {"error": "Invalid Company Code"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name,
    )

    user.is_staff = True
    user.is_superuser = False
    user.save()

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED,
    )