# PRD — LINA PRIVATE (V1)

## Problem statement (original)
Construire la V1 frontend complète de « LINA PRIVATE » : passerelle mobile-first entre les réseaux sociaux de Lina et son espace privé. Dark, intime, premium creator platform (pas de SaaS). Parcours : hero photo → galerie mixte visible/verrouillé → CTA → mini profil (pseudo + email) → animation de création d'accès → reveal de l'offre 1,03 € → checkout PLACEHOLDER → success mock → redirection Telegram (plus tard). Aucun paiement réel, aucune auth réelle, aucune fausse urgence.

## Choix validés par l'utilisateur
- « Appel privé offert » affiché comme inclus dans l'offre (avec mention conditions de réservation).
- Stack : React + Tailwind + Framer Motion + Lenis (adaptation du brief Next.js, validée).
- Routes : / , /access , /checkout , /success.

## Architecture
- React SPA (craco), react-router-dom v7, framer-motion 11, lenis (smooth scroll), lucide-react.
- src/lib/config.js : offer { introPrice 1.03, referencePrice null, recurringPrice null, recurringInterval null, telegramUrl/snapUrl via env, includesCall true }, formatPrice, ASSETS, saveProfile/loadProfile (localStorage, abstraction prête pour Supabase).
- Composants : Header, LinaHero (parallax + masked reveal), ProfileIntro, Marquee, ContentGrid/ContentCard (masonry, locked blur, aperçu vidéo simulé), LockedContentSheet, VideoPreviewSheet, Lightbox, ValueStack, UnlockCTA, StickyUnlockBar, Footer, AccessForm, UnlockLoader, OfferReveal.
- Assets : 5 photos fournies, optimisées (1080w jpg) dans public/assets/.
- Checkout : startCheckout() mock avec // TODO PAYMENT PROVIDER.

## Implémenté (09/08/2026)
- Landing complète : header sticky blur, hero 100svh parallax, profil, marquee, galerie 8 cartes (4 visibles / 4 verrouillées), bottom sheets spring, lightbox photos, value stack (4 cartes + appel offert), CTA section, sticky bar (masquée si modal), footer discret + mention persona.
- Flow /access : formulaire pseudo+email (validation frontend), loader 2.75s (progress ring + 3 messages), reveal offre avec compteur animé 1 → 1,03 €.
- /checkout : résumé, mention « paiement simulé », mock → /success. /success : check animé, CTA Telegram (placeholder "#").
- Vérifié : parcours complet en 390×844 (screenshots), desktop 1920 (colonne centrée), aucune erreur console.

## Personas
- Visiteur social (Instagram/Snap/TikTok) sur smartphone, veut un aperçu rapide et un accès fluide.
- Lina (créatrice) : connectera paiement + Telegram plus tard.

## Backlog
- P0 : brancher un vrai prestataire de paiement (Stripe) dans startCheckout() + webhook → Telegram.
- P0 : fournir TELEGRAM_URL / SNAP_URL réels (env REACT_APP_TELEGRAM_URL, REACT_APP_SNAP_URL).
- P1 : pages Conditions / Confidentialité / Support réelles.
- P1 : auth Supabase derrière saveProfile (magic link email).
- P2 : vraies vidéos d'aperçu, galerie paginée, analytics conversion.
