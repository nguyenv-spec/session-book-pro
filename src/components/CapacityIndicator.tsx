import { cn } from "@/lib/utils";
import { getAvailabilityState } from "@/lib/sessions";

interface CapacityIndicatorProps {
  spots: number;
  capacity: number;
  compact?: boolean;
  className?: string;
}

export function CapacityIndicator({ spots, capacity, compact = false, className }: CapacityIndicatorProps) {
  const state = getAvailabilityState(spots, capacity);
  const booked = capacity - spots;

  if (state === "full") {
    return (
      <span className={cn("font-mono text-xs uppercase tracking-wider text-foreground/40", className)}>
        Full · waitlist
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: capacity }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 min-w-[3px] flex-1 rounded-full",
              i < booked ? "bg-foreground/20" : "bg-orange/75",
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-wider",
          state === "low" ? "font-medium text-orange" : "text-foreground/70",
        )}
      >
        {state === "low" ? `${spots} left` : `${spots} / ${capacity} open`}
      </span>
      {!compact && (
        <span className="sr-only">
          {spots} of {capacity} spots available
        </span>
      )}
    </div>
  );
}
