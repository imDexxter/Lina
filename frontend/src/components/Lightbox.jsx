import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export const Lightbox = ({ item, onClose }) => (
  <AnimatePresence>
    {item && (
      <motion.div
        data-testid="photo-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      >
        <motion.img
          src={item.src}
          alt="Photo de Lina en plein écran"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[86svh] w-auto max-w-full rounded-2xl object-contain"
          draggable="false"
        />
        <button
          data-testid="lightbox-close-button"
          onClick={onClose}
          aria-label="Fermer la photo"
          className="absolute right-4 top-[max(env(safe-area-inset-top),1rem)] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
