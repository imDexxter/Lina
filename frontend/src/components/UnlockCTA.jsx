import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeUp } from "./Reveal";

export const UnlockCTA = () => {
  const navigate = useNavigate();
  return (
    <section data-testid="unlock-cta-section" className="mx-auto w-full max-w-[520px] px-5 pb-24 pt-10 text-center">
      <FadeUp>
        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight">
          tu veux voir
          <br />
          la suite ?
        </h2>
        <p className="mt-4 text-sm text-dim">débloque mon espace privé</p>
        <p data-testid="unlock-cta-highlight" className="mt-3 inline-block rounded-full border border-blush/40 bg-blush/10 px-4 py-1.5 text-xs font-semibold text-blush">
          snap privé + appel de 20 min inclus
        </p>
      </FadeUp>
      <FadeUp delay={0.12}>
        <motion.button
          data-testid="unlock-cta-button"
          onClick={() => navigate("/access")}
          whileTap={{ scale: 0.97 }}
          className="btn-cta mt-8"
        >
          Débloquer maintenant
        </motion.button>
      </FadeUp>
    </section>
  );
};
