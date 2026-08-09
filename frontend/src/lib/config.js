export const offer = {
  introPrice: 1.03,
  referencePrice: null,
  recurringPrice: null,
  recurringInterval: null,
  introDuration: null,
  telegramUrl: process.env.REACT_APP_TELEGRAM_URL || "#",
  snapUrl: process.env.REACT_APP_SNAP_URL || "#",
  includesCall: true,
};

export const INTRO_PRICE = offer.introPrice;
export const INTRO_DURATION = offer.introDuration;
export const RECURRING_PRICE = offer.recurringPrice;
export const RECURRING_INTERVAL = offer.recurringInterval;
export const REFERENCE_PRICE = offer.referencePrice;

export const formatPrice = (v) => `${v.toFixed(2).replace(".", ",")} €`;

export const ASSETS = {
  hero: "/assets/lina-5.jpg",
  avatar: "/assets/lina-3.jpg",
  lina1: "/assets/lina-1.jpg",
  lina2: "/assets/lina-2.jpg",
  lina3: "/assets/lina-3.jpg",
  lina4: "/assets/lina-4.jpg",
  lina5: "/assets/lina-5.jpg",
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
