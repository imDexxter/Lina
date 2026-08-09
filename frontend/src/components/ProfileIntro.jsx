import { Images, Clapperboard, KeyRound } from "lucide-react";
import { FadeUp } from "./Reveal";

const STATS = [
  { icon: Images, label: "Photos privées" },
  { icon: Clapperboard, label: "Vidéos / previews" },
  { icon: KeyRound, label: "Accès privé" },
];

export const ProfileIntro = () => (
  <section data-testid="profile-intro" className="mx-auto w-full max-w-[520px] px-5 pb-16 pt-14">
    <FadeUp>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">01 — profil</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">un peu plus de moi</h2>
      <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-dim">
        J'ai créé cet espace pour partager les photos, les coulisses et les contenus que je garde
        normalement pour moi. Ici, c'est plus personnel, sans filtre d'algorithme.
      </p>
    </FadeUp>
    <div className="mt-8 grid grid-cols-3 gap-2.5">
      {STATS.map((s, i) => (
        <FadeUp key={s.label} delay={i * 0.08}>
          <div
            data-testid={`profile-stat-${i}`}
            className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-4"
          >
            <s.icon className="h-4 w-4 text-white/70" strokeWidth={1.75} />
            <span className="text-[11px] font-medium leading-tight text-white/75">{s.label}</span>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);
