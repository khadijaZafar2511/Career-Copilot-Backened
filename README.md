# CareerCopilot Backend

A production-ready backend for **CareerCopilot**, an AI-assisted learning platform that helps developers follow structured career roadmaps, track progress, complete hands-on projects, and prepare for software engineering careers through a personalized learning experience.

The backend is designed with scalability in mind and is ready for AI integrations using external LLM APIs such as OpenAI.

---

## ✨ Features

- 🔐 JWT Authentication with HttpOnly Cookies
- 👤 User Onboarding & Profile Management
- 🛣️ Career Roadmaps
- 📚 Milestones, Tasks & Learning Resources
- 📊 User Progress Tracking
- 📝 Quiz & Assessment System
- 🚀 Project-Based Learning
- ☁️ Cloudinary File Uploads
- 🛡️ Protected Routes & Role-Based Authorization
- 🤖 AI-Ready Architecture (LLM integration in progress)

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- bcrypt
- Multer
- Cloudinary

---

## 📂 Project Structure

```text
src
├── config
├── controllers
├── middlewares
├── models
├── routes
├── services
├── validators
├── utils
└── app.js
```

---

## 📦 API Modules

### Authentication

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /me
```

### User

```
GET    /user/me
PATCH  /user/profile
POST   /user/onboarding
PATCH  /user/changePassword
```

### Roadmaps

```
GET    /roadmap/roadmaps
GET    /roadmap/roadmaps/:roadmapId
```

### User Roadmaps

```
POST   /user-roadmap/:id/select
GET    /user-roadmap/all
GET    /user-roadmap/active
PATCH  /user-roadmap/:id/pause
PATCH  /user-roadmap/:id/resume
PATCH  /user-roadmap/:id/deselect
```

### Progress

```
POST   /progress/complete/userRoadmap/:userRoadmapId/task/:id
GET    /progress/roadmap-progress/:userRoadmapId
GET    /progress/milestone-progress/:userRoadmapId/:milestoneId
GET    /progress/dashboard-progress
```

### Projects

```
GET    /project/all
GET    /project/:roadmapId/view
GET    /project/:roadmapId/detail
POST   /project/:projectId/start
PATCH  /project/:projectId/submit
GET    /project/:projectId/viewsubmission
```

### Quizzes

```
GET    /quiz/:milestoneId
POST   /quiz/:milestoneId/start
POST   /quiz/:milestoneId/submit
GET    /quiz/attempts
GET    /quiz/attempts/:attemptedQuizId
PATCH  /quiz/:attemptedQuizId/reAttempt
```

### Resources

```
GET    /resource/all-resources/:taskId
GET    /resource/resource/:resourceId
GET    /resource/resource/:userRoadmapId/search
```

---

## 🚀 AI Integration

The backend is built to support AI-powered learning features.

Planned integrations include:

- AI Learning Assistant
- Personalized Learning Recommendations
- Intelligent Roadmap Guidance
- LLM-powered Chat Support

The architecture is designed to integrate external AI providers such as the OpenAI API without requiring major architectural changes.

---

## 🔒 Security

- JWT Authentication
- HttpOnly Cookies
- Password Hashing (bcrypt)
- Request Validation (Zod)
- Protected Routes
- Centralized Error Handling

---

## ⚙️ Getting Started

Clone the repository

```bash
git clone https://github.com/<your-username>/careercopilot-backend.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run the development server

```bash
npm run dev
```

---

## 📌 Project Status

✅ Authentication & Authorization

✅ Roadmaps & Learning Resources

✅ Projects Module

✅ Quiz System

✅ User Progress Tracking

🔄 Frontend Integration

🔄 AI Integration (OpenAI API)

🚀 Active Development

---

## 👨‍💻 Author

**Khadija Zafar**

MERN Stack Developer • Backend Engineer • Exploring AI Systems
