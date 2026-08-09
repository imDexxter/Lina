import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { LinaHero } from "../components/LinaHero";
import { ProfileIntro } from "../components/ProfileIntro";
import { Marquee } from "../components/Marquee";
import { ContentGrid } from "../components/ContentGrid";
import { LockedContentSheet } from "../components/LockedContentSheet";
import { VideoPreviewSheet } from "../components/VideoPreviewSheet";
import { ValueStack } from "../components/ValueStack";
import { UnlockCTA } from "../components/UnlockCTA";
import { StickyUnlockBar } from "../components/StickyUnlockBar";
import { Footer } from "../components/Footer";

export default function HomePage() {
  const [locked, setLocked] = useState(null);
  const [video, setVideo] = useState(null);
  const modalOpen = Boolean(locked || video);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div data-testid="home-page" className="bg-ink">
      <Header />
      <LinaHero />
      <ProfileIntro />
      <Marquee />
      <ContentGrid onOpenLocked={setLocked} onOpenVideo={setVideo} />
      <ValueStack />
      <UnlockCTA />
      <Footer />
      <LockedContentSheet item={locked} onClose={() => setLocked(null)} />
      <VideoPreviewSheet item={video} onClose={() => setVideo(null)} />
      <StickyUnlockBar hidden={modalOpen} />
    </div>
  );
}
