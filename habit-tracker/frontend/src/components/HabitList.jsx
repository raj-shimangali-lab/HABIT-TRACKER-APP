import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteHabit,
  incrementHabitProgress,
  updateHabit,
  resetHabitProgress,
  fetchHabits,
} from "../store/habitSlice";
import { logout } from "../store/authSlice";
import "./HabitList.css";

export default function HabitList() {
  const habits = useSelector((state) => state.habits);
  const { currentUser } = useSelector((state) => state.auth); // Get logged-in user
  const dispatch = useDispatch();

  const [editName, setEditName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch habits when the current user changes
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchHabits(currentUser));
    }
  }, [dispatch, currentUser]);

  // Start editing a habit
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // Save the edited habit name
  const handleSave = (id) => {
    if (editName.trim()) {
      dispatch(updateHabit({ username: currentUser, id, name: editName })); // Pass username
      setEditingId(null);
      setEditName("");
    }
  };

  // Increment progress
  const handleIncrementProgress = (id) => {
    dispatch(incrementHabitProgress({ username: currentUser, id }));
  };

  // Reset progress
  const handleResetProgress = (id) => {
    dispatch(resetHabitProgress({ username: currentUser, id }));
  };

  // Delete habit
  const handleDelete = (id) => {
    dispatch(  deleteHabit
      ({ username: currentUser, id }));
  };

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="habit-list-container">
      <h2 className="text-xl font-bold mb-4">Your Habits</h2>
      {habits.length === 0 ? (
        <p className="text-gray-500">No habits added yet.</p>
      ) : (
        <ul className="p-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="flex justify-between items-center border-b p-2 bg-white rounded shadow-sm mb-2"
            >
              {editingId === habit.id ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <button
                    onClick={() => handleSave(habit.id)}
                    className="bg-blue-500 text-white p-1 rounded ml-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span
                  className={
                    habit.doneToday >= 12
                      ? "line-through cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  {habit.name}
                </span>
              )}

              {/* Progress Button */}
              <button
                onClick={() => handleIncrementProgress(habit.id)}
                disabled={habit.doneToday >= 12}
                className={`bg-green-500 text-white p-2 rounded ${
                  habit.doneToday >= 12
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {habit.doneToday >= 12
                  ? "Done"
                  : `Progress: ${habit.doneToday}`}
              </button>

              {/* Reset Button */}
              <button
                onClick={() => handleResetProgress(habit.id)}
                className="bg-gray-500 text-white p-1 rounded ml-2"
              >
                Reset
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(habit.id)}
                className="bg-red-500 text-white p-1 rounded ml-2"
              >
                Delete
              </button>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(habit.id, habit.name)}
                className="bg-yellow-500 text-white p-1 rounded ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
