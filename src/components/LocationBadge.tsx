import { Building2, MapPin } from "lucide-react";
import type { Location } from "@/types/session";
import { cn } from "@/lib/utils";

interface LocationBadgeProps {
  location: Location;
  venue?: string;
  className?: string;
}

export function LocationBadge({ location, venue, className }: LocationBadgeProps) {
  const isOutdoor = location === "Outdoor";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        isOutdoor
          ? "border border-dashed border-foreground/25 bg-background text-foreground/80"
          : "border border-border bg-foreground/5 text-foreground",
        className,
      )}
    >
      {isOutdoor ? (
        <MapPin className="size-3 text-orange" strokeWidth={2.25} />
      ) : (
        <Building2 className="size-3 text-foreground/50" strokeWidth={2.25} />
      )}
      {venue ?? location}
    </span>
  );
}
