# 🍽️ Modern POS System

> **A professional, full-stack Point of Sale solution built for speed, scalability, and seamless user experience.**

## 🚀 Overview

This **POS System** is a state-of-the-art web application designed to streamline restaurant and retail operations. It bridges a robust Node.js backend with a dynamic React frontend to deliver real-time order processing, secure payments, and comprehensive table management.

**Key Features:**
- 🛒 **Real-time Order Management**: Instant updates across all connected devices.
- 💳 **Secure Payments**: Integrated Stripe payment gateway for reliable transactions.
- 📊 **Dynamic Dashboard**: Visual insights into sales and inventory.
- 📱 **Responsive Design**: Optimized for tablets, desktops, and mobile interfaces.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern utility-first styling)
- **State Management**: React Hooks & Context API
- **HTTP Client**: Axios

### **Backend (Server)**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe API

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Connection URI
- Stripe Account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/MAHMOUD3224/POS-System.git
cd POS-System
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.

```bash
cd pos-backend
npm install
```

**Configuration:**
Copy the example environment file and update it with your credentials.
```bash
cp .env.example .env
```
Update `.env` with your details:
- `MONGODB_URI`: Your MongoDB connection string.
- `STRIPE_SECRET_KEY`: Your Stripe secret.

**Start Server:**
```bash
npm start
# Server runs on http://localhost:8000
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory.

```bash
cd pos-frontend
npm install
```

**Configuration:**
Copy the example environment file.
```bash
cp .env.example .env
```
Update `.env`:
- `VITE_BACKEND_URL`: URL of your running backend (e.g., `http://localhost:8000`).

**Start Client:**
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🔒 Security & Best Practices
- **Environment Isolation**: Sensitive keys are never committed to the repository.
- **Strict Linting**: Code quality enforced via ESLint.
- **Scalable Structure**: Modular folder architecture for easy maintenance.

---

## 👨💻 Author

**Mahmoud Rashad**  
*Frontend Developer*  

---
*Built with ❤️ and Code.*
