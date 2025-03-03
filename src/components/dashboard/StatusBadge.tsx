import { cn } from "@/lib/utils";

type StatusType = "pay" | "do not pay" | "needs classification";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full text-xs font-semibold",
        status === "pay" && "bg-light-green text-green",
        status === "do not pay" && "bg-light-red text-red",
        status === "needs classification" && "bg-light-orange text-orange",
        className
      )}
    >
      {status === "pay" && "PAY"}
      {status === "do not pay" && "DO NOT PAY"}
      {status === "needs classification" && "NEEDS CLASSIFICATION"}
    </div>
  );
}
