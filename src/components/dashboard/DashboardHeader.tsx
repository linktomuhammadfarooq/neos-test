import { HeadingH1 } from "@/components/common/HeadingH1";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  symbol,
  setSymbol,
  timeframe,
  setTimeframe,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-3">
      <HeadingH1 title="Dashboard" />
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-none text-foreground">
            Symbol
          </span>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="SPYI">SPYI</SelectItem>
              <SelectItem value="QOQI">QOQI</SelectItem>
              <SelectItem value="IWMI">IWMI</SelectItem>
              <SelectItem value="NUSI">NUSI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-none text-foreground">
            Viewing:
          </span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Month To Date">Month To Date</SelectItem>
              <SelectItem value="Quarter To Date">Quarter To Date</SelectItem>
              <SelectItem value="Year To Date">Year To Date</SelectItem>
              <SelectItem value="1 Year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
