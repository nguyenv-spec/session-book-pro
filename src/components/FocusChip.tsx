import type { Focus } from "@/types/session";
import { focusIcon } from "@/lib/focus";
import { cn } from "@/lib/utils";

const focusTextClass: Record<Focus, string> = {
  Strength: "text-focus-strength",
  Conditioning: "text-focus-conditioning",
  Mobility: "text-focus-mobility",
};

interface FocusChipProps {
  focus: Focus;
  showLabel?: boolean;
  className?: string;
}

export function FocusChip({ focus, showLabel = true, className }: FocusChipProps) {
  const Icon = focusIcon[focus];

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", focusTextClass[focus], className)}>
      <Icon className="size-3.5" strokeWidth={2.25} />
      {showLabel && focus}
    </span>
  );
}
