# 🎁 chrono-gift

**chrono-gift** is a full-stack web application that lets users send digital gifts to others via email — with a twist: recipients can only open their gift **after a timer expires**. Built with React, TypeScript, Express, and MongoDB, it blends fun, suspense, and modern web tech.

---

## 🚀 Features

- ✉️ Send digital gifts to any email address
- ⏳ Set a timer (countdown) for when the gift becomes accessible
- 🔒 Gifts are locked until the specified time
- 📬 Email-based gift receiving experience
- 🌐 Responsive frontend built with React + TypeScript
- ⚙️ Backend with Express + MongoDB for persistence

---

## 🧱 Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Styled Components

**Backend**
- Node.js
- Express.js
- MongoDB (via Mongoose)

---

## 📁 Project Structure

chrono-gift/
├── chronogift-frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── App.tsx
│ │ ├── CreateGiftPage.tsx
│ │ ├── OpenGiftPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── FooterCredits.tsx
│ │ ├── main.tsx
│ │ ├── styles.ts
│ │ ├── types.ts
│ │ ├── styled.d.ts
│ │ ├── App.css / index.css
│ │ ├── vite-env.d.ts
│ ├── index.html
│ ├── package.json
│ ├── vite.config.ts
│ ├── tsconfig.*.json
│ ├── eslint.config.js
├── server.js # Express backend
├── package.json
├── package-lock.json

---

## 🛠️ Getting Started

### ⚙️ Prerequisites

- Node.js ≥ 16.x
- MongoDB running locally or a connection URI (e.g. Atlas)

### 📦 Install Dependencies

From the root directory:

npm install
cd chronogift-frontend
npm install

## 🔌 Environment Variables

Create a .env file in the root and frontend (if needed):
MONGO_URI=mongodb://localhost:27017/chrono-gift
PORT=5000

## ▶️ Run the App

Start Backend
node server.js

Start Frontend
cd chronogift-frontend
npm run dev

Frontend runs on: http://localhost:5173
Backend runs on: http://localhost:5000

## 🧪 Pages Overview

CreateGiftPage.tsx
Form to input recipient's email, gift message, and unlock timer

OpenGiftPage.tsx
Lets the recipient open the gift after the timer is expired

LoginPage.tsx
Optional: for sender authentication (if implemented)

## 🗃️ Database Model (Conceptual)
{
  senderEmail: String,
  recipientEmail: String,
  message: String,
  unlockAt: Date,
  isOpened: Boolean,
  createdAt: Date
}

## 🧼 Code Quality

npm run lint

Format (optional):

npx prettier --write .

## 🤝 Contributing

1. Fork the repo

2. Create a new branch: git checkout -b feature/my-feature

3. Commit your changes

4. Open a pull request

## 🙏 Acknowledgements

1. Inspired by suspenseful secret gift ideas 💡

2. Built using the MERN-like stack with Vite for lightning-fast builds

3. Thanks to all contributors and testers!

## 📬 Contact

Have suggestions, feedback, or found a bug? We'd love to hear from you!

- 📧 Email: yuvaneshf23@gmail.com
- 🧑‍💻 GitHub: [@YuvaneshV12](https://github.com/YuvaneshV12)

---
Let me know if you'd like me to include screenshots, deployment instructions (e.g., Vercel/Render)
