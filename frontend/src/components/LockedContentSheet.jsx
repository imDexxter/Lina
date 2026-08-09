import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LockedContentSheet = ({ item, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            data-testid="locked-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            data-testid="locked-content-sheet"
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 90 && onClose()}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] overflow-hidden rounded-t-[22px] border-t border-line bg-surface"
          >
            <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-white/20" />
            <div className="relative mt-3 h-44 w-full overflow-hidden">
              <img
                src={item.src}
                alt=""
                className="h-full w-full scale-125 object-cover blur-2xl brightness-[.55]"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            <div className="px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-1 text-center">
              <div className="mx-auto -mt-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-surface-2 relative">
                <Lock className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-semibold">Contenu privé</h3>
              <p className="mt-1.5 text-sm text-dim">Cette publication est réservée aux membres.</p>
              <button
                data-testid="sheet-unlock-all-button"
                onClick={() => navigate("/access")}
                className="mt-6 w-full rounded-full bg-white py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-transform duration-200 active:scale-[0.98]"
              >
                Débloquer tout
              </button>
              <button
                data-testid="sheet-dismiss-button"
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
