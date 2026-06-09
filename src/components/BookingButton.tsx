import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "row";

interface BookingButtonProps {
  label?: string;
  context?: string;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

export function BookingButton({
  label = "Book Your Session",
  context,
  variant = "primary",
  className,
  fullWidth = false,
}: BookingButtonProps) {
  const handleClick = () => {
    toast.success("Booking request received", {
      description: context
        ? `${context} — we'll confirm within 24 hours.`
        : "We'll confirm your session within 24 hours.",
    });
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none active:scale-[0.98]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-orange text-orange-foreground hover:bg-orange/90 px-6 h-12 text-[15px] rounded-md shadow-[0_1px_0_rgba(0,0,0,0.05)]",
    ghost:
      "text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground px-2 h-10 text-sm",
    row: "bg-foreground text-background hover:bg-orange hover:text-orange-foreground h-10 px-4 text-sm rounded-md",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
    >
      {label}
      {variant !== "ghost" && <ArrowUpRight className="size-4" strokeWidth={2.25} />}
    </button>
  );
}
