import { Dumbbell, Wind, Activity } from "lucide-react";
import type { Focus } from "@/types/session";

export const focusIcon = {
  Strength: Dumbbell,
  Conditioning: Wind,
  Mobility: Activity,
} as const;

export const focusToken: Record<Focus, string> = {
  Strength: "strength",
  Conditioning: "conditioning",
  Mobility: "mobility",
};
