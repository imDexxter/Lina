import { ASSETS } from "../lib/config";
import { ContentCard } from "./ContentCard";
import { FadeUp } from "./Reveal";

export const GALLERY_ITEMS = [
  { id: 1, src: ASSETS.n2, type: "photo", ratio: "3/4", tag: "nouveau" },
  { id: 2, src: ASSETS.n1, type: "locked", ratio: "3/4" },
  { id: 3, src: ASSETS.lina3, type: "photo", ratio: "3/4" },
  { id: 4, src: ASSETS.n5, type: "locked", ratio: "3/4" },
  { id: 5, src: ASSETS.n3, type: "photo", ratio: "1/1" },
  { id: 6, src: ASSETS.lina1, type: "photo", ratio: "3/4" },
  { id: 7, src: ASSETS.c4, type: "video", ratio: "3/4" },
  { id: 8, src: ASSETS.c2, type: "photo", ratio: "1/1" },
  { id: 9, src: ASSETS.c6, type: "locked", ratio: "3/4" },
  { id: 10, src: ASSETS.lina4, type: "photo", ratio: "3/4" },
  { id: 11, src: ASSETS.c1, type: "photo", ratio: "3/4" },
  { id: 12, src: ASSETS.c5, type: "locked", ratio: "3/4" },
  { id: 13, src: ASSETS.c3, type: "photo", ratio: "3/4" },
  { id: 14, src: ASSETS.lina2, type: "locked", ratio: "3/4" },
];

export const ContentGrid = ({ onOpenPhoto, onOpenLocked, onOpenVideo }) => {
  const visible = GALLERY_ITEMS.filter((i) => i.type === "photo").length;

  const handleOpen = (item) => {
    if (item.type === "photo") onOpenPhoto(item);
    else if (item.type === "video") onOpenVideo(item);
    else onOpenLocked(item);
  };

  return (
    <section data-testid="content-gallery" className="mx-auto w-full max-w-[560px] px-5 py-16">
      <FadeUp className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">02 — galerie</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">le feed privé</h2>
        </div>
        <p data-testid="gallery-counter" className="pb-0.5 text-[11px] text-white/40">
          {GALLERY_ITEMS.length} publications · {visible} visibles
        </p>
      </FadeUp>
      <div className="columns-2 gap-3">
        {GALLERY_ITEMS.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} onOpen={handleOpen} />
        ))}
      </div>
    </section>
  );
};
