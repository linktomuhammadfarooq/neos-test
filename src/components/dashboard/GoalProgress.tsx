import { GoalProgressItem } from "@/components/dashboard/GoalProgressItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Sample data for goal progress
const goalProgressData = [
  { region: "Mid-Atlantic", current: 72, target: 80, percentage: 90 },
  { region: "Mid-Atlantic", current: 72, target: 80, percentage: 90 },
  { region: "Southeast", current: 55, target: 65, percentage: 84 },
  { region: "Mountain", current: 38, target: 50, percentage: 76 },
  { region: "Heartland", current: 45, target: 60, percentage: 77 },
  { region: "Pac Coast", current: 28, target: 40, percentage: 70 },
];
export const GoalProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground font-semibold text-base">
          Goal progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goalProgressData.map((item, index) => (
            <div key={index} className="mb-[10.4px]">
              <GoalProgressItem item={item} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
