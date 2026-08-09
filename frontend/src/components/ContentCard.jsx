import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Play } from "lucide-react";
import { SmartImage } from "./SmartImage";

export const ContentCard = ({ item, index, onOpen }) => {
  const [shake, setShake] = useState(false);
  const locked = item.type !== "photo";

  const handleClick = () => {
    if (locked) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
    onOpen(item);
  };

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
      aria-label={locked ? "Contenu privé verrouillé" : "Voir la photo"}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[18px] border border-line bg-surface text-left"
    >
      <div style={{ aspectRatio: item.ratio }} className="w-full">
        <SmartImage
          src={item.src}
          alt={locked ? "Contenu privé de Lina" : "Photo de Lina"}
          className="h-full w-full"
          imgClassName={
            locked
              ? "scale-125 brightness-[.62] blur-xl transition-[filter,transform] duration-500 group-hover:blur-lg group-hover:brightness-[.72]"
              : "transition-transform duration-500 group-hover:scale-[1.02]"
          }
        />
      </div>

      {item.tag && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-blush/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_16px_rgba(255,92,141,.45)]">
          {item.tag}
        </span>
      )}

      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25">
          <motion.div
            animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.42 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blush/50 bg-black/45 shadow-[0_0_26px_rgba(255,92,141,.35)] backdrop-blur-md"
          >
            {item.type === "video" ? (
              <Play className="ml-0.5 h-4 w-4 fill-blush text-blush" />
            ) : (
              <Lock className="h-4 w-4 text-blush" strokeWidth={2} />
            )}
          </motion.div>
          <span className="rounded-full bg-blush/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {item.type === "video" ? "aperçu vidéo" : "privé"}
          </span>
        </div>
      )}
    </motion.button>
  );
};
