import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const timeAgo = (iso) => {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  return `il y a ${Math.floor(s / 86400)} j`;
};

// Fil en direct basé UNIQUEMENT sur les vraies transactions payées en base.
// Si aucune vente réelle n'existe, le composant ne s'affiche pas.
export const LiveUnlocks = () => {
  const [data, setData] = useState({ recent: [], total: 0 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/payments/recent`);
        if (res.ok && alive) setData(await res.json());
      } catch {
        // silencieux : pas de ventes = pas de fil
      }
    };
    load();
    const poll = setInterval(load, 15000);
    return () => {
      alive = false;
      clearInterval(poll);
    };
  }, []);

  useEffect(() => {
    if (data.recent.length < 2) return undefined;
    const t = setInterval(() => setIdx((v) => (v + 1) % data.recent.length), 3800);
    return () => clearInterval(t);
  }, [data.recent.length]);

  if (!data.total) return null;
  const current = data.recent[idx];

  return (
    <div data-testid="live-unlocks" className="mt-4 flex flex-col items-center gap-1.5">
      <AnimatePresence mode="wait">
        {current && (
          <motion.p
            key={`${current.name}-${current.at}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-1.5 text-[11px] text-white/55"
          >
            <BadgeCheck className="h-3.5 w-3.5 fill-blush text-ink" />
            <span>
              <span className="font-semibold text-white/85">@{current.name}</span> a débloqué son accès
              · {timeAgo(current.at)}
            </span>
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-[10px] text-white/35">
        {data.total} accès débloqué{data.total > 1 ? "s" : ""}
      </p>
    </div>
  );
};
