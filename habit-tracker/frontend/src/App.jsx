// src/App.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from './store/habitSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import ProgressChart from './components/ProgressChart';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Fetch habits only if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchHabits());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Login />
            }
          />

          {/* Register Route */}
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Register />
            }
          />

          {/* Protected Habit Tracker Home Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <HabitForm />
                  <HabitList />
                  <ProgressChart />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
