import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VideoPreviewSheet = ({ item, onClose }) => {
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!item) return undefined;
    setDone(false);
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            data-testid="video-preview-sheet"
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] overflow-hidden rounded-t-[22px] border-t border-line bg-surface"
          >
            <div className="relative h-[46svh] w-full overflow-hidden">
              <motion.img
                src={item.src}
                alt="Aperçu vidéo de Lina"
                initial={{ scale: 1, x: 0, y: 0 }}
                animate={{ scale: 1.16, x: -12, y: 10 }}
                transition={{ duration: 2.6, ease: "linear" }}
                className="h-full w-full object-cover"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30" />
              <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                aperçu vidéo
              </span>
              <button
                data-testid="video-preview-close"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md"
              >
                <X className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 backdrop-blur-[6px]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blush/40 bg-black/45 shadow-[0_0_26px_rgba(255,92,141,.35)]">
                      <Lock className="h-4 w-4 text-blush" strokeWidth={2} />
                    </div>
                    <p className="text-xs text-white/80">aperçu terminé — contenu verrouillé</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-5 text-center">
              <h3 className="font-display text-lg font-semibold">La suite est privée</h3>
              <p className="mt-1.5 text-sm text-dim">Les vidéos complètes sont réservées aux membres.</p>
              <button
                data-testid="video-sheet-unlock-button"
                onClick={() => navigate("/access")}
                className="btn-cta mt-5 !py-3.5"
              >
                Débloquer tout
              </button>
              <button
                data-testid="video-sheet-dismiss-button"
                onClick={onClose}
                className="mt-3 w-full py-2.5 text-sm text-white/55 transition-colors hover:text-white/80"
              >
                Pas maintenant
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
