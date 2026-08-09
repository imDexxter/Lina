import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Play, Flame } from "lucide-react";
import { SmartImage } from "./SmartImage";

export const ContentCard = ({ item, index, onOpen }) => {
  const [shake, setShake] = useState(false);
  const [armed, setArmed] = useState(false);
  const isLocked = item.type === "locked";
  const isHard = item.type === "hard";
  const isVideo = item.type === "video";
  const isFade = item.type === "fade";
  const isPhoto = item.type === "photo" || isFade;
  const gated = isLocked || isHard || (isPhoto && armed);

  const handleClick = () => {
    if (isPhoto && !armed) {
      setArmed(true);
      return;
    }
    if (isLocked || isHard) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
    onOpen(item);
  };

  const imgCls = isHard
    ? "scale-125 brightness-[.5] blur-2xl transition-[filter,transform] duration-500"
    : isLocked || armed
      ? "scale-110 brightness-[.78] blur-[11px] transition-[filter,transform] duration-500"
      : "transition-transform duration-500 group-hover:scale-[1.02]";

  return (
    <motion.button
      data-testid={`content-card-${item.id}`}
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      aria-label={gated || isVideo ? "Contenu privé" : "Voir la photo"}
      className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[18px] border border-line bg-surface text-left ${
        isFade ? "[column-span:all]" : ""
      }`}
    >
      <div style={{ aspectRatio: item.ratio }} className="w-full">
        <SmartImage
          src={item.src}
          alt={gated ? "Contenu privé de Lina" : "Photo de Lina"}
          className="h-full w-full"
          imgClassName={imgCls}
        />
      </div>

      {isFade && !armed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink"
        />
      )}

      {item.tag && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-blush/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_16px_rgba(255,92,141,.45)]">
          {item.tag}
        </span>
      )}

      {item.duration && (
        <span
          data-testid={`video-duration-${item.id}`}
          className="absolute bottom-2.5 right-2.5 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white backdrop-blur-sm"
        >
          {item.duration}
        </span>
      )}

      {item.caption && !armed && (
        <span
          data-testid={`content-caption-${item.id}`}
          className={`absolute inset-x-2.5 bottom-2.5 rounded-xl bg-black/45 px-2.5 py-1.5 text-[11px] leading-snug text-white/95 backdrop-blur-md ${
            item.duration ? "pr-12" : ""
          }`}
        >
          {item.caption}
        </span>
      )}

      {(isLocked || isHard) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20">
          <motion.div
            animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.42 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blush/50 bg-black/45 shadow-[0_0_26px_rgba(255,92,141,.35)] backdrop-blur-md"
          >
            {isHard ? (
              <Flame className="h-4 w-4 fill-blush text-blush" />
            ) : (
              <Lock className="h-4 w-4 text-blush" strokeWidth={2} />
            )}
          </motion.div>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${
              isHard
                ? "bg-blush text-white shadow-[0_4px_20px_rgba(255,92,141,.55)]"
                : "bg-blush/90 text-white"
            }`}
          >
            {isHard ? "hard" : "privé"}
          </span>
        </div>
      )}

      {armed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blush/50 bg-black/45 shadow-[0_0_26px_rgba(255,92,141,.35)] backdrop-blur-md">
            <Lock className="h-4 w-4 text-blush" strokeWidth={2} />
          </div>
          <span className="rounded-full bg-gradient-to-r from-blush to-blush-soft px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_8px_28px_rgba(255,92,141,.5)]">
            Débloquer pour voir
          </span>
        </motion.div>
      )}

      {isVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 shadow-[0_0_30px_rgba(255,92,141,.3)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </div>
          <span className="rounded-full bg-blush/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            aperçu vidéo
          </span>
        </div>
      )}
    </motion.button>
  );
};
