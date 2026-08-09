import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../lib/config";
import { RevealLine } from "./Reveal";

export const LinaHero = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={ASSETS.hero}
          alt="Lina"
          className="h-full w-full object-cover object-[center_20%]"
          draggable="false"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-ink" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
        <div className="mx-auto w-full max-w-[520px] px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex items-center gap-3"
          >
            <img
              src={ASSETS.avatar}
              alt="Avatar de Lina"
              className="h-12 w-12 rounded-full border border-white/20 object-cover object-top"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-semibold">Lina</span>
                <BadgeCheck className="h-4 w-4 fill-blush text-ink" aria-label="créatrice vérifiée" />
              </div>
              <span className="text-xs text-dim">@lina</span>
            </div>
          </motion.div>

          <h1 className="font-display text-[44px] font-bold leading-[0.98] tracking-tight">
            <RevealLine delay={0.25}>contenu</RevealLine>
            <RevealLine delay={0.35}>privé</RevealLine>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-3 text-sm text-dim"
          >
            Ce que je ne poste nulle part ailleurs.
          </motion.p>

          <motion.button
            data-testid="hero-unlock-button"
            onClick={() => navigate("/access")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            className="btn-cta mt-6"
          >
            Débloquer mon contenu
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/45"
          >
            Accès privé <span aria-hidden="true">•</span> quelques secondes <span aria-hidden="true">•</span>{" "}
            <span className="text-blush/80">snap + appel 20 min inclus</span>
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="absolute left-1/2 top-[86svh] hidden -translate-x-1/2 text-white/40"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
};
