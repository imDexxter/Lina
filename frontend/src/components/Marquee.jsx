const ITEMS = ["contenu privé", "coulisses", "accès membre", "photos exclusives", "sans filtre"];

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    aria-hidden="true"
    className="overflow-hidden border-y border-line py-4"
  >
    <div className="animate-marquee-x flex w-max items-center">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {ITEMS.map((t) => (
            <span
              key={`${dup}-${t}`}
              className="flex items-center whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.25em] text-white/30"
            >
              <span className="px-6">{t}</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
