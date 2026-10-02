export const offer = {
  introPrice: 1.03,
  referencePrice: null,
  recurringPrice: null,
  recurringInterval: null,
  introDuration: null,
  telegramUrl: process.env.REACT_APP_TELEGRAM_URL || "https://t.me/mariaprvv",
  snapUrl: process.env.REACT_APP_SNAP_URL || "https://www.snapchat.com/add/marina_prvvv",
  includesCall: true,
  surpriseUrl: process.env.REACT_APP_SURPRISE_URL || "https://www.getmyview.com",
};

export const INTRO_PRICE = offer.introPrice;
export const INTRO_DURATION = offer.introDuration;
export const RECURRING_PRICE = offer.recurringPrice;
export const RECURRING_INTERVAL = offer.recurringInterval;
export const REFERENCE_PRICE = offer.referencePrice;

export const formatPrice = (v) => `${v.toFixed(2).replace(".", ",")} €`;

export const ASSETS = {
  hero: "/assets/lina-hero.jpg",
  avatar: "/assets/lina-3.jpg",
  lina1: "/assets/lina-1.jpg",
  lina2: "/assets/lina-2.jpg",
  lina3: "/assets/lina-3.jpg",
  lina4: "/assets/lina-4.jpg",
  lina5: "/assets/lina-5.jpg",
  c1: "/assets/lina-c1.jpg",
  c2: "/assets/lina-c2.jpg",
  c3: "/assets/lina-c3.jpg",
  c4: "/assets/lina-c4.jpg",
  c5: "/assets/lina-c5.jpg",
  c6: "/assets/lina-c6.jpg",
  c7: "/assets/lina-c7.jpg",
  c8: "/assets/lina-c8.jpg",
  c9: "/assets/lina-c9.jpg",
  c10: "/assets/lina-c10.jpg",
  n1: "/assets/lina-n1.jpg",
  n2: "/assets/lina-n2.jpg",
  n3: "/assets/lina-n3.jpg",
  n5: "/assets/lina-n5.jpg",
  m1: "/assets/lina-m1.jpg",
  m2: "/assets/lina-m2.jpg",
  m3: "/assets/lina-m3.jpg",
  m4: "/assets/lina-m4.jpg",
  m5: "/assets/lina-m5.jpg",
  p1: "/assets/lina-p1.jpg",
  p2: "/assets/lina-p2.jpg",
  p3: "/assets/lina-p3.jpg",
  p4: "/assets/lina-p4.jpg",
};

const PROFILE_KEY = "lina_profile";

export const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const loadProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY));
  } catch {
    return null;
  }
};
