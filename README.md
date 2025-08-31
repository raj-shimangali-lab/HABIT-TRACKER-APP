HABIT-TRACKER-APP
Track daily activites and check progress

A full-stack Habit Tracker application built using React, Redux Toolkit, React Router v6, and Node.js/Express.
This app allows users to register, log in, track habits, update progress, and manage habits individually for each user.

Features 🚀
---------

Authentication
--------------
User Registration and Login

Validates user credentials

Displays an error if invalid credentials are entered

Uses Redux to manage authentication state

Shows habits only for the logged-in user


Habit Management
-----------------
Add Habits → Create habits for the logged-in user.

Edit Habits → Update the name of existing habits.

Delete Habits → Remove unwanted habits.

Track Progress → Increment daily habit completion count.

Reset Progress → Reset a habit's progress to zero.

Progress cannot be marked for future dates.

User-specific Habits
--------------------
Each user's habits are stored separately.

When a new user logs in, only their habits are shown.

Supports persistent storage via localStorage or backend API.

Project Structure 📂
--------------------
HABIT_TRACKER/
├── backend/                # Node.js backend (optional for API integration)
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js          # Express server entry point
│
├── frontend/               # React + Redux frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/         # (Optional) Static assets like images/icons
│   │   ├── components/     # React components
│   │   │   ├── HabitForm.jsx      # Add new habits
│   │   │   ├── HabitForm.css
│   │   │   ├── HabitList.jsx      # List, edit, delete, progress tracking
│   │   │   ├── HabitList.css
│   │   │   ├── ProgressChart.jsx # Chart visualization of progress
│   │   │   ├── ProgressChart.css
│   │   │   ├── Login.jsx         # User login page
│   │   │   ├── Register.jsx      # User registration page
│   │   │
│   │   ├── store/         # Redux store configuration
│   │   │   ├── authSlice.js     # Handles authentication state
│   │   │   ├── habitSlice.js    # Handles habit CRUD operations per user
│   │   │   └── store.js         # Combines reducers
│   │   │
│   │   ├── App.jsx        # Main application entry point
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx       # ReactDOM render root
│   │
│   ├── package.json
│   ├── package-lock.json
│
├── .gitignore
└── eslint.config.js


Tech Stack 🛠️
Frontend
-----------
React— UI components
Redux Toolkit— State management
React Router v6— Routing and protected routes
Axios— API calls (optional if backend enabled)
[Chart.js / Recharts] — Visual habit tracking (if using charts)

Backend
---------
Node.js
Express.js
CORS
Body-parser


Installation & Setup
--------------------
1. Clone the Repository
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker

2. Install Dependencies
Frontend:
cd frontend
npm install

Backend:
cd backend
npm install

3. Run the App
Start Backend:
cd backend
node server.js

Start Frontend:
cd frontend
npm run dev


Frontend → http://localhost:5173
Backend → http://localhost:5000
