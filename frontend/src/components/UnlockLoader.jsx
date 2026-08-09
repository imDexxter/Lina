import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { ASSETS } from "../lib/config";

const MESSAGES = ["création de ton accès…", "préparation du contenu privé…", "presque terminé…"];
const R = 52;
const C = 2 * Math.PI * R;

export const UnlockLoader = ({ onDone }) => {
  const [i, setI] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const msg = setInterval(() => setI((v) => Math.min(v + 1, MESSAGES.length - 1)), 880);
    const counter = animate(0, 100, {
      duration: 2.55,
      ease: "easeInOut",
      onUpdate: (v) => setPct(Math.round(v)),
    });
    const end = setTimeout(onDone, 2750);
    return () => {
      clearInterval(msg);
      counter.stop();
      clearTimeout(end);
    };
  }, [onDone]);

  return (
    <motion.div
      data-testid="unlock-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-1 flex-col items-center justify-center px-6"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-blush/15 blur-2xl" aria-hidden="true" />
        <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90 relative">
          <circle cx="66" cy="66" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
          <motion.circle
            cx="66"
            cy="66"
            r={R}
            fill="none"
            stroke="#FF5C8D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.55, ease: "easeInOut" }}
          />
        </svg>
        <motion.img
          src={ASSETS.avatar}
          alt="Lina"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="absolute h-[88px] w-[88px] rounded-full object-cover object-top"
          draggable="false"
        />
      </div>
      <div className="mt-8 h-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            data-testid="unlock-loader-message"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white/70"
          >
            {MESSAGES[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p data-testid="unlock-loader-percent" className="mt-3 font-display text-xs font-semibold tabular-nums text-blush">
        {pct}%
      </p>
    </motion.div>
  );
};
