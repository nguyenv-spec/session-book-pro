import type { AvailabilityState, Session } from "@/types/session";

export const sessions: Session[] = [
  { day: "MON", date: "10", time: "07:00", name: "Strength Foundations", focus: "Strength", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 2, capacity: 8 },
  { day: "MON", date: "10", time: "18:30", name: "Mobility & Recovery", focus: "Mobility", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 5, capacity: 8 },
  { day: "TUE", date: "11", time: "06:45", name: "Beach Sprints", focus: "Conditioning", location: "Outdoor", venue: "Barceloneta", duration: "45 min", spots: 0, capacity: 10 },
  { day: "TUE", date: "11", time: "19:00", name: "Posterior Chain", focus: "Strength", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 3, capacity: 8 },
  { day: "WED", date: "12", time: "07:00", name: "Mobility & Recovery", focus: "Mobility", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 6, capacity: 8 },
  { day: "WED", date: "12", time: "18:00", name: "Park Conditioning", focus: "Conditioning", location: "Outdoor", venue: "Ciutadella Park", duration: "50 min", spots: 4, capacity: 12 },
  { day: "THU", date: "13", time: "07:00", name: "Strength Foundations", focus: "Strength", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 1, capacity: 8 },
  { day: "THU", date: "13", time: "19:00", name: "Hips & Shoulders", focus: "Mobility", location: "Studio", venue: "Pallars Studio", duration: "45 min", spots: 5, capacity: 8 },
  { day: "FRI", date: "14", time: "07:00", name: "Olympic Lifting", focus: "Strength", location: "Studio", venue: "Pallars Studio", duration: "75 min", spots: 2, capacity: 6 },
  { day: "FRI", date: "14", time: "18:30", name: "Beach Conditioning", focus: "Conditioning", location: "Outdoor", venue: "Barceloneta", duration: "50 min", spots: 7, capacity: 12 },
  { day: "SAT", date: "15", time: "09:00", name: "Montjuïc Hills", focus: "Conditioning", location: "Outdoor", venue: "Montjuïc", duration: "75 min", spots: 3, capacity: 10 },
  { day: "SAT", date: "15", time: "11:00", name: "Recovery Lab", focus: "Mobility", location: "Studio", venue: "Pallars Studio", duration: "60 min", spots: 4, capacity: 8 },
];

export function getAvailabilityState(spots: number, capacity: number): AvailabilityState {
  if (spots === 0) return "full";
  if (spots <= 2) return "low";
  return "open";
}

/** First bookable session in the week, or the first full session for waitlist urgency. */
export function getNextSession(list: Session[] = sessions): Session {
  return list.find((s) => s.spots > 0) ?? list[0];
}
