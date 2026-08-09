import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { offer, formatPrice, ASSETS, loadProfile } from "../lib/config";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const profile = loadProfile();

  const startCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/payments/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lookup_key: "lina_acces_decouverte",
          quantity: 1,
          origin_url: window.location.origin,
          username: profile?.username || null,
          email: profile?.email || null,
        }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const data = await res.json();
      window.location.href = data.checkout_url;
    } catch {
      setError("Impossible d'ouvrir le paiement. Réessaie dans un instant.");
      setLoading(false);
    }
  };

  return (
    <div data-testid="checkout-page" className="flex min-h-[100svh] flex-col bg-ink">
      <div className="mx-auto flex h-14 w-full max-w-[520px] items-center gap-3 px-5">
        <button
          data-testid="checkout-back-button"
          onClick={() => navigate("/access")}
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/80 transition-colors hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-white/80">Paiement</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-[520px] flex-1 flex-col px-6 pt-6"
      >
        <div className="flex items-center gap-3">
          <img
            src={ASSETS.avatar}
            alt="Lina"
            className="h-11 w-11 rounded-full border border-white/15 object-cover object-top"
          />
          <div>
            <p className="font-display text-base font-semibold">Lina</p>
            <p className="text-xs text-dim">Accès privé</p>
          </div>
        </div>

        <div data-testid="checkout-summary" className="mt-8 rounded-[22px] border border-line bg-surface p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Résumé de l'offre
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/85">Accès découverte</span>
              <span className="tabular-nums text-white/85">{formatPrice(offer.introPrice)}</span>
            </div>
            {profile?.username && (
              <div className="flex items-center justify-between text-white/45">
                <span>Membre</span>
                <span>{profile.username}</span>
              </div>
            )}
            <div className="border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span data-testid="checkout-total" className="font-display text-lg font-bold tabular-nums">
                  {formatPrice(offer.introPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-white/40">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Paiement sécurisé par Stripe. Accès immédiat après confirmation.
        </p>

        {error && (
          <p data-testid="checkout-error" className="mt-3 text-xs text-red-300/90">
            {error}
          </p>
        )}

        <div className="mt-auto pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-8">
          <button
            data-testid="checkout-pay-button"
            onClick={startCheckout}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-display text-sm font-bold uppercase tracking-wide text-ink transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Continuer vers le paiement
          </button>
        </div>
      </motion.div>
    </div>
  );
}
