import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { offer } from "../lib/config";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function SuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState(sessionId ? "verifying" : "no-session");

  useEffect(() => {
    if (!sessionId) return undefined;
    let tries = 0;
    const poll = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/payments/status/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.payment_status === "paid") {
            setState("paid");
            return;
          }
        }
      } catch {
        // retry
      }
      tries += 1;
      if (tries < 20) timer = setTimeout(poll, 2000);
      else setState("pending");
    };
    let timer = setTimeout(poll, 1200);
    return () => clearTimeout(timer);
  }, [sessionId]);

  const checking = state === "verifying";

  return (
    <div
      data-testid="success-page"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center"
    >
      {checking ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
          <p data-testid="success-verifying" className="mt-6 text-sm text-dim">
            vérification du paiement…
          </p>
        </motion.div>
      ) : state === "paid" || state === "no-session" ? (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.1 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blush/40 bg-surface shadow-[0_0_50px_rgba(255,92,141,.35)]"
          >
            {[...Array(6)].map((_, k) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.cos((k / 6) * Math.PI * 2) * 64,
                  y: Math.sin((k / 6) * Math.PI * 2) * 64,
                  scale: [0, 1, 0.6],
                }}
                transition={{ duration: 1.1, delay: 0.55, ease: "easeOut" }}
                className="absolute"
              >
                <Heart className="h-3.5 w-3.5 fill-blush text-blush" />
              </motion.span>
            ))}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M4 12.5l5 5L20 6.5"
                stroke="#FF5C8D"
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
              className="btn-cta block"
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
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <p data-testid="success-pending" className="font-display text-xl font-semibold">
            paiement en cours de confirmation
          </p>
          <p className="mt-2 max-w-[32ch] text-sm text-dim">
            Cela peut prendre quelques instants. Recharge cette page dans un moment.
          </p>
          <a
            data-testid="success-retry-link"
            href={`/success?session_id=${sessionId}`}
            className="mt-8 rounded-full border border-line px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/5"
          >
            revérifier
          </a>
        </motion.div>
      )}
    </div>
  );
}
