import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit  } from "../store/habitSlice";

export default function HabitForm() {
  const [habit, setHabit] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habit.trim() && currentUser) {
      dispatch(addHabit ({ username: currentUser, name: habit }));
      setHabit("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex gap-2">
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit..."
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </form>
  );
}
