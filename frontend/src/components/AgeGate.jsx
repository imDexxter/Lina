import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { ASSETS } from "../lib/config";

const KEY = "lina_age_ok";

export const AgeGate = () => {
  const [ok, setOk] = useState(() => localStorage.getItem(KEY) === "1");

  const accept = () => {
    localStorage.setItem(KEY, "1");
    setOk(true);
  };

  return (
    <AnimatePresence>
      {!ok && (
        <motion.div
          data-testid="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={ASSETS.hero}
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-125 object-cover object-[center_20%] opacity-40 blur-2xl"
              draggable="false"
            />
            <div className="absolute inset-0 bg-ink/70" />
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-[340px] flex-col items-center"
            >
              <span className="font-display text-2xl font-bold tracking-tight">
                lina<span className="text-blush">.</span>
              </span>
              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-blush/40 bg-blush/10">
                <ShieldAlert className="h-6 w-6 text-blush" strokeWidth={1.75} />
              </div>
              <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">Contenu adulte</h1>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                Ce site contient des photos et vidéos réservées aux adultes. Tu dois avoir{" "}
                <span className="font-semibold text-white">18 ans ou plus</span> pour entrer.
              </p>
              <button
                data-testid="age-gate-accept"
                onClick={accept}
                className="btn-cta mt-8"
              >
                J'ai 18 ans ou plus
              </button>
              <a
                data-testid="age-gate-leave"
                href="https://www.google.com"
                className="mt-4 text-sm text-white/50 transition-colors hover:text-white/80"
              >
                Quitter
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
