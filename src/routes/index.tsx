import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Users, Check, X, Dumbbell, Wind, Activity } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import doctorPortrait from "@/assets/doctor-portrait.jpg";
import studioInterior from "@/assets/studio-interior.jpg";
import outdoorBarcelona from "@/assets/outdoor-barcelona.jpg";
import communityStudio from "@/assets/community-studio.jpg";
import communityOutdoor from "@/assets/community-outdoor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forge Performance Medicine — Sports Medicine & Training, Barcelona" },
      {
        name: "description",
        content:
          "Performance training, mobility and injury prevention. Book a session at Forge Performance Medicine in Barcelona.",
      },
      { property: "og:title", content: "Forge Performance Medicine — Barcelona" },
      {
        property: "og:description",
        content: "Strength, conditioning, mobility. Studio and outdoor sessions.",
      },
    ],
  }),
  component: Index,
});

type Focus = "Strength" | "Conditioning" | "Mobility";
type Location = "Studio" | "Outdoor";

interface Session {
  day: string;
  date: string;
  time: string;
  name: string;
  focus: Focus;
  location: Location;
  duration: string;
  spots: number;
  capacity: number;
}

const sessions: Session[] = [
  { day: "MON", date: "10", time: "07:00", name: "Strength Foundations", focus: "Strength", location: "Studio", duration: "60 min", spots: 2, capacity: 8 },
  { day: "MON", date: "10", time: "18:30", name: "Mobility & Recovery", focus: "Mobility", location: "Studio", duration: "60 min", spots: 5, capacity: 8 },
  { day: "TUE", date: "11", time: "06:45", name: "Beach Sprints", focus: "Conditioning", location: "Outdoor", duration: "45 min", spots: 0, capacity: 10 },
  { day: "TUE", date: "11", time: "19:00", name: "Posterior Chain", focus: "Strength", location: "Studio", duration: "60 min", spots: 3, capacity: 8 },
  { day: "WED", date: "12", time: "07:00", name: "Mobility & Recovery", focus: "Mobility", location: "Studio", duration: "60 min", spots: 6, capacity: 8 },
  { day: "WED", date: "12", time: "18:00", name: "Park Conditioning", focus: "Conditioning", location: "Outdoor", duration: "50 min", spots: 4, capacity: 12 },
  { day: "THU", date: "13", time: "07:00", name: "Strength Foundations", focus: "Strength", location: "Studio", duration: "60 min", spots: 1, capacity: 8 },
  { day: "THU", date: "13", time: "19:00", name: "Hips & Shoulders", focus: "Mobility", location: "Studio", duration: "45 min", spots: 5, capacity: 8 },
  { day: "FRI", date: "14", time: "07:00", name: "Olympic Lifting", focus: "Strength", location: "Studio", duration: "75 min", spots: 2, capacity: 6 },
  { day: "FRI", date: "14", time: "18:30", name: "Beach Conditioning", focus: "Conditioning", location: "Outdoor", duration: "50 min", spots: 7, capacity: 12 },
  { day: "SAT", date: "15", time: "09:00", name: "Montjuïc Hills", focus: "Conditioning", location: "Outdoor", duration: "75 min", spots: 3, capacity: 10 },
  { day: "SAT", date: "15", time: "11:00", name: "Recovery Lab", focus: "Mobility", location: "Studio", duration: "60 min", spots: 4, capacity: 8 },
];

