# 📌 Centre Lead Tracker

A full-stack Lead Management CRM built using **React**, **Django REST Framework**, **MySQL**, and **JWT Authentication**.

The application helps educational centres manage enquiries, assign leads to staff members, schedule follow-ups, monitor conversions, and keep track of daily activities through separate Admin and Staff dashboards.

---

# 🚀 Features

## Authentication
- JWT Authentication
- Secure Login & Logout
- Staff Registration using Company Code
- Role-based Access Control
- Admin and Staff dashboards

---

## Admin Features

- Dashboard with statistics
- Create new leads
- Edit leads
- Delete (Archive) leads
- Restore archived leads
- Assign leads to staff
- Export leads to CSV
- Daily follow-up management
- Complete follow-ups
- Update lead status
- Notes management
- Next follow-up scheduling

---

## Staff Features

- View assigned leads
- Update lead status
- Dashboard statistics
- View personal leads
- Logout securely

---

## Lead Management

- Parent Information
- Child Information
- Phone & Email
- Preferred Centre
- Lead Source
- Status Tracking
- Notes
- Next Follow-up
- Assigned Staff

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Django
- Django REST Framework
- Simple JWT

## Database

- MySQL

---

# 📂 Project Structure

```
centre-lead-tracker/
│
├── backend/
│   ├── config/
│   ├── dashboard/
│   ├── followups/
│   ├── leads/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/centre-lead-tracker.git

cd centre-lead-tracker
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Apply migrations

```bash
python manage.py migrate
```

Run backend

```bash
python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
SECRET_KEY=your_secret_key

DEBUG=True

DB_NAME=centre_lead_tracker

DB_USER=root

DB_PASSWORD=your_password

DB_HOST=localhost

DB_PORT=3306

COMPANY_CODE=YOUR_COMPANY_CODE
```

---

# 📊 User Roles

## Admin

- Manage all leads
- Assign staff
- Export CSV
- Archive & Restore leads
- Complete follow-ups
- Dashboard analytics

---

## Staff

- View assigned leads
- Update lead status
- Complete follow-ups
- Dashboard overview

---

# 📷 Screenshots

Create a folder named **screenshots** and add images like:

```
screenshots/

login.png

register.png

admin-dashboard.png

staff-dashboard.png

followups.png

archive.png
```

Then include them:

```markdown
## Login

![Login](screenshots/login.png)

## Admin Dashboard

![Dashboard](screenshots/admin-dashboard.png)

## Staff Dashboard

![Staff](screenshots/staff-dashboard.png)
```

---

# 📌 Future Enhancements

- Email Notifications
- SMS Notifications
- Dashboard Charts
- Search & Advanced Filters
- Activity Logs
- Lead Import from Excel
- Calendar Integration
- User Profile Management
- Password Reset
- Pagination
- Dark Mode

---

# 📖 API Endpoints

## Authentication

```
POST /api/token/

POST /api/token/refresh/
```

---

## Leads

```
GET /api/leads/

POST /api/leads/

PUT /api/leads/{id}/

DELETE /api/leads/{id}/

GET /api/leads/archived/

POST /api/leads/{id}/restore/
```

---

## Dashboard

```
GET /api/dashboard/
```

---

## Follow-ups

```
GET /api/followups/today/

PATCH /api/leads/{id}/followup/
```

---

## Users

```
GET /api/leads/users/

GET /api/leads/me/

POST /api/leads/register/
```

---

# 👨‍💻 Author

**Dipesh Govind Yadav**

Full Stack Web Developer

GitHub: https://github.com/DipeshYadav1234

LinkedIn: https://linkedin.com/in/dipeshyadav

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---
