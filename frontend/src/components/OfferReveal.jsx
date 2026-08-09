import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Images, Sparkles, Ghost, Send, Phone, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { offer, formatPrice, ASSETS, loadProfile, REFERENCE_PRICE, RECURRING_PRICE, RECURRING_INTERVAL } from "../lib/config";

export const OfferReveal = () => {
  const navigate = useNavigate();
  const profile = loadProfile();
  const [price, setPrice] = useState("1");

  useEffect(() => {
    const controls = animate(1, offer.introPrice, {
      duration: 1.15,
      delay: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPrice(formatPrice(v)),
    });
    return () => controls.stop();
  }, []);

  const benefits = [
    { icon: Images, label: "Photos privées" },
    { icon: Sparkles, label: "Contenu exclusif" },
    { icon: Ghost, label: "Snap privé" },
    { icon: Send, label: "Accès Telegram" },
    ...(offer.includesCall ? [{ icon: Phone, label: "Appel privé de 20 min offert" }] : []),
  ];

  return (
    <motion.div
      data-testid="offer-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col px-6 pt-8"
    >
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={ASSETS.avatar}
          alt="Lina"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 16, stiffness: 200 }}
          className="h-16 w-16 rounded-full border border-white/15 object-cover object-top"
          draggable="false"
        />
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 font-display text-2xl font-bold tracking-tight"
        >
          ton accès est prêt{profile?.username ? `, ${profile.username}` : ""}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.35, type: "spring", damping: 18 }}
          data-testid="offer-highlight-pill"
          className="mt-4 flex items-center gap-2 rounded-full border border-blush/40 bg-blush/10 px-4 py-2"
        >
          <Phone className="h-3.5 w-3.5 text-blush" strokeWidth={2} />
          <span className="text-xs font-semibold text-blush">
            Mon snap privé + un appel de 20 min avec moi — inclus
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="glow-blush mt-6 w-full rounded-[22px] border border-blush/25 bg-surface px-6 py-5"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Accès découverte
          </p>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            {REFERENCE_PRICE && (
              <span className="text-lg text-white/35 line-through">{formatPrice(REFERENCE_PRICE)}</span>
            )}
            <span data-testid="offer-price" className="font-display text-4xl font-bold tracking-tight text-blush">
              {price}
            </span>
          </div>
          {RECURRING_PRICE && RECURRING_INTERVAL && (
            <p className="mt-3 text-xs leading-relaxed text-white/60">
              Aujourd'hui : {formatPrice(offer.introPrice)} — puis {formatPrice(RECURRING_PRICE)}/
              {RECURRING_INTERVAL}. Annulation selon les conditions de l'offre.
            </p>
          )}
          <p className="mt-2.5 text-xs text-white/45">accès immédiat après paiement</p>
        </motion.div>

        <ul className="mt-4 w-full space-y-2 text-left">
          {benefits.map((b, i) => (
            <motion.li
              key={b.label}
              data-testid={`offer-benefit-${i}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
            >
              <b.icon className="h-4 w-4 shrink-0 text-blush" strokeWidth={1.75} />
              <span className="flex-1 text-sm text-white/85">{b.label}</span>
              <Check className="h-3.5 w-3.5 text-blush/70" />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-5">
        <motion.button
          data-testid="offer-access-button"
          onClick={() => navigate("/checkout")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileTap={{ scale: 0.97 }}
          className="btn-cta"
        >
          Accéder au contenu — {formatPrice(offer.introPrice)}
        </motion.button>
      </div>
    </motion.div>
  );
};
;
