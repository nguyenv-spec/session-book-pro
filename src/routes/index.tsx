import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, Users, Check, X } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { CapacityIndicator } from "@/components/CapacityIndicator";
import { FocusChip } from "@/components/FocusChip";
import { LocationBadge } from "@/components/LocationBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getAvailabilityState, getNextSession, sessions } from "@/lib/sessions";
import type { Focus, Session } from "@/types/session";
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

const focusBorderClass: Record<Focus, string> = {
  Strength: "border-l-focus-strength",
  Conditioning: "border-l-focus-conditioning",
  Mobility: "border-l-focus-mobility",
};

const focusDotClass: Record<Focus, string> = {
  Strength: "bg-focus-strength",
  Conditioning: "bg-focus-conditioning",
  Mobility: "bg-focus-mobility",
};

function Index() {
  return (
    <main className="paper-grain relative bg-background text-foreground">
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Schedule />
        <Trust />
        <SocialProof />
        <Logistics />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur motion-safe:transition-shadow motion-safe:duration-300 ${scrolled ? "nav-scrolled" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
          <span className="grid size-7 place-items-center rounded-sm bg-foreground text-background">
            <span className="text-[13px] font-extrabold">F</span>
          </span>
          <span>
            Forge<span className="text-orange">.</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
          <a href="#schedule" className="hover:text-foreground">
            Schedule
          </a>
          <a href="#trust" className="hover:text-foreground">
            About
          </a>
          <a href="#logistics" className="hover:text-foreground">
            Logistics
          </a>
        </nav>
        <BookingButton variant="row" label="Book" />
      </div>
    </header>
  );
}

function Hero() {
  const next = getNextSession();
  const nextState = getAvailabilityState(next.spots, next.capacity);

  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <ScrollReveal>
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">01 — Start</div>
            <div className="brand-rule mt-4" />
            <div className="mb-6 mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground/60">
              <span className="size-1.5 rounded-full bg-orange" />
              Barcelona · Sports Medicine
            </div>
            <h1 className="font-display text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[72px]">
              Train stronger.
              <br />
              Stay consistent.
              <br />
              <span className="text-orange">Move better.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
              Performance training and injury prevention programs for athletes who refuse to settle. Studio and outdoor
              sessions across Barcelona.
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
            <div className="brand-image relative aspect-[4/5] bg-surface">
              <img
                src={outdoorBarcelona}
                alt="Outdoor training session in a Barcelona park at golden hour"
                width={1280}
                height={896}
                className="hero-image-enter size-full object-cover"
              />
            </div>
            <NextSessionCard session={next} state={nextState} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function NextSessionCard({ session, state }: { session: Session; state: ReturnType<typeof getAvailabilityState> }) {
  const pulse = state === "low" || state === "full";

  return (
    <div className="mt-4 w-full rounded-xl border border-border bg-background p-4 shadow-lg sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:w-56 sm:p-5">
      <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">Next session</div>
      <div className="mt-1 font-display text-lg font-bold leading-tight">{session.name}</div>
      <div className="mt-1 text-sm text-foreground/60">
        {session.day} {session.date} · {session.time} · {session.venue}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {pulse && <span className="size-1.5 rounded-full bg-orange motion-safe:animate-pulse" />}
        <span className={state === "open" ? "text-foreground/70" : "font-medium text-orange"}>
          {state === "full" ? "Fully booked" : state === "low" ? `${session.spots} spots left` : `${session.spots} spots open`}
        </span>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="border-b border-border/60">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">02 — Schedule</div>
              <div className="brand-rule mt-4" />
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">This week.</h2>
              <p className="mt-3 max-w-md text-foreground/65">
                12 sessions across the studio and outdoor locations. One tap to book.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60">
              <LegendDot focus="Strength" />
              <LegendDot focus="Conditioning" />
              <LegendDot focus="Mobility" />
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
              {sessions.map((s) => (
                <ScheduleRow key={`${s.day}-${s.time}-${s.name}`} session={s} />
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function ScheduleRow({ session: s }: { session: Session }) {
  const isFull = s.spots === 0;
  const state = getAvailabilityState(s.spots, s.capacity);
  const pulse = state === "low" || state === "full";

  return (
    <li
      className={`grid grid-cols-[1fr_auto] items-center gap-4 border-l-2 border-t border-border px-5 py-4 transition-colors first:border-t-0 hover:bg-surface/40 md:grid-cols-[64px_120px_1fr_140px_120px_120px_140px] ${focusBorderClass[s.focus]}`}
    >
      <div className="col-span-2 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground/55 md:col-span-1 md:block">
        <span className="text-foreground">{s.day}</span>
        <span className="font-display text-2xl font-bold text-foreground md:hidden">{s.date}</span>
        <span className="hidden text-foreground/40 md:block">{s.date}</span>
      </div>

      <div className="col-span-2 -mt-2 font-mono text-sm tabular-nums text-foreground md:col-span-1 md:mt-0">
        {s.time}
      </div>

      <div className="col-span-2 md:col-span-1">
        <div className="font-display text-lg font-semibold leading-tight tracking-tight">{s.name}</div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/55 md:hidden">
          <FocusChip focus={s.focus} />
          <LocationBadge location={s.location} venue={s.location === "Outdoor" ? s.venue : undefined} />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {s.duration}
          </span>
        </div>
      </div>

      <div className="hidden md:block">
        <FocusChip focus={s.focus} />
      </div>

      <div className="hidden md:block">
        <LocationBadge location={s.location} venue={s.location === "Outdoor" ? s.venue : s.location} />
      </div>

      <div className="hidden md:block">
        <div className="flex items-center gap-2">
          {pulse && <span className="size-1.5 shrink-0 rounded-full bg-orange motion-safe:animate-pulse" />}
          <CapacityIndicator spots={s.spots} capacity={s.capacity} compact />
        </div>
      </div>

      <div className="col-span-2 flex flex-col gap-2 md:col-span-1 md:items-end">
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            {pulse && <span className="size-1.5 shrink-0 rounded-full bg-orange motion-safe:animate-pulse" />}
            <CapacityIndicator spots={s.spots} capacity={s.capacity} compact />
          </div>
        </div>
        {isFull ? (
          <button
            type="button"
            onClick={() =>
              import("sonner").then((m) =>
                m.toast("Added to waitlist", { description: `${s.name} · ${s.day} ${s.time}` }),
              )
            }
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-dashed border-foreground/25 bg-background px-4 text-sm font-medium text-foreground/60 hover:border-foreground/40 hover:bg-surface md:w-auto"
          >
            Join waitlist
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
}

function LegendDot({ focus }: { focus: Focus }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-1.5 rounded-full ${focusDotClass[focus]}`} />
      {focus}
    </span>
  );
}

function Trust() {
  return (
    <section id="trust" className="border-b border-border/60 bg-surface/40">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="brand-image relative aspect-[4/5] bg-surface">
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
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">03 — Who runs the room</div>
              <div className="brand-rule mt-4" />
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Not a gym.
                <br />
                A clinical practice.
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
                <figure className="brand-image bg-surface">
                  <img
                    src={studioInterior}
                    alt="Interior of the Forge studio in Barcelona"
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="aspect-[4/3] size-full object-cover"
                  />
                </figure>
                <figure className="brand-image bg-surface">
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
      </ScrollReveal>
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
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-12 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">04 — Athletes</div>
            <div className="brand-rule mt-4" />
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">They keep showing up.</h2>
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
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground/50">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <figure className="brand-image bg-surface">
              <img
                src={communityStudio}
                alt="Athletes performing mobility work in the studio"
                width={1280}
                height={896}
                loading="lazy"
                className="aspect-[16/10] size-full object-cover"
              />
            </figure>
            <figure className="brand-image bg-surface">
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
      </ScrollReveal>
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
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">05 — Logistics</div>
              <div className="brand-rule mt-4" />
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Practical details.</h2>
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
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">What to bring</div>
                <p className="mt-2 text-foreground/80">
                  Athletic wear, water bottle, and any recent imaging or medical notes if you're managing a specific
                  issue.
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
      </ScrollReveal>
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
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="relative overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-background sm:px-16 sm:py-24">
            <div
              className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display text-[180px] font-extrabold leading-none text-background/[0.04] sm:text-[240px]"
              aria-hidden="true"
            >
              F.
            </div>
            <div className="absolute right-8 top-8 font-mono text-[11px] uppercase tracking-widest text-background/40">
              06 — Book
            </div>
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Ready to start?
                <br />
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
      </ScrollReveal>
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
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs uppercase tracking-widest">Barcelona · Established 2018</div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
