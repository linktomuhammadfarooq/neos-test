import { BiggestMover } from "@/components/dashboard/BiggestMover";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { GoalProgress } from "@/components/dashboard/GoalProgress";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { ProductAum } from "@/components/dashboard/ProductAum";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { useState } from "react";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("All");
  const [timeframe, setTimeframe] = useState("Month To Date");

  return (
    <div>
      <DashboardHeader
        symbol={symbol}
        setSymbol={setSymbol}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <GrowthChart />
        <GoalProgress />
        <BiggestMover />
        <ProductAum />
      </div>
    </div>
  );
};

export default Dashboard;
