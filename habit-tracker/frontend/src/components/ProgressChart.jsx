// src/components/ProgressChart.js
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './ProgressChart.css';

export default function ProgressChart() {
  const habits = useSelector(state => state.habits);

  // Map the habit data to progress (doneToday values)
  const data = habits.map(h => ({
    name: h.name,  // Habit name
    progress: h.doneToday  // Progress value (doneToday)
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Progress</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="progress" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
