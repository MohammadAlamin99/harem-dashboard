"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";
import GraphHead from "./GraphHead";

type AppointmentData = {
  month: string;
  completed: number;
  cancelled: number;
};

type Props = {
  data: AppointmentData[];
};

export default function AppointmentGraph({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Monthly");

  const options = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <div className="bg-white rounded-2xl p-8 w-full">
      {/* Header */}
      <GraphHead
        selected={selected}
        setSelected={setSelected}
        open={open}
        setOpen={setOpen}
        options={options}
        title="Appointments"
        subtitle="Last 12 Months"
      />

      {/* Chart */}
      <div className="w-full h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#526B7A", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#526B7A", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Legend
              iconType="circle"
              align="left"
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => {
                if (value === "Completed") {
                  return <span style={{ color: "#635BFF" }}>{value}</span>;
                }
                if (value === "Cancelled") {
                  return <span style={{ color: "#FF6692" }}>{value}</span>;
                }
                return value;
              }}
            />

            <Bar
              dataKey="completed"
              fill="#635BFF"
              radius={[8, 8, 0, 0]}
              name="Completed"
            />

            <Bar
              dataKey="cancelled"
              fill="#FF6692"
              radius={[8, 8, 0, 0]}
              name="Cancelled"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
