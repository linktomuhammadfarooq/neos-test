import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GoalProgressItemProps {
  item: any;
  className?: string;
}

export function GoalProgressItem({ item, className }: GoalProgressItemProps) {
  const { region, current, target, percentage } = item;

  return (
    <>
      <div className="flex justify-between text-sm leading-normal font-medium mb-2">
        <span className="text-card-foreground">{region}</span>
        <span className="text-progress-secondry">
          ${current}M / ${target}M
        </span>
      </div>
      <div
        className={cn("flex items-center justify-baseline gap-4", className)}
      >
        <div className="flex-1">
          <Progress value={percentage} className="h-3 bg-progress-bg" />
        </div>
        <div className="text-right text-xs leading-normal font-medium text-card-foreground">
          {parseFloat(percentage).toFixed(1)}%
        </div>
      </div>
    </>
  );
}
