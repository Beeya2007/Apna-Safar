/* ============================================================
   LEGAL PAGES — terms, privacy and the policies linked from
   the footer. Safe to edit freely; placeholder wording that a
   lawyer replaces before launch.
   ============================================================ */

export type LegalPage = { slug: string; title: string; body: string[] };

export const LEGAL_PAGES: LegalPage[] = [
  { slug: "terms", title: "Terms of use", body: [
    "By using ApnaSafar you agree to book honestly, to treat the places you stay in as you would your own, and to settle disputes through us before taking them elsewhere.",
    "We connect guests and hosts. We are not the owner of any property listed here, and the contract for a stay is between the guest and the host.",
    "These terms are placeholder wording and must be replaced with reviewed legal text before the site accepts real bookings.",
  ] },
  { slug: "privacy", title: "Privacy", body: [
    "We collect what we need to run a booking and nothing more: your name, how to reach you, and the details of the stays you book.",
    "Hosts see your name and what you write about yourself. They never see your phone number or email address.",
    "Card details are handled by the payment provider and are never stored on our servers.",
    "You can ask us to delete your account and everything attached to it at any time.",
  ] },
  { slug: "cancellation", title: "Cancellation policy", body: [
    "Every listing states one of three policies, and it is shown before you pay, never after.",
    "Flexible: a full refund up to 24 hours before check-in. Moderate: up to 5 days before. Strict: only within 48 hours of booking.",
    "Inside the window you get everything back except the service fee. Outside it, the booking is non-refundable.",
    "Before you confirm a cancellation the exact amount is shown on screen. That figure is the refund, not an estimate.",
  ] },
  { slug: "safety", title: "Safety", body: [
    "Always pay and message through ApnaSafar. If anyone asks you to move a payment off the site, that is a scam — report it and we will act.",
    "Every listing states the safety equipment fitted. If something is missing when you arrive, tell us and we will rehouse you.",
    "In an emergency, call local emergency services first and us second.",
  ] },
];

export function legalPageBySlug(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}
