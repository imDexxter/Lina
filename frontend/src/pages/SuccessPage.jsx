import { motion } from "framer-motion";
import { offer } from "../lib/config";

export default function SuccessPage() {
  return (
    <div
      data-testid="success-page"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-surface"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M4 12.5l5 5L20 6.5"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 font-display text-3xl font-bold tracking-tight"
      >
        bienvenue 🖤
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mt-2 text-sm text-dim"
      >
        ton accès est débloqué
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-10 w-full max-w-[340px]"
      >
        <a
          data-testid="success-telegram-button"
          href={offer.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full bg-white py-4 font-display text-sm font-bold uppercase tracking-wide text-ink transition-transform duration-200 active:scale-[0.98]"
        >
          ouvrir mon espace privé
        </a>
        <a
          data-testid="success-home-link"
          href="/"
          className="mt-4 inline-block text-xs text-white/45 transition-colors hover:text-white/80"
        >
          retour à l'accueil
        </a>
      </motion.div>
    </div>
  );
}
