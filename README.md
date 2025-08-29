
# UserManager

A full-stack user management application with authentication, admin/user roles, and secure API endpoints.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [User Stories](#user-stories)
- [API Overview](#api-overview)
- [License](#license)

---

## Features

- User registration and login with JWT authentication
- Admin and user roles
- Admin dashboard to view and delete users
- Secure password hashing
- Rate limiting and bot protection (Arcjet)
- Error handling and input validation

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Arcjet
- **Frontend:** React, Vite , Bootstrap

---

## Project Structure

```
UserManager/
│
├── BackEnd/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── FrontEnd/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── Pages/
    │   ├── Routes/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## Getting Started

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd BackEnd
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (MongoDB URI, JWT secret, Arcjet key, etc.).

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The API will run on [http://localhost:5000](http://localhost:5000) (or your configured port).

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd FrontEnd
   npm install
   ```

2. **Start the frontend app:**
   ```bash
   npm run dev
   ```
   The app will run on [http://localhost:5173](http://localhost:5173) by default.

---

## User Stories

- En tant qu’utilisateur, je veux pouvoir m’inscrire avec email et mot de passe.
- En tant qu’utilisateur, je veux pouvoir me connecter avec mes identifiants et recevoir un token/session.
- En tant qu’administrateur, je veux pouvoir voir la liste des utilisateurs.
- En tant qu’administrateur, je veux pouvoir supprimer un utilisateur depuis le dashboard.
- En tant qu’utilisateur, je veux être informé si mes identifiants sont invalides ou en cas de problème serveur.

---

## API Overview

- `POST /api/v1/auth/signup` — Register a new user
- `POST /api/v1/auth/signin` — Login and receive JWT
- `GET /api/v1/users/` — (Admin only) List all users
- `GET /api/v1/users/:id` — Get user by ID
- `PUT /api/v1/users/:id` — Update user
- `DELETE /api/v1/users/:id` — (Admin only) Delete user

---

## License

This project is licensed under the MIT License.