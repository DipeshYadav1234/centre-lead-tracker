from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random

from leads.models import Lead


class Command(BaseCommand):
    help = "Seed database with sample leads"

    def handle(self, *args, **kwargs):

        users = list(User.objects.filter(is_staff=True))

        if not users:
            self.stdout.write(
                self.style.ERROR(
                    "No staff users found. Create at least one staff user first."
                )
            )
            return

        centres = [
            "Andheri",
            "Borivali",
            "Thane",
            "Mulund",
            "Powai",
            "Dadar",
        ]

        sources = [
            "Website",
            "Facebook",
            "Instagram",
            "Google",
            "Referral",
            "Walk-in",
        ]

        statuses = [
            "New",
            "Contacted",
            "Demo Scheduled",
            "Demo Completed",
            "Converted",
            "Lost",
        ]

        parents = [
            "Rahul Sharma",
            "Priya Patel",
            "Amit Verma",
            "Sneha Joshi",
            "Karan Singh",
            "Neha Kapoor",
            "Rakesh Mehta",
            "Pooja Shah",
            "Vikas Yadav",
            "Manoj Desai",
            "Anjali Gupta",
            "Suresh Patil",
            "Meera Nair",
            "Deepak Kulkarni",
            "Sunita Rao",
            "Akash Jain",
            "Nitin Bansal",
            "Rekha Iyer",
            "Harsh Agarwal",
            "Shweta Mishra",
        ]

        children = [
            "Aarav",
            "Anaya",
            "Rohan",
            "Diya",
            "Vivaan",
            "Ishaan",
            "Krish",
            "Kiara",
            "Aditya",
            "Aryan",
            "Myra",
            "Tanmay",
            "Riya",
            "Arjun",
            "Sara",
            "Dhruv",
            "Kabir",
            "Anika",
            "Ayaan",
            "Vihaan",
        ]

        created = 0
        skipped = 0

        for i in range(20):

            email = f"user{i+1}@gmail.com"

            # Skip only duplicate email
            if Lead.objects.filter(email=email).exists():
                skipped += 1
                continue

            Lead.objects.create(
                parent_name=parents[i],
                child_name=children[i],
                child_age=random.randint(4, 10),
                phone=f"98{random.randint(10000000,99999999)}",
                email=email,
                preferred_centre=random.choice(centres),
                source=random.choice(sources),
                status=random.choice(statuses),
                assigned_owner=random.choice(users),
                next_followup=timezone.now() + timedelta(days=random.randint(1, 15)),
                notes="Interested in admission.",
                is_archived=False,
            )

            created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created} leads added successfully. {skipped} duplicate leads skipped."
            )
        )