# 🛒 E-Commerce Web App

A full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- User authentication (Register, Login, Logout)
- Browse and search products
- Add to cart and checkout
- Order history tracking
- Admin dashboard: manage products, users,vendors and orders

---

## ⚙️ Tech Stack

- **Frontend**: React, vanilla css
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT
- **payment-gateway** : razor pay
- **email-handler** - nodemailer
- **Image Upload** :local system

---



### Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install


###  Configure Environment Variables

####  `server/.env`
```env



RAZORPAY_SECRET="my_secret"
RAZORPAY_KEY_ID="my_key"
JWT_SECRET="MY_JWT_SECRET"
ADMIN_ID="adminId"
ADMIN_PASS="adminpassword"
NM_PASS="my pass" (nodemailer)
NM_EMAIL="myemail@gmail.com" (nodemailer)
MONGO_URL="mongodb://127.0.0.1:27017/myDB"
PORT=9191


```

###  Run the App

```bash
# Terminal 1 (Backend)
cd server
npm run start

# Terminal 2 (Frontend)
cd client
npm start
```

---


