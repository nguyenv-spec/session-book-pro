export type Focus = "Strength" | "Conditioning" | "Mobility";
export type Location = "Studio" | "Outdoor";

export interface Session {
  day: string;
  date: string;
  time: string;
  name: string;
  focus: Focus;
  location: Location;
  venue: string;
  duration: string;
  spots: number;
  capacity: number;
}

export type AvailabilityState = "open" | "low" | "full";
