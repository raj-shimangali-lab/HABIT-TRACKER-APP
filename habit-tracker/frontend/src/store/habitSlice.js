import { createSlice } from '@reduxjs/toolkit';

// Load habits from localStorage based on current user
const loadHabits = (username) => {
  const allHabits = JSON.parse(localStorage.getItem('habits')) || {};
  return allHabits[username] || [];
};

// Save habits to localStorage for the current user
const saveHabits = (username, habits) => {
  const allHabits = JSON.parse(localStorage.getItem('habits')) || {};
  allHabits[username] = habits;
  localStorage.setItem('habits', JSON.stringify(allHabits));
};

const habitSlice = createSlice({
  name: 'habits',
  initialState: [],
  reducers: {
    setHabits: (state, action) => {
      return action.payload; // Sets the habits for the current user
    },

    addHabit: (state, action) => {
      const { username, name } = action.payload;
      const newHabit = { id: Date.now(), name, doneToday: 0, user: username };
      const updatedHabits = [...state, newHabit];
      saveHabits(username, updatedHabits);
      return updatedHabits;
    },

    deleteHabit: (state, action) => {
      const { username, id } = action.payload;
      const updatedHabits = state.filter((habit) => habit.id !== id);
      saveHabits(username, updatedHabits);
      return updatedHabits;
    },

    updateHabit: (state, action) => {
      const { username, id, name } = action.payload;
      const updatedHabits = state.map((habit) =>
        habit.id === id ? { ...habit, name } : habit
      );
      saveHabits(username, updatedHabits);
      return updatedHabits;
    },

    incrementHabitProgress: (state, action) => {
      const { username, id } = action.payload;
      const updatedHabits = state.map((habit) =>
        habit.id === id && habit.doneToday < 12
          ? { ...habit, doneToday: habit.doneToday + 1 }
          : habit
      );
      saveHabits(username, updatedHabits);
      return updatedHabits;
    },

    resetHabitProgress: (state, action) => {
      const { username, id } = action.payload;
      const updatedHabits = state.map((habit) =>
        habit.id === id ? { ...habit, doneToday: 0 } : habit
      );
      saveHabits(username, updatedHabits);
      return updatedHabits;
    },

    clearHabits: () => {
      return []; // Clear habits when user logs out
    },
  },
});

export const {
  setHabits,
  addHabit,
  deleteHabit,
  updateHabit,
  incrementHabitProgress,
  resetHabitProgress,
  clearHabits,
} = habitSlice.actions;

// Load habits for the current user
export const fetchHabits = (username) => (dispatch) => {
  const habits = loadHabits(username);
  dispatch(setHabits(habits));
};

export default habitSlice.reducer;
