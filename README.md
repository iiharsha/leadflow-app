# Leads Management CRM

A lightweight CRM built with Next.js and Supabase for managing leads, tracking their status, and recording interaction notes. Designed for simple lead ingestion through secure API endpoints and an internal dashboard for managing the pipeline.

---

# Tech Stack

- Next.js 16 (App Router)
- Supabase (PostgreSQL + Auth)
- TypeScript
- Tailwind CSS
- shadcn/ui

---

# Features

- Lead management dashboard
- Create and track leads
- Update lead status
- Add interaction notes
- Timeline view of all lead interactions
- Secure API ingestion for external systems
- Supabase Row Level Security support
- Server Actions for mutations

---

# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/iiharsha/leadflow-app leads-management-app
cd leads-management-app
````

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env.local` file.

```
NEXT_PUBLIC_SUPABASE_URL=https://sgtsjocdrzjvphdrtpak.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VMcmaXZEr3pEdUhwXA_1MA_RItLgWgG

API_SECRET_KEY=my_secret_key
SUPABSE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

You can obtain the API_SECRET_KEY and SUPABSE_SERVICE_ROLE_KEY from me :)

---

## 4. Run the development server

```bash
npm run dev
```

Application will run at:

```
http://localhost:3000
```

---

# Authentication

The dashboard requires a logged-in user. Supabase authentication is used to protect internal routes such as:

```
/leads/*
```

Unauthenticated users are redirected to the login page.

---

# External API Endpoints

The application exposes ingestion endpoints under:

```
/api/*
```

These endpoints allow external systems (marketing tools, forms, automation systems, etc.) to push leads into the CRM.

All endpoints require an **API key**.

---

# API Authentication

Requests must include the following header:

```
x-api-key: <your-api-key>
```

Example:

```
x-api-key: my_secret_key
```

The server validates this key against the environment variable:

```
API_SECRET_KEY
```

Requests without the correct key will be rejected.

---

# Endpoints

## Create Lead

```
POST /api/leads
```

Creates a new lead in the system.

### Headers

```
Content-Type: application/json
x-api-key: my_secret_key
```

### Body

```json
{
  "name": "John Doe",
  "phone": "+919876543210",
  "city": "Hyderabad",
  "source": "website"
}
```

### Example cURL

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -H "x-api-key: my_secret_key" \
  -d '{
    "name": "John Doe",
    "phone": "+919876543210",
    "city": "Hyderabad",
    "source": "website"
  }'
```

---

## Add Lead Note

```
POST /api/leads/{leadId}/notes
```

Adds a note or interaction to a lead.

### Headers

```
Content-Type: application/json
x-api-key: my_secret_key
```

### Body

```json
{
  "note_text": "Customer requested pricing details"
}
```

---

## Update Lead Status

```
PATCH /api/leads/{leadId}
```

Updates the status of an existing lead.

### Headers

```
Content-Type: application/json
x-api-key: my_secret_key
```

### Body

```json
{
  "status": "contacted"
}
```

Possible statuses include:

```
new
contacted
qualified
lost
converted
```

---

# Database Structure

## leads

| column     | type      |
| ---------- | --------- |
| id         | uuid      |
| name       | text(required, unique)      |
| phone      | text(required,unique)       |
| city       | text      |
| source     | text      |
| status     | text      |
| created_at | timestamp |

---

## notes

| column     | type      |
| ---------- | --------- |
| id         | uuid      |
| lead_id    | uuid      |
| note_text  | text      |
| created_at | timestamp |

Relationship:

```
notes.lead_id → leads.id
```

---

# Development Notes

- Dashboard interactions use **Server Actions**
- External integrations should use `/api` endpoints
- Supabase handles persistence and authentication
- Row Level Security protects database access

---

# Example Integration

A website form can push leads directly:

```javascript
await fetch("https://yourdomain.com/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "my_secret_key"
  },
  body: JSON.stringify({
    name: "Jane Doe",
    phone: "+919999999999",
    city: "Bangalore",
    source: "landing_page"
  })
})
```

---

# Future Improvements

- Lead assignment to sales agents
- Activity reminders
- WhatsApp integration
- Analytics dashboard
- Search and filtering
- Webhook integrations
