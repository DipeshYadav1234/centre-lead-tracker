from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from leads.models import Lead
from leads.serializers import LeadSerializer


class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        print("Logged in user:", request.user.username)
        my_leads = Lead.objects.filter(
            assigned_owner=request.user,
            is_archived=False
        ).order_by("-created_at")

        serializer = LeadSerializer(my_leads, many=True)

        data = {
            "total_leads": my_leads.count(),
            "converted": my_leads.filter(status="Converted").count(),
            "pending": my_leads.exclude(status="Converted").count(),
            "leads": serializer.data,
        }

        return Response(data)

    