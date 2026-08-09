import { Images, Sparkles, Ghost, Send, Phone } from "lucide-react";
import { offer } from "../lib/config";
import { FadeUp } from "./Reveal";

const ITEMS = [
  { n: "01", icon: Images, title: "Photos privées", text: "Celles que je ne poste nulle part." },
  { n: "02", icon: Sparkles, title: "Contenu exclusif", text: "Coulisses et nouveautés en avant-première." },
  { n: "03", icon: Ghost, title: "Snap privé", text: "Un accès direct à mon quotidien." },
  { n: "04", icon: Send, title: "Accès Telegram", text: "Mon canal privé, réservé aux membres." },
];

export const ValueStack = () => (
  <section data-testid="value-stack" className="mx-auto w-full max-w-[520px] px-5 py-16">
    <FadeUp>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">03 — ton accès</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">Avec ton accès</h2>
    </FadeUp>
    <div className="mt-8 grid grid-cols-2 gap-2.5">
      {ITEMS.map((it, i) => (
        <FadeUp key={it.n} delay={i * 0.07}>
          <div
            data-testid={`value-card-${it.n}`}
            className="flex h-full flex-col gap-6 rounded-[18px] border border-line bg-surface p-4 transition-colors duration-300 hover:border-white/15"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] font-semibold text-white/30">{it.n}</span>
              <it.icon className="h-4 w-4 text-white/60" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{it.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-dim">{it.text}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
    {offer.includesCall && (
      <FadeUp delay={0.15}>
        <div
          data-testid="value-card-call"
          className="mt-2.5 flex items-center gap-4 rounded-[18px] border border-white/15 bg-gradient-to-r from-surface-2 to-surface p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink">
            <Phone className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">Appel privé offert</h3>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80">
                inclus
              </span>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-dim">
              Un moment en direct avec moi, disponibilité selon conditions indiquées lors de la réservation.
            </p>
          </div>
        </div>
      </FadeUp>
    )}
  </section>
);