const focusIcon: Record<Focus, typeof Dumbbell> = {
  Strength: Dumbbell,
  Conditioning: Wind,
  Mobility: Activity,
};

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Schedule />
      <Trust />
      <SocialProof />
      <Logistics />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
          <span className="grid size-7 place-items-center rounded-sm bg-foreground text-background">
            <span className="text-[13px] font-extrabold">F</span>
          </span>
          <span>Forge<span className="text-orange">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
          <a href="#schedule" className="hover:text-foreground">Schedule</a>
          <a href="#trust" className="hover:text-foreground">About</a>
          <a href="#logistics" className="hover:text-foreground">Logistics</a>
        </nav>
        <BookingButton variant="row" label="Book" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-32">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground/60">
            <span className="size-1.5 rounded-full bg-orange" />
            Barcelona · Sports Medicine
          </div>
          <h1 className="font-display text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[72px]">
            Train stronger.<br />
            Stay consistent.<br />
            <span className="text-orange">Move better.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
            Performance training and injury prevention programs for athletes who refuse to settle. Studio and outdoor sessions across Barcelona.
          </p>
          <p className="mt-3 text-sm text-foreground/55">
            Led by Dr. Michael Anderson, MD — 15 years in sports medicine.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookingButton context="Hero" />
            <a
              href="#schedule"
              className="inline-flex h-12 items-center text-sm font-medium text-foreground/70 underline underline-offset-4 decoration-foreground/30 hover:text-foreground hover:decoration-foreground"
            >
              View this week's schedule →
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
            <img
              src={outdoorBarcelona}
              alt="Outdoor training session in a Barcelona park at golden hour"
              width={1280}
              height={896}
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-xl border border-border bg-background p-5 shadow-xl sm:block">
            <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">Next session</div>
            <div className="mt-1 font-display text-lg font-bold leading-tight">Beach Sprints</div>
            <div className="mt-1 text-sm text-foreground/60">Tomorrow · 06:45 · Barceloneta</div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="size-1.5 rounded-full bg-orange animate-pulse" />
              <span className="text-orange font-medium">Fully booked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">
              02 — Schedule
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              This week.
            </h2>
            <p className="mt-3 max-w-md text-foreground/65">
              12 sessions across the studio and outdoor locations. One tap to book.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60">
            <LegendDot label="Strength" />
            <LegendDot label="Conditioning" />
            <LegendDot label="Mobility" />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="hidden grid-cols-[64px_120px_1fr_140px_120px_120px_140px] items-center gap-4 border-b border-border bg-surface/60 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-foreground/50 md:grid">
            <div>Day</div>
            <div>Time</div>
            <div>Session</div>
            <div>Focus</div>
            <div>Location</div>
            <div>Availability</div>
            <div className="text-right">Book</div>
          </div>

          <ul>
            {sessions.map((s, i) => {
              const Icon = focusIcon[s.focus];
              const isFull = s.spots === 0;
              const isLow = !isFull && s.spots <= 2;
              return (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-border px-5 py-4 transition-colors first:border-t-0 hover:bg-surface/40 md:grid-cols-[64px_120px_1fr_140px_120px_120px_140px]"
                >
                  <div className="col-span-2 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground/55 md:col-span-1 md:block">
                    <span className="text-foreground">{s.day}</span>
                    <span className="font-display text-2xl font-bold text-foreground md:hidden">
                      {s.date}
                    </span>
                    <span className="hidden text-foreground/40 md:block">{s.date}</span>
                  </div>

                  <div className="col-span-2 -mt-2 font-mono text-sm tabular-nums text-foreground md:col-span-1 md:mt-0">
                    {s.time}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <div className="font-display text-lg font-semibold leading-tight tracking-tight">
                      {s.name}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/55 md:hidden">
                      <span className="inline-flex items-center gap-1">
                        <Icon className="size-3" /> {s.focus}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" /> {s.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" /> {s.duration}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <span className="inline-flex items-center gap-1.5 text-sm text-foreground/75">
                      <Icon className="size-3.5 text-foreground/45" strokeWidth={2.25} />
                      {s.focus}
                    </span>
                  </div>

                  <div className="hidden text-sm md:block">
                    <span
                      className={
                        s.location === "Outdoor"
                          ? "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium"
                          : "inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium"
                      }
                    >
                      {s.location}
                    </span>
                  </div>

                  <div className="hidden text-sm md:block">
                    {isFull ? (
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                        Full · waitlist
                      </span>
                    ) : (
                      <span className={`font-mono text-xs uppercase tracking-wider ${isLow ? "text-orange" : "text-foreground/70"}`}>
                        {s.spots} / {s.capacity} open
                      </span>
                    )}
                  </div>

                  <div className="col-span-2 md:col-span-1 md:text-right">
                    {isFull ? (
                      <button
                        type="button"
                        onClick={() => import("sonner").then((m) => m.toast("Added to waitlist", { description: `${s.name} · ${s.day} ${s.time}` }))}
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground/70 hover:bg-surface md:w-auto"
                      >
                        Waitlist
                      </button>
                    ) : (
                      <BookingButton
                        variant="row"
                        label="Book"
                        context={`${s.name} · ${s.day} ${s.time}`}
                        fullWidth
                        className="md:w-auto"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LegendDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full bg-foreground/40" />
      {label}
    </span>
  );
}

function Trust() {
  return (
    <section id="trust" className="border-b border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
              <img
                src={doctorPortrait}
                alt="Dr. Michael Anderson, Medical Director"
                width={1024}
                height={1280}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-background">
                <div>
                  <div className="font-display text-xl font-bold">Dr. Michael Anderson</div>
                  <div className="text-sm opacity-80">MD · Medical Director</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">
              03 — Who runs the room
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Not a gym.<br />A clinical practice.
            </h2>

            <ul className="mt-10 space-y-6">
              <Credential
                num="01"
                title="15 years in sports medicine and orthopedic rehabilitation"
                body="Board-certified MD. Previously consulted for collegiate athletics and professional cycling teams."
              />
              <Credential
                num="02"
                title="Evidence-based protocols, tailored per athlete"
                body="Every program built on assessment, not templates. Progress is measured and adjusted weekly."
              />
              <Credential
                num="03"
                title="Consistency over intensity"
                body="Structured, progressive programming designed to keep you training for years — not weeks."
              />
            </ul>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <figure className="overflow-hidden rounded-lg bg-surface">
                <img
                  src={studioInterior}
                  alt="Interior of the Forge studio in Barcelona"
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/3] size-full object-cover"
                />
              </figure>
              <figure className="overflow-hidden rounded-lg bg-surface">
                <img
                  src={outdoorBarcelona}
                  alt="Outdoor training in a Barcelona park"
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/3] size-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Credential({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <li className="flex gap-5">
      <span className="font-mono text-xs text-orange">{num}</span>
      <div>
        <div className="font-display text-lg font-semibold tracking-tight">{title}</div>
        <div className="mt-1 text-sm text-foreground/65">{body}</div>
      </div>
    </li>
  );
}

const testimonials = [
  {
    quote: "Back to full training in six weeks. No shortcuts — just solid programming.",
    name: "Marc",
    age: 34,
    role: "Triathlete",
  },
  {
    quote: "The mobility work changed how I move. First time pain-free in years.",
    name: "Elena",
    age: 29,
    role: "CrossFit Coach",
  },
  {
    quote: "Professional, focused, no fluff. Exactly what I needed post-surgery.",
    name: "David",
    age: 41,
    role: "Marathon Runner",
  },
  {
    quote: "Programs that actually fit around a 50-hour work week.",
    name: "Júlia",
    age: 37,
    role: "Surgeon",
  },
];

function SocialProof() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">
            04 — Athletes
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            They keep showing up.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-card p-7"
            >
              <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {t.name} <span className="text-foreground/45">· {t.age}</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/50">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl bg-surface">
            <img
              src={communityStudio}
              alt="Athletes performing mobility work in the studio"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[16/10] size-full object-cover"
            />
          </figure>
          <figure className="overflow-hidden rounded-xl bg-surface">
            <img
              src={communityOutdoor}
              alt="Group training session at Barceloneta beach"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[16/10] size-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Logistics() {
  const items = [
    { icon: MapPin, label: "Base", value: "Carrer de Pallars, Poblenou · Barcelona" },
    { icon: MapPin, label: "Outdoor", value: "Ciutadella Park · Barceloneta · Montjuïc" },
    { icon: Clock, label: "Session", value: "45–75 minutes" },
    { icon: Users, label: "Group size", value: "6–12 athletes" },
  ];

  return (
    <section id="logistics" className="border-b border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">
              05 — Logistics
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Practical details.
            </h2>
            <p className="mt-4 max-w-md text-foreground/65">
              Everything you need to know before your first session. No paperwork until you arrive.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {items.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-background p-6">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                    <Icon className="size-3.5" />
                    {label}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold tracking-tight">{value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-background p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                What to bring
              </div>
              <p className="mt-2 text-foreground/80">
                Athletic wear, water bottle, and any recent imaging or medical notes if you're managing a specific issue.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FitCard
                kind="for"
                title="For"
                items={[
                  "Athletes returning from injury",
                  "Managing chronic pain or imbalance",
                  "Optimizing performance under load",
                ]}
              />
              <FitCard
                kind="not"
                title="Not for"
                items={[
                  "Acute emergency care",
                  "Pure aesthetic-only training",
                  "Drop-in casual fitness classes",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FitCard({ kind, title, items }: { kind: "for" | "not"; title: string; items: string[] }) {
  const Icon = kind === "for" ? Check : X;
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Icon
              className={`mt-0.5 size-4 shrink-0 ${kind === "for" ? "text-orange" : "text-foreground/35"}`}
              strokeWidth={2.5}
            />
            <span className={kind === "for" ? "text-foreground" : "text-foreground/55"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-background sm:px-16 sm:py-24">
          <div className="absolute right-8 top-8 font-mono text-[11px] uppercase tracking-widest text-background/40">
            06 — Book
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Ready to start?<br />
              <span className="text-orange">Book your session.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base text-background/70 sm:text-lg">
              First session includes a full movement assessment. We'll take it from there.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BookingButton context="Final CTA" />
              <a
                href="#schedule"
                className="inline-flex h-12 items-center text-sm font-medium text-background/70 underline underline-offset-4 decoration-background/30 hover:text-background hover:decoration-background"
              >
                Or browse the schedule
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-orange/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 text-sm text-foreground/55 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="grid size-7 place-items-center rounded-sm bg-foreground text-background">
            <span className="text-[13px] font-extrabold">F</span>
          </span>
          Forge<span className="text-orange">.</span> Performance Medicine
        </div>
        <div className="font-mono text-xs uppercase tracking-widest">
          Barcelona · Established 2018
        </div>
      </div>
    </footer>
  );
}
