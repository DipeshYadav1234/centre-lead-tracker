from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from leads.models import Lead
from leads.serializers import LeadSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def today_followups(request):

    today = timezone.localdate()

    if request.user.is_staff:
        leads = Lead.objects.filter(
            is_archived=False,
            next_followup__date=today
        ).order_by("next_followup")

    else:
        leads = Lead.objects.filter(
            assigned_owner=request.user,
            is_archived=False,
            next_followup__date=today
        ).order_by("next_followup")

    serializer = LeadSerializer(leads, many=True)

    return Response(serializer.data)