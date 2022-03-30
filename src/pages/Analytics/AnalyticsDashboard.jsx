import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const data01 = [
  { name: "Machine Learning", value: 20, fill:"#0088FE" },
  { name: "Programming", value: 30, fill:"#00C49F" },
  { name: "Web Development", value: 50, fill:"#FFBB28" },
  { name: "Robotics", value: 17, fill:"#FF8042" }
];

export default function App() {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
}
