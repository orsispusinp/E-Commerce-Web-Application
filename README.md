# 🛍️ NatureBlend — Real-Time E-Commerce Web Application

A minimal yet fully functional real-time e-commerce web application demonstrating complete end-to-end data flow — from user authentication and product management to cart, checkout, payment simulation, and order confirmation.

---

## 🚀 Live Demo

**Frontend (React App):** [https://your-frontend-name.onrender.com](https://e-commerce-backend-zuxw.onrender.com)
**Backend (API Server):** [https://your-backend-name.onrender.com](https://e-commerce-frontend-768f.onrender.com/)

---

## 🧠 Overview

This project is built as part of a **technical assessment**, focusing on:
- Complete backend–frontend integration  
- Real-time data handling using APIs  
- Cloud deployment (Render for both frontend & backend)  
- Clean architecture and authentication with JWT  

---

## ⚙️ Tech Stack

| Layer | Technology Used |
|--------|------------------|
| **Frontend** | React (Vite) + Axios + React Router DOM |
| **Backend** | Node.js + Express.js + JWT + bcrypt.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Deployment** | Render (for both frontend & backend) |
| **Email Service** | Nodemailer (Gmail App Password) |
| **Payment Simulation** | Mock (Free Checkout) |

---

## 🧩 Features

- 🔐 **User Authentication:** JWT-based registration and login  
- 🛒 **Product Display:** One category with a single item  
- 🧺 **Cart System:** Add, view, and remove products  
- 💳 **Checkout:** Simulated free payment flow  
- 📧 **Email Confirmation:** Auto email on successful order  
- ☁️ **Cloud Hosted:** Frontend & Backend both deployed on Render  
- 🎨 **Modern UI:** Pure CSS-based clean and responsive design  

---

## 🗂️ Project Structure
E-Commerce-web-Application/
│
├── backend/
│ ├── index.js
│ ├── config/
│ ├── controllers/
│ ├── models/
│ └── routes/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── api.js
│ ├── vite.config.js
│ └── package.json
│
└── README.md
## 2️⃣ Backend Setup
cd backend
npm install
npm run dev

## 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

## 🌍 Deployment (on Render)
Both frontend and backend deployed on Render
Backend uses Express REST APIs connected to MongoDB Atlas
Frontend built with Vite and connected to backend API URL

## ✅ End-to-End Flow
1. Register / Login
2. View Product (fetched from backend)
3. Add to Cart
4. Proceed to Checkout
5. Confirm Order → Email Sent

### 👨‍💻 Developer
Rajeev Sutrakar
B.Tech, IIT Guwahati
Role: Full-Stack Developer
