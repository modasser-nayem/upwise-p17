# 🧠 Upwise Backend – REST API for E-learning Platform

This is the backend of **Upwise**, a robust REST API built using **Node.js, Express, and MongoDB**. It handles authentication, user management, course management, Stripe payments, Cloudinary media, and more.

---

## 🔗 Live Links

-  Live App: https://upwise.vercel.app

-  API Server: https://upwise-api.vercel.app

### 📄 Documents:

-  **[📘 BRD - Business Requirements Document](https://docs.google.com/document/d/1XloLbBZ46m7ZCYZvt5cxmddtAOHn4vIRtJgMSh4yBMQ/edit?usp=sharing)**
-  **[📙 SRS - Software Requirements Specification](https://docs.google.com/document/d/1clD7KEz_pWKVhEc47B8uMZpDn4Qf7PKBt60ldKsEkzs/edit?usp=sharing)**
-  **[📬 API - Postman endpoints documentation]()**

---

## 🛠️ Tech Stack

-  **Node.js**, **Express.js**
-  **MongoDB**, **Mongoose**
-  **JWT Authentication** (Role-based)
-  **Stripe** Payment Integration
-  **Cloudinary** for Video/Image Management
-  **Zod Validation** (Optional)
-  **GitHub Actions** (CI/CD ready)

---

## 📦 Features

-  User authentication & role-based authorization
-  Admin dashboard endpoints
-  Instructor course creation & management
-  Student course purchase flow
-  Sequential lecture unlock logic
-  Certificate generation endpoint (PDF-ready)
-  Review & rating system
-  Modular, scalable folder structure

---

## 📁 Folder Structure

```
backend/
├── src/
├── routes/
├── models/
├── middlewares/
├── utils/
├── config/
└── ...
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modasser-nayem/upwise.git

cd upwise

cd backend

npm run install

cp .env.example .env

npm run dev # Make sure PostgreSQL are running. And also add all .env variable
```

---

## 🧪 Scripts

```bash
# Run in development mode
npm run dev


# Run tests
npm run test

# Build for production
npm run build

# Run in production mode
npm run start

# Format code
npm run format

# Lint code
npm run lint
```

---

## 👨‍💻 Author

#### Ali Modasser Nayem - Full-Stack Web Developer

🔗 [Portfolio](https://alimodassernayem.vercel.app/) | [GitHub](https://github.com/modasser-nayem) | [LinkedIn](https://www.linkedin.com/in/alimodassernayem/)

Email: [modassernayem@gmail.com](modassernayem@gmail.com)

---

## 📜 License

This project is open-source and available under the MIT License.
