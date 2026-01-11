import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Cloud,
  FileText,
  GraduationCap,
  LineChart,
  Lock,
  Mail,
  MapPin,
  Network,
  Phone,
  Radar,
  Server,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Lightweight className helper.
 */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Premium graphite theme.
 * Notes:
 * - This file intentionally avoids TypeScript-only syntax (e.g. `as const`, `type` aliases)
 *   to prevent parser/tooling mismatches in some sandboxes.
 */
const UI = {
  page: "min-h-screen bg-zinc-950 text-zinc-50",
  pageWash:
    "pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900",

  container: "mx-auto max-w-6xl px-4",

  subtleText: "text-zinc-200/80",
  mutedBorder: "border-zinc-800",

  /**
   * Premium graphite surfaces (single, consistent style).
   */
  card: "rounded-2xl bg-zinc-900/70 border border-zinc-800/60 text-zinc-50 shadow-md shadow-black/20",
  cardStrong:
    "rounded-2xl bg-zinc-900/70 border border-zinc-800/60 text-zinc-50 shadow-md shadow-black/20",
  panel: "rounded-2xl bg-zinc-900/70 border border-zinc-800/60 shadow-md shadow-black/20",
  chip: "grid place-items-center rounded-2xl bg-zinc-950/10 border border-zinc-800/60",

  // Inputs
  input:
    "rounded-2xl bg-zinc-900/55 border-zinc-800 placeholder:text-zinc-500 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-0",
  textarea:
    "min-h-[120px] rounded-2xl bg-zinc-900/55 border-zinc-800 placeholder:text-zinc-500 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-0",

  // Premium "glass" outline button.
  button:
    "rounded-2xl border border-zinc-700/70 bg-zinc-950/10 text-sm font-medium tracking-tight text-zinc-50/90 backdrop-blur shadow-sm shadow-black/20 transition-all duration-200 hover:bg-zinc-900/35 hover:border-zinc-600/80 hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-lime-400/20 focus-visible:ring-offset-0 active:translate-y-px",

  // Small "pill" tags (used in footer areas).
  pill:
    "inline-flex items-center rounded-2xl bg-zinc-900/70 border border-zinc-800/60 text-xs font-medium tracking-tight text-zinc-50/90 shadow-sm shadow-black/20 px-3 py-1",
};

const motionFadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const motionStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

// Lightweight self-tests (run only in test env).
(function runSelfTests() {
  const isTestEnv =
    typeof process !== "undefined" &&
    process &&
    process.env &&
    (process.env.NODE_ENV === "test" || process.env.VITEST === "true");

  if (!isTestEnv) return;

  console.assert(isValidEmail("a@b.com") === true, "Expected valid email");
  console.assert(
    isValidEmail("john.doe+tag@example.co.uk") === true,
    "Expected valid email with plus and subdomain"
  );
  console.assert(isValidEmail("not-an-email") === false, "Expected invalid email");
  console.assert(isValidEmail("a@b") === false, "Expected invalid email without TLD");
  console.assert(isValidEmail(" a@b.com ") === true, "Expected trimming to work");
  console.assert(isValidEmail("") === false, "Expected empty email to be invalid");
})();

