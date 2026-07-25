from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead
        fields = "__all__"

    def validate(self, data):

        phone = data["phone"]

        normalized = (
            phone.replace(" ", "")
                 .replace("-", "")
                 .replace("+91", "")
        )

        if normalized.startswith("91") and len(normalized) == 12:
            normalized = normalized[2:]

        if normalized.startswith("0") and len(normalized) == 11:
            normalized = normalized[1:]

        exists = Lead.objects.filter(
            normalized_phone=normalized,
            is_archived=False
        )

        if self.instance:
            exists = exists.exclude(pk=self.instance.pk)

        if exists.exists():

            raise serializers.ValidationError(
                {
                    "phone":
                    "An active lead already exists with this phone number."
                }
            )

        return data