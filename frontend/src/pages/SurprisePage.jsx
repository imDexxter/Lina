import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gift, ImagePlus, RotateCcw } from "lucide-react";
import { offer } from "../lib/config";
import { SURPRISE } from "../constants/testIds";

const MAX_SIZE_MB = 15;
const EASE = [0.22, 1, 0.36, 1];

const LOCKED_LOOK = { filter: "blur(28px) brightness(0.75)", scale: 1.12 };
const REVEALED_LOOK = { filter: "blur(0px) brightness(1)", scale: 1 };

// Local-only preview: the picked file never leaves the browser (object URL).
export default function SurprisePage() {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [ownsRights, setOwnsRights] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState("empty"); // empty | locked | revealed

  useEffect(() => {
    if (!imageUrl) return undefined;
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const pickFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WEBP…).");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`This image is too large (max ${MAX_SIZE_MB} MB).`);
      return;
    }
    setError("");
    setFileName(file.name);
    setImageUrl(URL.createObjectURL(file));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const createSurprise = () => {
    if (!imageUrl) {
      setError("Please choose an image first.");
      return;
    }
    if (!ownsRights) {
      setError("Please confirm you own this image.");
      return;
    }
    setError("");
    setStage("locked");
  };

  const changeImage = () => {
    setImageUrl(null);
    setFileName("");
    setOwnsRights(false);
    setStage("empty");
    if (inputRef.current) inputRef.current.value = "";
  };

  const revealTransition = reduceMotion ? { duration: 0 } : { duration: 1.4, ease: EASE };

  return (
    <main className="min-h-[100svh] bg-ink">
      <div className="mx-auto flex w-full max-w-[520px] flex-col px-5 pb-12 pt-8">
        <a href="/" className="font-display text-lg font-bold tracking-tight">
          lina<span className="text-blush">.</span>
        </a>

        {stage === "empty" ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-8"
          >
            <h1 className="font-display text-2xl font-bold tracking-tight">Create a surprise</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-dim">
              Upload a picture. It will be blurred behind a “Get my surprise” pop-up, then revealed
              with a smooth animation.
            </p>

            <button
              type="button"
              data-testid={SURPRISE.dropzone}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`relative mt-6 flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[22px] border border-dashed transition-colors duration-200 ${
                dragging ? "border-blush bg-blush/10" : "border-white/15 bg-surface hover:border-blush/60"
              }`}
            >
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
                  <span className="absolute inset-x-4 bottom-4 truncate rounded-full bg-black/60 px-4 py-2 text-xs text-white/85 backdrop-blur">
                    {fileName} · tap to change
                  </span>
                </>
              ) : (
                <>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-blush/40 bg-blush/10">
                    <ImagePlus className="h-6 w-6 text-blush" strokeWidth={1.75} />
                  </span>
                  <span className="mt-4 font-display text-base font-semibold">Drop your image here</span>
                  <span className="mt-1 text-xs text-dim">or tap to browse · max {MAX_SIZE_MB} MB</span>
                </>
              )}
            </button>
            <input
              ref={inputRef}
              data-testid={SURPRISE.fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-dim">
              <input
                data-testid={SURPRISE.rightsCheckbox}
                type="checkbox"
                checked={ownsRights}
                onChange={(e) => setOwnsRights(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-blush"
              />
              <span>I own this image and have the right to share it.</span>
            </label>

            {error && (
              <p data-testid={SURPRISE.error} className="mt-3 text-sm text-blush">
                {error}
              </p>
            )}

            <button type="button" onClick={createSurprise} className="btn-cta mt-6">
              Create my surprise
            </button>
          </motion.section>
        ) : (
          <section className="mt-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-line bg-surface">
              <motion.img
                data-testid={SURPRISE.image}
                src={imageUrl}
                alt="Surprise"
                draggable="false"
                initial={LOCKED_LOOK}
                animate={stage === "revealed" ? REVEALED_LOOK : LOCKED_LOOK}
                transition={stage === "revealed" ? { ...revealTransition, delay: reduceMotion ? 0 : 0.2 } : { duration: 0 }}
                className="h-full w-full object-cover"
              />

              <AnimatePresence>
                {stage === "locked" && (
                  <motion.div
                    key="popup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 p-6"
                  >
                    <motion.div
                      data-testid={SURPRISE.popup}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="surprise-title"
                      initial={{ opacity: 0, scale: 0.9, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", damping: 24, stiffness: 260 }}
                      className="w-full max-w-[300px] rounded-[22px] border border-line bg-surface/90 px-6 py-7 text-center backdrop-blur-xl"
                    >
                      <div className="glow-blush mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blush/40 bg-blush/10">
                        <Gift className="h-5 w-5 text-blush" strokeWidth={1.75} />
                      </div>
                      <h2 id="surprise-title" className="mt-4 font-display text-lg font-semibold">
                        Something special for you
                      </h2>
                      <p className="mt-1.5 text-sm text-dim">Tap below to reveal it.</p>
                      <button
                        type="button"
                        data-testid={SURPRISE.revealButton}
                        onClick={() => setStage("revealed")}
                        className="btn-cta mt-6 !py-3.5"
                      >
                        Get my surprise
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {stage === "revealed" && (
                <motion.a
                  key="show-more"
                  data-testid={SURPRISE.showMoreLink}
                  href={offer.surpriseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 1.2, ease: EASE }}
                  className="btn-cta mt-6 flex items-center justify-center gap-2"
                >
                  Show more
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </motion.a>
              )}
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/55">
              {stage === "revealed" && (
                <button
                  type="button"
                  data-testid={SURPRISE.replayButton}
                  onClick={() => setStage("locked")}
                  className="flex items-center gap-1.5 transition-colors hover:text-white/80"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Replay
                </button>
              )}
              <button
                type="button"
                data-testid={SURPRISE.changeButton}
                onClick={changeImage}
                className="transition-colors hover:text-white/80"
              >
                Change image
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
