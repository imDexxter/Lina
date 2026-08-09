import { useState } from "react";
import { motion } from "framer-motion";
import { saveProfile, loadProfile } from "../lib/config";

export const AccessForm = ({ onDone }) => {
  const existing = loadProfile();
  const [username, setUsername] = useState(existing?.username || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (username.trim().length < 2) next.username = "Choisis un pseudo (2 caractères min.)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Entre un email valide";
    setErrors(next);
    if (Object.keys(next).length) return;
    saveProfile({ username: username.trim(), email: email.trim(), createdAt: new Date().toISOString() });
    onDone();
  };

  const inputCls = (err) =>
    `w-full rounded-2xl border bg-surface px-5 py-4 text-[15px] text-white placeholder:text-white/30 transition-colors duration-200 focus:border-white/30 focus:outline-none ${
      err ? "border-red-400/50" : "border-line"
    }`;

  return (
    <motion.form
      data-testid="access-form"
      onSubmit={submit}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col px-6 pt-10"
    >
      <h1 className="font-display text-3xl font-bold tracking-tight">Comment je t'appelle ?</h1>
      <p className="mt-2 text-sm text-dim">Deux secondes, et c'est à toi.</p>

      <div className="mt-10 space-y-4">
        <div>
          <label htmlFor="pseudo" className="mb-2 block text-xs font-medium text-white/60">
            Pseudo
          </label>
          <input
            id="pseudo"
            data-testid="access-username-input"
            type="text"
            autoComplete="nickname"
            placeholder="ton pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputCls(errors.username)}
          />
          {errors.username && (
            <p data-testid="access-username-error" className="mt-2 text-xs text-red-300/90">
              {errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/60">
            Email
          </label>
          <input
            id="email"
            data-testid="access-email-input"
            type="email"
            autoComplete="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls(errors.email)}
          />
          {errors.email ? (
            <p data-testid="access-email-error" className="mt-2 text-xs text-red-300/90">
              {errors.email}
            </p>
          ) : (
            <p className="mt-2 text-xs text-white/40">Pour retrouver ton accès.</p>
          )}
        </div>
      </div>

      <div className="mt-auto pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-8">
        <button
          data-testid="access-continue-button"
          type="submit"
          className="w-full rounded-full bg-white py-4 font-display text-sm font-bold uppercase tracking-wide text-ink transition-transform duration-200 active:scale-[0.98]"
        >
          Continuer
        </button>
      </div>
    </motion.form>
  );
};
