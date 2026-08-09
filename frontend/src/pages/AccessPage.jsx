import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AccessForm } from "../components/AccessForm";
import { UnlockLoader } from "../components/UnlockLoader";
import { OfferReveal } from "../components/OfferReveal";

export default function AccessPage() {
  const [step, setStep] = useState("form");
  const navigate = useNavigate();

  return (
    <div data-testid="access-page" className="flex min-h-[100svh] flex-col bg-ink">
      <div className="mx-auto flex h-14 w-full max-w-[520px] items-center justify-between px-5">
        <button
          data-testid="access-back-button"
          onClick={() => (step === "form" ? navigate("/") : setStep("form"))}
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/80 transition-colors hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-white/80">Ton accès</span>
        <span data-testid="access-progress" className="w-9 text-right text-xs tabular-nums text-white/45">
          {step === "offer" ? "2 / 2" : "1 / 2"}
        </span>
      </div>
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col">
        <AnimatePresence mode="wait">
          {step === "form" && <AccessForm key="form" onDone={() => setStep("loading")} />}
          {step === "loading" && <UnlockLoader key="loading" onDone={() => setStep("offer")} />}
          {step === "offer" && <OfferReveal key="offer" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
