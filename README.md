# Healthcare Backend API

A complete healthcare treatment record system with role-based access control (RBAC), built with NestJS, Prisma, and PostgreSQL.

## Features

- 🔐 Role-based Access Control (RBAC)
- 👩‍⚕️ Treatment management
- 💊 Medication tracking
- 👨‍⚕️ User management with different roles
- 📊 Patient records management
- 🔒 JWT authentication
- 🗃️ PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Adnan-Isnain/healthcare-be.git
cd healthcare-be
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/healthcare?schema=public"
JWT_SECRET="your-secret-key"
```

Adjust the `DATABASE_URL` according to your PostgreSQL configuration.

### Database Setup

Create a PostgreSQL database named `healthcare` (or whatever you defined in your `.env` file).

Run migrations to set up the database schema:

```bash
npx prisma migrate dev
```

Seed the database with initial data:

```bash
npx prisma db seed
```

### Run the Application

```bash
npm run start:dev
```

The API will be available at http://localhost:3000

## User Roles and Permissions

The system includes four predefined roles:

- **ADMIN**: Full access to all features
- **DOCTOR**: Can create, read, and update treatments
- **NURSE**: Can read treatments and patient information
- **STAFF**: Basic access

## Test Users

The seed script creates the following test users (password includes on the seeder):

- Admin: `admin@example.com`
- Doctor: `doctor@example.com`
- Nurse: `nurse@example.com`
- Staff: `staff@example.com`

## API Endpoints

### Authentication

- **POST /auth/register** - Register a new user
- **POST /auth/login** - Login and get JWT token

### Treatments

- **POST /treatments** - Create a new treatment (DOCTOR, ADMIN)
- **GET /treatments** - Get all treatments (DOCTOR, NURSE, ADMIN)
- **GET /treatments/:id** - Get treatment by ID (DOCTOR, NURSE, ADMIN)
- **PATCH /treatments/:id** - Update a treatment (DOCTOR, ADMIN)
- **DELETE /treatments/:id** - Delete a treatment (ADMIN only)

### Treatment Options

- **POST /treatments/options** - Create treatment option (ADMIN only)
- **GET /treatments/options** - Get all treatment options (DOCTOR, NURSE, ADMIN)
- **PATCH /treatments/options/:id** - Update treatment option (ADMIN only)
- **DELETE /treatments/options/:id** - Delete treatment option (ADMIN only)

### Medications

- **POST /treatments/medications** - Create medication (ADMIN only)
- **GET /treatments/medications** - Get all medications (DOCTOR, NURSE, ADMIN)
- **PATCH /treatments/medications/:id** - Update medication (ADMIN only)
- **DELETE /treatments/medications/:id** - Delete medication (ADMIN only)

### Patients

- **POST /patients** - Create a new patient (DOCTOR, ADMIN)
- **GET /patients** - Get all patients (DOCTOR, NURSE, ADMIN)
- **GET /patients/:id** - Get patient by ID (DOCTOR, NURSE, ADMIN)
- **PATCH /patients/:id** - Update a patient (DOCTOR, ADMIN)
- **DELETE /patients/:id** - Delete a patient (ADMIN only)

## Testing

Run tests with:

```bash
npm test
```

## Technical Details

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API Documentation**: Swagger
