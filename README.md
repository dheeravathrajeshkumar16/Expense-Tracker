# 💰 Expense Tracker - Modern Financial Management System

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-emerald?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express-Backend-black?logo=express)](https://expressjs.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Analytics-ff6384?logo=chart.js)](https://www.chartjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An intuitive, full-stack **Expense Tracker & Financial Management Web Application** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and powered by **Chart.js** interactive analytics. Track income and expenses, monitor category spending, filter financial records, and analyze net balance in real-time with a sleek dark glassmorphism dashboard.

---

## ✨ Features

- 📊 **Interactive Analytics Dashboard**:
  - **Expense Category Doughnut Chart**: Interactive visual breakdown of spending across Groceries, Rent, Food, Utilities, Entertainment, and more.
  - **Income vs. Expense Bar Graph**: Side-by-side graphical turnover comparison with tooltips.
  - **Real-time Financial Metrics**: Live balance tracking, total earnings vs. expenses, transaction counts, and savings rate percentage calculation.
- 💳 **Transaction Management**:
  - Log credit (income) and debit (expense) transactions with categories, dates, and custom notes.
  - View transactions in structured table formats or visual analytical views.
  - Filter transactions by time ranges (*Last Week, Last Month, Last Year, or Custom Date Pickers*) and transaction types (*All, Expense, Earned*).
- 🔐 **User Authentication & Profiles**:
  - User registration and login validation.
  - Custom profile avatar customization.
- 🎨 **Modern Dark Aesthetic**:
  - Glassmorphic card styling, smooth micro-interactions, responsive grid layout for mobile and desktop screens.

---

## 🛠️ Tech Stack

### **Frontend**
- **Core Framework**: React 18
- **Styling & UI**: Vanilla CSS3, React-Bootstrap, Material-UI Icons
- **Data Visualization**: `chart.js` & `react-chartjs-2`
- **HTTP Client**: Axios
- **Notifications & UI Effects**: React Toastify, React Datepicker, tsParticles

### **Backend**
- **Runtime**: Node.js & Express.js (ES Module support)
- **Database ORM**: MongoDB & Mongoose
- **Security & Utilities**: bcrypt password hashing, Helmet HTTP protection, CORS middleware, Morgan logger, dotenv

---

## 📂 Repository Structure

```
Expense-Tracker/
├── backend/
│   ├── config/
│   │   └── config.env           # Environment configuration (PORT, MONGO_URL)
│   ├── controllers/
│   │   ├── transactionController.js  # CRUD controller for transactions
│   │   └── userController.js         # Authentication & avatar controller
│   ├── DB/
│   │   └── Database.js          # MongoDB database connection helper
│   ├── models/
│   │   ├── TransactionModel.js  # Mongoose transaction schema
│   │   └── UserSchema.js        # Mongoose user schema
│   ├── Routers/
│   │   ├── Transactions.js      # Transaction routes
│   │   └── userRouter.js        # Auth routes
│   └── app.js                   # Express application entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── components/          # Reusable header, spinners, progress meters
        ├── Pages/
        │   ├── Auth/            # Login & Registration pages
        │   ├── Avatar/          # Avatar setup page
        │   └── Home/            # Dashboard, Table view, and Analytics charts
        └── utils/
            └── ApiRequest.js    # API endpoints configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB instance or MongoDB Atlas cluster connection string)

---

### 1. Clone the Repository
```bash
git clone https://github.com/dheeravathrajeshkumar16/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Backend Setup
1. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a configuration file at `backend/config/config.env` with your environment details:
   ```env
   PORT=4000
   MONGO_URL=mongodb://127.0.0.1:27017/expensetracker
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Backend will run on `http://localhost:4000`)*

---

### 3. Frontend Setup
1. Open a new terminal tab, navigate to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```
   *(Frontend will open automatically at `http://localhost:3000`)*

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `4000` |
| `MONGO_URL` | MongoDB connection string | `mongodb://127.0.0.1:27017/expensetracker` |
| `REACT_APP_API_HOST` | API host URL for frontend requests | `http://localhost:4000` |

---

## 👤 Author

**Rajesh Dheeravath**
- GitHub: [@dheeravathrajeshkumar16](https://github.com/dheeravathrajeshkumar16)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
