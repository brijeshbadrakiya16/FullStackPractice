# TastOs — Restaurant SaaS Platform

Multi-tenant Restaurant QR Menu & Order Management SaaS with Customer, Restaurant, and SuperAdmin roles.

## Tech Stack

- **Frontend:** React + Vite, react-router-dom, custom CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT, bcrypt
- **External:** quickchart.io (QR), imgbb (image hosting)

## Prerequisites

- Node.js 18+
- MongoDB running locally (or update `MONGO_URI`)
- imgbb API key ([imgbb.com](https://api.imgbb.com/))

## Setup

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your secrets and IMGBB_API_KEY
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Default URLs

| Service   | URL                      |
|-----------|--------------------------|
| Frontend  | http://localhost:5173    |
| Backend   | http://localhost:5000    |
| SuperAdmin| http://localhost:5173/manage |

## SuperAdmin Credentials

Configure in `backend/.env`:

```
SUPER_ADMIN_EMAIL=admin@saas.com
SUPER_ADMIN_PASSWORD=admin123
SUPER_ADMIN_IP=127.0.0.1
```

SuperAdmin routes are IP-restricted. Access `/manage` only from the configured IP.

## User Flows

1. **Restaurant** registers → QR generated → awaits SuperAdmin approval
2. **SuperAdmin** approves restaurant, sets permissions and `nChange` fee
3. **Customer** registers, scans QR, browses menu, places orders
4. **Restaurant** manages menu, fulfills orders

## API Health Check

```
GET http://localhost:5000/api/health
```
