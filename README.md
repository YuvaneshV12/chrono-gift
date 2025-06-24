# 🎁 chrono-gift

**chrono-gift** is a full-stack web application that lets users send digital gifts to others via email — with a twist: recipients can only open their gift **after a timer expires**. Built with React, TypeScript, Express, and MongoDB, it blends fun, suspense, and modern web tech.

🌐 **Live Demo:** [https://chrono-gift-2dlp.onrender.com](https://chrono-gift-2dlp.onrender.com)

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
- MongoDB running locally or via Atlas

### 📦 Install Dependencies

# From the root directory
npm install
cd chronogift-frontend
npm install

##🔌 Environment Variables
Create a .env file in the root:
MONGO_URI=mongodb://localhost:27017/chrono-gift
PORT=5000

## ▶️ Run the App Locally

Backend
node server.js

Frontend
cd chronogift-frontend
npm run dev

Frontend: http://localhost:5173

Backend: http://localhost:5000

##🧪 Pages Overview
CreateGiftPage.tsx – Form to input recipient’s email, gift message, and unlock time

OpenGiftPage.tsx – Displays gift, locked until timer expires

LoginPage.tsx – Optional sender authentication

FooterCredits.tsx – Footer with credits/info

## 🗃️ Database Model (Conceptual)
{
  senderEmail: String,
  recipientEmail: String,
  message: String,
  unlockAt: Date,
  isOpened: Boolean,
  createdAt: Date
}

##💅 Code Quality

npm run lint

Format code with Prettier:
npx prettier --write .

🚀 Deployment
🌍 Live App
Deployed using Render:

🔗 https://chrono-gift-2dlp.onrender.com

To deploy your own version:

Push the code to a GitHub repo

Create a Render account

Create a Web Service for the backend and connect your repo

Add environment variables (MONGO_URI, PORT)

For frontend, you can deploy separately on platforms like Vercel or Netlify

## 📸 Screenshots (Optional Section)
You can include screenshots like:

Gift creation form

Locked gift view

Gift unlocked view

Mobile responsiveness example

📌 Add images in src/assets/ and reference them using markdown:

![Gift Creation](https://i.ibb.co/WWvdr97d/Screenshot-2025-06-24-193018.png)

##🤝 Contributing
Fork the repo

Create a new branch: git checkout -b feature/my-feature

Commit your changes

Open a pull request

##🙏 Acknowledgements
Inspired by suspenseful secret gift ideas 💡

Built using the MERN-like stack with Vite for lightning-fast builds

Thanks to all contributors and testers!

##📬 Contact
Got suggestions, feedback, or found a bug? Reach out!

📧 Email: yuvaneshf23@gmail.com

🧑‍💻 GitHub: @YuvaneshV12

Let me know if you'd like help creating a screenshot layout, README badges (like Netlify/Render build status), or setting up deployment guides step-by-step.
