# Healthcare Backend API

A comprehensive healthcare backend API built with NestJS, featuring role-based access control and treatment management.

## Features

- User authentication with JWT
- Role-based access control (Admin, Doctor, Nurse)
- Patient management
- Treatment management
- Medication management
- User management
- Advanced search and filtering capabilities

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/healthcare?schema=public"
JWT_SECRET="your-secret-key"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database:
```bash
npx prisma db seed
```

## Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- **POST /auth/login** - Login with email and password
- **POST /auth/register** - Register a new user (Admin only)

### Users
- **POST /users** - Create a new user (Admin only)
- **GET /users** - Get all users (Admin only)
- **GET /users/:id** - Get user by ID (Admin only)
- **PATCH /users/:id** - Update user (Admin only)
- **DELETE /users/:id** - Delete user (Admin only)

### Patients
- **POST /patients** - Create a new patient (Admin, Doctor only)
- **GET /patients** - Get all patients (Admin, Doctor, Nurse only)
- **GET /patients/:id** - Get patient by ID (Admin, Doctor, Nurse only)
- **GET /patients/patientId/:patientId** - Get patient by patient ID (Admin, Doctor, Nurse only)
- **PATCH /patients/:id** - Update patient (Admin, Doctor only)
- **DELETE /patients/:id** - Delete patient (Admin only)

### Treatments
- **POST /treatments** - Create a new treatment
- **GET /treatments** - Get all treatments
- **GET /treatments/:id** - Get treatment by ID
- **PATCH /treatments/:id** - Update treatment
- **DELETE /treatments/:id** - Delete treatment
- **GET /treatments/search** - Search treatments with filters
- **GET /treatments/statistics** - Get treatment statistics

### Medications
- **POST /medications** - Create a new medication (Admin only)
- **GET /medications** - Get all medications
- **GET /medications/search** - Search medications by name
- **GET /medications/active** - Get all active medications
- **GET /medications/all** - Get all medications including deleted ones (Admin only)
- **PATCH /medications/:id** - Update medication (Admin only)
- **DELETE /medications/:id** - Delete medication (Admin only)

## Test Users

The following test users are available after seeding the database:

1. Admin User:
   - Email: admin@example.com
   - Password: admin123

2. Doctor User:
   - Email: doctor@example.com
   - Password: doctor123

3. Nurse User:
   - Email: nurse@example.com
   - Password: nurse12

4. Staff User:
   - Email: staff@example.com
   - Password: staff123

## API Documentation

The API documentation is available at `/api/docs` when running the application in development mode.

## Security

- All endpoints except login and register require JWT authentication
- Role-based access control is implemented using guards and decorators
- Passwords are hashed using bcrypt
- JWT tokens are used for session management

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
