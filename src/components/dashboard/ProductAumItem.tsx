import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProductAumItemProps {
  name: string;
  value: number;
  max?: number;
  className?: string;
}

export function ProductAumItem({
  name,
  value,
  max = 20000,
  className,
}: ProductAumItemProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="text-sm leading-normal font-semibold text-card-foreground">
        {name}
      </div>
      <div className="flex-1">
        <Progress value={percentage} className="h-3 bg-progress-bg" />
      </div>
      <div className="text-right text-sm leading-normal font-medium text-gray-light">
        ${value.toLocaleString()}.0M
      </div>
    </div>
  );
}
