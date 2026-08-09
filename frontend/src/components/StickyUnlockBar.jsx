import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { offer, formatPrice } from "../lib/config";

export const StickyUnlockBar = ({ hidden }) => {
  const [past, setPast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = past && !hidden;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="sticky-unlock-bar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[rgba(15,15,15,.92)] backdrop-blur-xl"
        >
          <div className="mx-auto w-full max-w-[520px] px-5 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3">
            <motion.button
              data-testid="sticky-unlock-button"
              onClick={() => navigate("/access")}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="btn-cta !py-3.5"
            >
              Débloquer • {formatPrice(offer.introPrice)}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
