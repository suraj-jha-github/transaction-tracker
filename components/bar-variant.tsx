import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { CustomTooltip } from "@/components/custom-tooltip";

type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: BarVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => {
            const dateValue = new Date(value); // Convert to Date object
            if (!isNaN(dateValue.getTime())) {
              // Check for valid date
              return format(dateValue, "dd MMM");
            }
            console.error("Invalid date value:", value);
            return ""; // Return empty or a fallback string
          }}
          style={{
            fontSize: "12px",
          }}
          tickMargin={16}
        />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />

        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
