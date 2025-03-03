import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface ClientRowProps {
  id: string;
  name: string;
  location: string;
  isNew?: boolean;
  status?: "pay" | "do not pay" | "needs classification";
  aum: string;
  imgUrl?: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
  className?: string;
}

export function ClientRow({
  id,
  name,
  location,
  isNew,
  status,
  aum,
  imgUrl,
  change,
  className,
}: ClientRowProps) {
  return (
    <div className={cn("grid grid-cols-[1.5fr_1fr_1fr] pb-3", className)}>
      <div className="flex items-center space-x-4">
        {imgUrl ? (
          <img src={imgUrl} className="size-10" alt={name} />
        ) : (
          <div className="textsm leading-normal text-black flex h-10 w-10 items-center justify-center rounded-full bg-very-light-gray font-normal uppercase">
            {id}
          </div>
        )}
        <div>
          <div className="flex items-center">
            <p className="text-foreground font-medium text-sm leading-normal">
              {name}
            </p>
            {isNew && (
              <span className="ml-2 rounded-full bg-very-light-blue px-2 py-0.5 text-xs font-semibold text-deep-blue">
                NEW
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-normal font-normal">
            {location}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start">
        {status && (
          <StatusBadge
            status={status}
            className="px-4 py-[2px] flex justify-center items-center"
          />
        )}
      </div>
      <div className="text-right">
        <p className="text-sm leading-normal font-semibold">{aum}</p>
        <p
          className={cn(
            "text-xs flex items-center justify-end leading-normal font-normal",
            change.trend === "up" ? "text-dark-green" : "text-dark-red"
          )}
        >
          {change.trend === "up" ? "↑ +" : "↓ -"} {change.value}
        </p>
      </div>
    </div>
  );
}
