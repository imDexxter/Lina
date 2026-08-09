export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-line">
    <div className="mx-auto w-full max-w-[520px] px-5 py-10">
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-bold tracking-tight">lina<span className="text-blush">.</span></span>
        <nav className="flex items-center gap-5 text-xs text-white/45">
          <a href="#" data-testid="footer-terms-link" className="transition-colors hover:text-white/80">
            Conditions
          </a>
          <a href="#" data-testid="footer-privacy-link" className="transition-colors hover:text-white/80">
            Confidentialité
          </a>
          <a href="#" data-testid="footer-support-link" className="transition-colors hover:text-white/80">
            Support
          </a>
        </nav>
      </div>
      <p className="mt-6 text-[10px] leading-relaxed text-white/30">
        Espace de contenu privé de créatrice. Mention relative à la nature du creator/persona à adapter
        avant mise en production.
      </p>
    </div>
  </footer>
);
