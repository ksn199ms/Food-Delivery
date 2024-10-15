# TastyTrack 🍽️

TastyTrack is a full-featured food delivery web application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to browse a restaurant's menu, add items to their cart, make secure payments via **Razorpay**, and track their order status. Additionally, admins have the ability to manage menu items and track customer orders in real time.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Features

### User Features:
- **Authentication**: Users can sign up, log in, and manage their account securely.
- **Browse and Filter Menu**: Users can browse food items, filter by category, and add items to the cart.
- **Cart Management**: Users can view, update, and delete items from their cart.
- **Payment Integration**: Secure payments via **Razorpay** are integrated to process orders.
- **Order Tracking**: Users can track their order status (e.g., placed, preparing, delivered) in real time.
  
### Admin Features:
- **Manage Food Items**: Admins can add, edit, and delete food items in the restaurant's menu.
- **Order Management**: View all customer orders and update order statuses (e.g., preparing, dispatched, delivered).
  
## Tech Stack
- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (NoSQL)
- **Payment Gateway**: Razorpay
- **Authentication**: JWT (JSON Web Tokens)

## Screenshots
### User Dashboard

![screencapture-food-delivery-front-end-vcul-onrender-2024-10-14-18_03_26](https://github.com/user-attachments/assets/a51a3003-c072-4c4d-b66b-7b13c90a9aab)

![Screenshot 2024-10-14 180228](https://github.com/user-attachments/assets/348a1699-7c68-4af2-a24a-0084640daae3)

![Screenshot 2024-10-14 180208](https://github.com/user-attachments/assets/1506db3b-7ed0-449e-b8c7-29fbbe724b9c)

![screencapture-food-delivery-front-end-vcul-onrender-cart-2024-10-14-18_05_01](https://github.com/user-attachments/assets/2b70e5ef-bfc2-43c9-ab56-d3b9994b9bfb)

![screencapture-food-delivery-front-end-vcul-onrender-order-2024-10-14-18_05_38](https://github.com/user-attachments/assets/d3cbcf23-f479-4cfe-8c7c-4e06ff489be2)

![Screenshot 2024-10-14 200703](https://github.com/user-attachments/assets/536f0df3-e707-4ffa-96e1-ea3b2e9336f6)

![screencapture-food-delivery-front-end-vcul-onrender-myorders-2024-10-14-18_07_50](https://github.com/user-attachments/assets/485ab029-d43a-4fed-9808-55210c5854d5)



### Admin Dashboard

![screencapture-food-delivery-admin-orbo-onrender-add-2024-10-14-18_09_05](https://github.com/user-attachments/assets/a982793b-db39-40e8-b4e7-20e8d843cbc2)

![Screenshot 2024-10-14 181006](https://github.com/user-attachments/assets/08e9b7b7-d25d-494c-87ef-07f0506f5406)

![screencapture-food-delivery-admin-orbo-onrender-orders-2024-10-14-18_10_49](https://github.com/user-attachments/assets/828ea536-6dac-42b5-81b6-b6bd021766e7)

## Getting Started

To get a local copy up and running, follow these steps.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ksn199ms/Food-Delivery
   cd tastytrack
   ```

2. **Install dependencies for both frontend and backend:**

   For the backend:
   ```bash
   cd back-end
   npm install
   ```

   For the frontend:
   ```bash
   cd ../front-end
   npm install
   ```

   For the admin:
   ```bash
   cd ../admin
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure MongoDB is running on your machine.
   - You can use the local MongoDB URI: `mongodb://localhost:27017/tastytrack`

4. **Set up Razorpay:**
   - Create an account at [Razorpay](https://razorpay.com) and generate your API keys.
   - Use these API keys in the environment variables (see below).

5. **Environment Variables:**
   Create a `.env` file in the `back-end` folder and add the following variables:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tastytrack
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   FRONT_END_URL=http://localhost:5173
   ```

   For the admin panel, create a `.env` file in the `admin` folder and include the following:

   ```bash
   VITE_BACK_END_URL=http://localhost:5000
   ```

   For the front-end application, create a `.env` file in the `front-end` folder and include:

   ```bash
   VITE_BACK_END_URL=http://localhost:5000
   ```

6. **Running the Application:**

   1. **Backend (Express & Node.js):**
      - Navigate to the `back-end` directory and run:
        ```bash
        npm run server
        ```
      - This will start the server on `http://localhost:5000`.


   2. **Frontend (React):**
      - Navigate to the `front-end` directory and run:
        ```bash
        npm run dev
        ```
      - The frontend will run on `http://localhost:5173`.


    3. **Admin (React):**
      - Navigate to the `admin` directory and run:
        ```bash
        npm run dev
        ```
      - The frontend will run on `http://localhost:5174`.


   4. **Access the Application:**
      - Open your browser and go to `http://localhost:5173` for the user interface.
      - For the admin panel, visit `http://localhost:5174`.






## Future Improvements

- **Real-time Notifications**: Integrate a notification system to alert users about their order updates.
- **User Reviews & Ratings**: Allow users to review and rate their orders.
- **Multi-Restaurant Support**: Extend the application to support multiple restaurants.

## Contributing

If you'd like to contribute to TastyTrack, feel free to submit a pull request or raise an issue. Contributions are always welcome!


**Check out the live demo**:  
User Website Link : https://food-delivery-front-end-vcul.onrender.com   
Admin Website Link : https://food-delivery-admin-orbo.onrender.com 
.

## Feedback

If you have any feedback, please reach out to us at ksn199ms@gmail.com

