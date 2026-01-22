# Reports API

Backend for a reports management system with public report creation and admin-only management.

## Tech stack

- NestJS
- Prisma
- Supabase (PostgreSQL – database only)
- JWT authentication
- Session-based auth with httpOnly cookies
- CSRF protection
- CORS with credentials

## Features

- Public report creation
- Admin-only update and delete
- Session-based authentication using cookies
- CSRF protection for state-changing admin actions
- Throttling for public endpoints

## Authentication & security

- JWT is stored in an **httpOnly cookie**
- Frontend never reads or stores tokens
- CSRF token is stored in a readable cookie and validated via request header
- Admin access is enforced via backend guards
