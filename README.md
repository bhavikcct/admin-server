# Admin Panel Backend

This is the backend server for the Admin Panel application, built with **Express.js** and **TypeScript**. It uses **Prisma ORM** with a **Neon** PostgreSQL database. The project is modularized for scalability and includes core modules for authentication, project management, and estimation.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM:** Prisma
- **Environment Management:** dotenv

## 📁 Project Structure

    admin-server/
    ├── generated/ # Generated Prisma client code
    ├── node_modules/
    ├── prisma/ # Prisma schema and migrations
    │ └── schema.prisma
    ├── src/
    │ ├── config/ # Configuration (e.g., DB, CORS)
    │ ├── controllers/ # Request handlers
    │ ├── middleware/ # Custom Express middleware
    │ ├── routes/ # API route definitions
    │ ├── services/ # Business logic layer
    │ ├── app.ts # Express app setup
    │ └── server.ts # App entry point
    ├── .env # Environment variables
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── README.md


## 🧩 Implemented Modules

- ✅ **Auth Module**  
  Handles user authentication including registration and login.

- ✅ **Projects Module**  
  CRUD operations for managing projects.

- ✅ **Estimation Module**  
  Manages estimations associated with projects or tasks.

## 🔐 Environment Variables

Create a `.env` file in the root with the following variables:
```env
  DATABASE_URL=your_neon_postgres_url
  
  PORT=3000
  
  JWT_SECRET=your_jwt_secret
```
## 🛠️ Getting Started

### Prerequisites

- Node.js >= 20
- PostgreSQL (Neon or any PostgreSQL instance)
- pnpm / npm

### Installation

```bash
npm install

### Database Setup

npx prisma generate
npx prisma migrate dev

### Run Locally

npm run dev
 
### Build for Production

npm run build
 