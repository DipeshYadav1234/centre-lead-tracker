from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.filter(is_archived=False).order_by("-created_at")
    serializer_class = LeadSerializer

    def destroy(self, request, *args, **kwargs):
        """
        Archive instead of permanently deleting.
        """
        lead = self.get_object()
        lead.is_archived = True
        lead.save()

        return Response(
            {"message": "Lead archived successfully."},
            status=status.HTTP_200_OK
        )

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