export default function CyberSoloAgencyLanding() {
  const [form, setForm] = useState({ name: "", email: "", company: "", msg: "" });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const services = useMemo(
    () => [
      {
        icon: Radar,
        title: "Audyt i QuickScan",
        description:
          "Szybka diagnoza ryzyk i plan naprawczy: MFA, backup, uprawnienia, konfiguracje, logging.",
        bullets: ["Raport + Top 20 działań", "Backlog z priorytetami", "Spotkanie podsumowujące"],
      },
      {
        icon: Shield,
        title: "Hardening i wdrożenia",
        description:
          "Konfiguracje, które realnie zmniejszają ryzyko: tożsamość, poczta, endpointy, segmentacja.",
        bullets: ["Baseline M365/Entra", "EDR/Defender", "Segmentacja sieci"],
      },
      {
        icon: LineChart,
        title: "vCISO (abonament)",
        description:
          "Stała opieka nad cyber: roadmapa, polityki, wskaźniki, vendorzy, przeglądy kwartalne.",
        bullets: ["10–20h/mies.", "KPI i ryzyka", "Wsparcie zarządu"],
      },
      {
        icon: GraduationCap,
        title: "Awareness i szkolenia",
        description:
          "Praktyczne szkolenia i ćwiczenia: phishing, BEC, praca zdalna, zasady i nawyki.",
        bullets: ["Program 3-miesięczny", "Warsztaty dla IT", "Tabletop dla zarządu"],
      },
      {
        icon: Mail,
        title: "Bezpieczeństwo poczty",
        description:
          "Ochrona przed phishingiem i BEC: DMARC/DKIM/SPF, polityki, alerty i trening.",
        bullets: ["Antyphishing", "DMARC wdrożenie", "Safe Links/Attachments"],
      },
      {
        icon: Server,
        title: "Hosty i serwery",
        description:
          "Twarde ustawienia, aktualizacje, szyfrowanie, konta uprzywilejowane, kopie i testy.",
        bullets: ["Hardening Windows/Linux", "Patch management", "Ransomware readiness"],
      },
    ],
    []
  );

  const packages = useMemo(
    () => [
      {
        name: "Security QuickScan",
        price: "od 7 900 zł",
        highlight: "Idealny start",
        features: [
          "Discovery + wywiad (2h)",
          "Przegląd MFA / logowań / uprawnień",
          "Podstawowy skan podatności",
          "Raport + Top 20 poprawek",
          "Backlog z priorytetami",
        ],
      },
      {
        name: "M365 Secure Baseline",
        price: "od 12 900 zł",
        highlight: "Najczęściej wybierany",
        features: [
          "Entra ID + Conditional Access",
          "Wyłączenie legacy auth",
          "Bezpieczeństwo poczty (anti-phish)",
          "Zasady udostępnień Teams/SharePoint",
          "Alerty + podstawowe dashboardy",
        ],
        emphasized: true,
      },
      {
        name: "vCISO Starter",
        price: "od 4 900 zł / mies.",
        highlight: "Stała opieka",
        features: [
          "10h/mies. + priorytety na kwartał",
          "Roadmapa bezpieczeństwa",
          "Polityki i procedury (praktyczne)",
          "Przegląd dostawców i umów",
          "KPI, ryzyka i raport do zarządu",
        ],
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        icon: FileText,
        title: "1) Diagnoza",
        description:
          "Krótki wywiad i przegląd najważniejszych miejsc: tożsamość, poczta, backup, endpointy.",
      },
      {
        icon: Wrench,
        title: "2) Naprawy",
        description:
          "Ustalamy plan i wdrażamy zmiany w iteracjach. Każda zmiana ma właściciela i termin.",
      },
      {
        icon: BadgeCheck,
        title: "3) Utrzymanie",
        description:
          "Cykliczne przeglądy, KPI i alerty. Bezpieczeństwo ma działać na co dzień, nie na papierze.",
      },
    ],
    []
  );

  const kpis = useMemo(
    () => [
      { label: "MFA coverage", value: "90%+", note: "cel po wdrożeniu baseline" },
      { label: "Czas reakcji", value: "< 24h", note: "dla krytycznych incydentów" },
      { label: "Backup test", value: "co kwartał", note: "test odtworzenia" },
      { label: "Top ryzyka", value: "-40%", note: "po 60 dniach programu" },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Czy da się to zrobić bez dużego zespołu?",
        a: "Tak, jeśli zakres jest dobrze zdefiniowany. Pracuję produktowo: QuickScan → plan → wdrożenia → utrzymanie. W razie potrzeby mam sprawdzonych partnerów (np. forensics).",
      },
      {
        q: "Czy obsługujesz tylko Microsoft 365?",
        a: "Nie. M365/Entra to częsty rdzeń w MŚP, ale pracuję też z firewallami, VPN/ZTNA, backupami, Windows/Linux i wybranymi chmurami. Zakres dobieramy do realnych ryzyk.",
      },
      {
        q: "Ile trwa QuickScan?",
        a: "Zwykle 7–10 dni roboczych. Kończymy raportem, listą priorytetów i backlogiem z konkretnymi zadaniami.",
      },
      {
        q: "Czy robisz szkolenia?",
        a: "Tak — praktyczne, bez straszenia. Najlepiej działa program 3-miesięczny: start + 2 follow-upy + ćwiczenia (phishing/tabletop).",
      },
      {
        q: "Czy możesz przejąć całe IT?",
        a: "Nie jestem helpdeskiem. Skupiam się na bezpieczeństwie i konfiguracjach, które zmniejszają ryzyko. Mogę współpracować z Twoim IT/MSP lub wskazać partnera.",
      },
    ],
    []
  );

  const handleChange = useCallback(
    (field) => (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFormError(null);
      setFormSuccess(null);
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const name = form.name.trim();
      const email = form.email.trim();
      const msg = form.msg.trim();

      if (!name || !email || !msg) {
        setFormError("Uzupełnij imię, email i opis.");
        return;
      }
      if (!isValidEmail(email)) {
        setFormError("Podaj poprawny adres email.");
        return;
      }

      setFormSuccess("Dzięki! To wizualizacja — podepnij wysyłkę (API/email) w projekcie.");
    },
    [form]
  );

  return (
    <div className={UI.page}>
      <div className={UI.pageWash} />

      {/* Premium "Kali" glow + subtle noise */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(132,204,22,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(520px_360px_at_85%_78%,rgba(132,204,22,0.10),transparent_60%)]" />
        <div className="noise-layer absolute inset-0 opacity-[0.04]" />
      </div>

      <style>{`
        .noise-layer {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-repeat: repeat;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Top bar */}
      <div className={cn("border-b", UI.mutedBorder)}>
        <div className={cn(UI.container, "flex items-center justify-between py-3")}>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-50 text-zinc-950 shadow-sm">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">SoloSec</div>
              <div className={cn("text-xs", UI.subtleText)}>Cyberbezpieczeństwo dla MŚP</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Nawigacja">
            <a className={cn("text-sm", UI.subtleText, "hover:text-lime-300")} href="#uslugi">
              Usługi
            </a>
            <a className={cn("text-sm", UI.subtleText, "hover:text-lime-300")} href="#pakiety">
              Pakiety
            </a>
            <a className={cn("text-sm", UI.subtleText, "hover:text-lime-300")} href="#jak-pracuje">
              Jak pracuję
            </a>
            <a className={cn("text-sm", UI.subtleText, "hover:text-lime-300")} href="#faq">
              FAQ
            </a>
            <Button asChild size="sm" variant="outline" className={UI.button}>
              <a href="#kontakt">Bezpłatna konsultacja</a>
            </Button>
          </nav>

          <div className="md:hidden">
            <Button asChild size="sm" variant="outline" className={UI.button}>
              <a href="#kontakt">Kontakt</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className={cn(UI.container, "py-14 md:py-20")}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            variants={motionStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-6"
          >
            <motion.div variants={motionFadeUp} className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-2xl">Audyt → Wdrożenia → Utrzymanie</Badge></motion.div>

            <motion.h1
              variants={motionFadeUp}
              className="text-3xl font-semibold tracking-tight md:text-5xl"
            >
              Cyberbezpieczeństwo, które da się wdrożyć — i utrzymać.
            </motion.h1>

            <motion.p
              variants={motionFadeUp}
              className={cn("text-base leading-relaxed md:text-lg", UI.subtleText)}
            >
              Pomagam firmom MŚP zmniejszać ryzyko phishingu, ransomware i wycieków danych. Zaczynamy od szybkiej diagnozy,
              przechodzimy do konkretnych wdrożeń i kończymy na stałej opiece (vCISO).
            </motion.p>

            <motion.div variants={motionFadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="outline" className={UI.button}>
                <a href="#kontakt">
                  Umów rozmowę <ArrowRight className="ml-2 h-4 w-4 opacity-90" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className={UI.button}>
                <a href="#pakiety">Zobacz pakiety</a>
              </Button>
            </motion.div>

            <motion.div
              variants={motionFadeUp}
              className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4"
            >
              {kpis.map((k) => (
                <Card key={k.label} className={UI.card}>
                  <CardContent className="p-4">
                    <div className="text-xs text-zinc-300/80">{k.label}</div>
                    <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-50">{k.value}</div>
                    <div className="mt-1 text-xs text-zinc-300/80">{k.note}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <Card className={cn(UI.card, "overflow-hidden")}>
              <CardHeader className={cn("border-b border-zinc-700/70", UI.mutedBorder)}>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  Najczęstsze ryzyka w MŚP
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {[
                    {
                      icon: Mail,
                      title: "Phishing i BEC",
                      desc: "Brak MFA, brak regulacji poczty, brak DMARC.",
                    },
                    {
                      icon: Server,
                      title: "Ransomware",
                      desc: "Słaby backup, brak testów odtworzeń, zbyt duże uprawnienia.",
                    },
                    {
                      icon: Network,
                      title: "Płaska sieć",
                      desc: "Brak segmentacji, IoT w tej samej sieci co serwery.",
                    },
                    {
                      icon: Cloud,
                      title: "Chaos w SaaS",
                      desc: "Zbyt szerokie udostępnienia, brak logów i kontroli gości.",
                    },
                  ].map((r) => (
                    <div key={r.title} className={cn(UI.panel, "flex items-start gap-3 p-4")}>
                      <div className={cn(UI.chip, "h-9 w-9")}>
                        <r.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium">{r.title}</div>
                        <div className={cn("text-sm", UI.subtleText)}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cn(UI.panel, "mt-6 p-4")}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Cel: szybkie zwycięstwa w 30 dni
                  </div>
                  <p className={cn("mt-2 text-sm", UI.subtleText)}>
                    Najpierw rzeczy o największym wpływie: MFA, backup, uprawnienia i poczta. Dopiero potem „ładne papierki”.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="pointer-events-none absolute -z-10 -inset-6 rounded-[32px] bg-gradient-to-br from-zinc-900/30 via-zinc-950 to-zinc-900/30 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Trust / scope */}
      <section className={cn("border-y", UI.mutedBorder, "bg-zinc-900/25")}>
        <div className={cn(UI.container, "py-10")}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Dla kogo</div>
              <div className={cn("mt-1 text-sm", UI.subtleText)}>
                Firmy 15–300 osób: usługi, e-commerce, produkcja lekka, software house, biura rachunkowe.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["M365/Entra", "Windows/Linux", "Firewall/VPN", "Backup"].map((t) => (
                <Card key={t} className={UI.card}>
                  <CardContent className="p-4 text-center text-sm font-medium">{t}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="uslugi" className={cn(UI.container, "py-14")}>
        <motion.div
          variants={motionStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-8"
        >
          <motion.div variants={motionFadeUp} className="space-y-2">
            <div className={cn("text-sm font-medium", UI.subtleText)}>Oferta</div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Usługi, które da się dowieźć solo</h2>
            <p className={cn("max-w-2xl text-sm leading-relaxed md:text-base", UI.subtleText)}>
              Konkretny zakres, konkretne wyniki. Bez obietnic „będziemy bezpieczni na 100%” — tylko mierzalna redukcja
              ryzyka.
            </p>
          </motion.div>

          <motion.div variants={motionStagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <motion.div key={s.title} variants={motionFadeUp}>
                <Card className={cn(UI.card, "h-full")}>
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(UI.chip, "h-10 w-10")}>
                          <s.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-base">{s.title}</CardTitle>
                      </div></div>
                    <p className={cn("text-sm", UI.subtleText)}>{s.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {s.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4" aria-hidden="true" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Packages */}
      <section id="pakiety" className={cn("border-y", UI.mutedBorder, "bg-zinc-900/25")}>
        <div className={cn(UI.container, "py-14")}>
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div className="space-y-2">
              <div className={cn("text-sm font-medium", UI.subtleText)}>Pakiety</div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Proste pakiety, jasny efekt</h2>
              <p className={cn("max-w-2xl text-sm md:text-base", UI.subtleText)}>
                Widełki cenowe zależą od liczby użytkowników/urządzeń i złożoności środowiska. Zawsze dostajesz zakres i
                deliverables przed startem.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button asChild variant="outline" className={UI.button}>
                <a href="#kontakt">
                  Poproś o wycenę <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {packages.map((p) => (
              <Card key={p.name} className={cn(p.emphasized ? UI.cardStrong : UI.card)}>
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <div className={cn("mt-1 text-sm", UI.subtleText)}>{p.highlight}</div>
                    </div>
                    {p.emphasized ? (
                      <Badge className="rounded-2xl">Polecany</Badge>
                    ) : (
                      <Badge className="rounded-2xl">Pakiet</Badge>
                    )}
                  </div>
                  <div className="pt-1 text-2xl font-semibold tracking-tight">{p.price}</div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" aria-hidden="true" />
                      <span>{f}</span>
                    </div>
                  ))}

                  <div className="pt-4">
                    <Button asChild variant="outline" className={cn(UI.button, "w-full")}>
                      <a href="#kontakt">Zapytaj o termin</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { icon: Shield, title: "Zero Trust", desc: "MFA, CA, minimalne uprawnienia" },
              { icon: Network, title: "Segmentacja", desc: "VLAN, goście/IoT, dostęp admin" },
              { icon: Server, title: "Odporność", desc: "backup 3-2-1, immutable, testy" },
            ].map((x) => (
              <Card key={x.title} className={UI.card}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className={cn(UI.chip, "h-10 w-10")}>
                    <x.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{x.title}</div>
                    <div className={cn("text-sm", UI.subtleText)}>{x.desc}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="jak-pracuje" className={cn(UI.container, "py-14")}>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-2">
            <div className={cn("text-sm font-medium", UI.subtleText)}>Proces</div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bezpieczeństwo jako proces</h2>
            <p className={cn("text-sm md:text-base", UI.subtleText)}>
              Najpierw redukujemy największe ryzyka. Potem budujemy nawyk: przeglądy, KPI, testy odtworzeń, ćwiczenia.
            </p>

            <div className="mt-6 space-y-3">
              {steps.map((s) => (
                <Card key={s.title} className={UI.card}>
                  <CardContent className="flex gap-3 p-4">
                    <div className={cn(UI.chip, "h-10 w-10 shrink-0")}>
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{s.title}</div>
                      <div className={cn("text-sm", UI.subtleText)}>{s.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className={UI.card}>
            <CardHeader className={cn("border-b", UI.mutedBorder)}>
              <CardTitle className="text-base">Co dostajesz po współpracy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {[
                  { icon: CheckCircle2, title: "Plan na 90 dni", desc: "priorytety i właściciele zadań" },
                  { icon: Shield, title: "Baseline konfiguracji", desc: "MFA/CA/poczta/endpointy" },
                  { icon: Radar, title: "Widoczność", desc: "logi, alerty i podstawowe KPI" },
                  { icon: GraduationCap, title: "Nawyki", desc: "szkolenia i ćwiczenia dla zespołu" },
                ].map((x) => (
                  <div key={x.title} className={cn(UI.panel, "flex items-start gap-3 p-4")}>
                    <div className={cn(UI.chip, "h-9 w-9")}>
                      <x.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{x.title}</div>
                      <div className={cn("text-sm", UI.subtleText)}>{x.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cn(UI.panel, "mt-6 p-4")}>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Zasada: mierzalne efekty
                </div>
                <p className={cn("mt-2 text-sm", UI.subtleText)}>
                  Każdy etap kończy się listą zmian i wskaźników. Wiesz co zostało zrobione i co dalej.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={cn("border-y", UI.mutedBorder, "bg-zinc-900/25")}>
        <div className={cn(UI.container, "py-14")}>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="space-y-2">
              <div className={cn("text-sm font-medium", UI.subtleText)}>FAQ</div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Najczęstsze pytania</h2>
              <p className={cn("text-sm md:text-base", UI.subtleText)}>
                Jeśli chcesz, dopasuję ofertę do branży (np. biuro rachunkowe, software house, produkcja).
              </p>
            </div>

            <Card className={UI.card}>
              <CardHeader className={cn("border-b", UI.mutedBorder)}>
                <CardTitle className="text-base">Pytania i odpowiedzi</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, idx) => (
                    <AccordionItem key={f.q} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className={cn("text-sm", UI.subtleText)}>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className={cn("border-t", UI.mutedBorder)}>
        <div className={cn(UI.container, "py-14")}>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-2">
              <div className={cn("text-sm font-medium", UI.subtleText)}>Kontakt</div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Umów krótką rozmowę</h2>
              <p className={cn("text-sm md:text-base", UI.subtleText)}>
                Opisz w 2–3 zdaniach środowisko (liczba osób, M365/Google, czy jest firewall, backup) — wrócę z propozycją
                zakresu i kolejnych kroków.
              </p>

              <div className="mt-6 grid gap-3">
                <Card className={UI.card}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={cn(UI.chip, "h-10 w-10")}>
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Telefon</div>
                      <div className={cn("text-sm", UI.subtleText)}>+48 000 000 000</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={UI.card}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={cn(UI.chip, "h-10 w-10")}>
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Email</div>
                      <div className={cn("text-sm", UI.subtleText)}>kontakt@solosec.pl</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={UI.card}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={cn(UI.chip, "h-10 w-10")}>
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Lokalizacja</div>
                      <div className={cn("text-sm", UI.subtleText)}>Polska / zdalnie</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={cn(UI.panel, "mt-6 p-5")}>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Najszybszy start
                </div>
                <p className={cn("mt-2 text-sm", UI.subtleText)}>
                  Jeśli nie wiesz od czego zacząć — wybierz QuickScan. Po nim masz plan napraw i spokojną kolejkę wdrożeń.
                </p>
              </div>
            </div>

            <Card className={UI.card}>
              <CardHeader className={cn("border-b", UI.mutedBorder)}>
                <CardTitle className="text-base">Formularz</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Imię i nazwisko
                      </label>
                      <Input
                        id="name"
                        className={UI.input}
                        placeholder="Jan Kowalski"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange("name")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        className={UI.input}
                        placeholder="jan@firma.pl"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Firma
                    </label>
                    <Input
                      id="company"
                      className={UI.input}
                      placeholder="Nazwa firmy (opcjonalnie)"
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleChange("company")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="msg" className="text-sm font-medium">
                      W czym pomóc?
                    </label>
                    <Textarea
                      id="msg"
                      className={UI.textarea}
                      placeholder="Np. mamy M365, 60 osób, ostatnio phishing; chcemy MFA, poprawić pocztę i backup."
                      value={form.msg}
                      onChange={handleChange("msg")}
                      required
                    />
                  </div>

                  {formError ? (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                      {formError}
                    </div>
                  ) : null}

                  {formSuccess ? (
                    <div className="rounded-2xl border border-lime-500/30 bg-lime-500/10 p-3 text-sm text-lime-300">
                      {formSuccess}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className={cn("text-xs", UI.subtleText)}>
                      Wysyłając formularz, zgadzasz się na kontakt w sprawie oferty.
                    </div>
                    <Button type="submit" variant="outline" className={UI.button}>
                      Wyślij <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn("border-t", UI.mutedBorder)}>
        <div className={cn(UI.container, "py-10")}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-50 text-zinc-950">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold">SoloSec</div>
                  <div className={cn("text-xs", UI.subtleText)}>Cyberbezpieczeństwo dla MŚP</div>
                </div>
              </div>
              <p className={cn("text-sm", UI.subtleText)}>
                Produktowe podejście: szybka diagnoza → konkretne wdrożenia → utrzymanie. Bez lania wody.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Skróty</div>
              <div className="grid gap-1 text-sm">
                <a className={cn(UI.subtleText, "hover:text-lime-300")} href="#uslugi">
                  Usługi
                </a>
                <a className={cn(UI.subtleText, "hover:text-lime-300")} href="#pakiety">
                  Pakiety
                </a>
                <a className={cn(UI.subtleText, "hover:text-lime-300")} href="#jak-pracuje">
                  Jak pracuję
                </a>
                <a className={cn(UI.subtleText, "hover:text-lime-300")} href="#faq">
                  FAQ
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Obszary</div>
              <div className="flex flex-wrap gap-2">
                {["M365/Entra", "Poczta", "Endpointy", "Backup", "Segmentacja", "Awareness"].map((x) => (
                  <span key={x} className={UI.pill}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "mt-8 flex flex-col gap-2 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between",
              UI.mutedBorder,
              UI.subtleText
            )}
          >
            <div>© {new Date().getFullYear()} SoloSec. Wszelkie prawa zastrzeżone.</div>
            <div className="flex gap-4">
              <a className="hover:text-lime-300" href="#">
                Polityka prywatności
              </a>
              <a className="hover:text-lime-300" href="#">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
