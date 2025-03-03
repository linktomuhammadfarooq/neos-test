import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const monthlyGrowthData = [
  { name: "Jan", SPYI: 3800, QQQI: 1500, IWMI: 2000, NUSI: 1400 },
  { name: "Feb", SPYI: 3200, QQQI: 3200, IWMI: 2200, NUSI: 1000 },
  { name: "Mar", SPYI: 3300, QQQI: 2800, IWMI: 2600, NUSI: 1200 },
  { name: "Apr", SPYI: 4000, QQQI: 2700, IWMI: 2400, NUSI: 1500 },
  { name: "May", SPYI: 3800, QQQI: 2800, IWMI: 2800, NUSI: 1300 },
  { name: "Jun", SPYI: 4200, QQQI: 4500, IWMI: 2900, NUSI: 1500 },
  { name: "Jul", SPYI: 4500, QQQI: 4200, IWMI: 3000, NUSI: 2000 },
  { name: "Aug", SPYI: 5000, QQQI: 4000, IWMI: 3100, NUSI: 2700 },
  { name: "Sep", SPYI: 4200, QQQI: 4400, IWMI: 3300, NUSI: 2300 },
  { name: "Oct", SPYI: 4300, QQQI: 4200, IWMI: 3100, NUSI: 1500 },
  { name: "Nov", SPYI: 5200, QQQI: 4400, IWMI: 3300, NUSI: 3000 },
  { name: "Dec", SPYI: 5400, QQQI: 5000, IWMI: 4400, NUSI: 2500 },
];
export const GrowthChart = () => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-card-foreground">
          Monthly Growth by Product
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyGrowthData}
              margin={{ top: 20, right: 10, left: 22, bottom: 10 }}
            >
              <CartesianGrid horizontal={true} vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                dy={10}
                padding={{ left: 30, right: 30 }}
                tick={{ fill: "#71717A" }}
              />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                tickLine={false}
                axisLine={false}
                width={35}
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tick={{ fill: "#71717A" }}
              />
              <Line
                type="linear"
                dataKey="SPYI"
                stroke="#04289C"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="linear"
                dataKey="QQQI"
                stroke="#5B74C5"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="linear"
                dataKey="IWMI"
                stroke="#56AEDE"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="linear"
                dataKey="NUSI"
                stroke="#75B1ED"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-left">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-[2px] w-3 bg-blue mr-1"></div>
              <span className="text-sm font-semibold leading-normal text-blue">
                SPYI
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-[2px] w-3 bg-medium-blue mr-1"></div>
              <span className="text-sm font-semibold leading-normal text-medium-blue">
                QQQI
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-[2px] w-3 bg-light-blue mr-1"></div>
              <span className="text-sm font-semibold leading-normal text-light-blue">
                IWMI
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-[2px] w-3 bg-sky-blue mr-1"></div>
              <span className="text-sm font-semibold leading-normal text-sky-blue">
                NUSI
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
