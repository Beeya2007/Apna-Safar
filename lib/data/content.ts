/* ============================================================
   CONTENT — destinations, experiences and help articles.
   ------------------------------------------------------------
   Safe to edit freely. Placeholder content.
   ============================================================ */

import type { Destination, Experience, HelpArticle } from "../types";

export const DESTINATIONS: Destination[] = [
  { slug: "goa",         name: "Goa",         emoji: "🏖️", lat: 15.4909, lng: 73.8278, listingCount: 1, tagline: "Beaches at both ends and a lot of quiet in between." },
  { slug: "manali",      name: "Manali",      emoji: "🏔️", lat: 32.2432, lng: 77.1892, listingCount: 1, tagline: "Cedar, snow, and roads that close without warning." },
  { slug: "kerala",      name: "Kerala",      emoji: "🛶", lat: 9.9312, lng: 76.2673, listingCount: 1, tagline: "Water instead of streets, for a few days at least." },
  { slug: "udaipur",     name: "Udaipur",     emoji: "🏰", lat: 24.5854, lng: 73.7125, listingCount: 1, tagline: "Lakes, ghats, and houses older than most countries." },
  { slug: "coorg",       name: "Coorg",       emoji: "🌿", lat: 12.4244, lng: 75.7382, listingCount: 1, tagline: "Coffee, rain, and nothing much to do on purpose." },
  { slug: "rishikesh",   name: "Rishikesh",   emoji: "🏞️", lat: 30.0869, lng: 78.2676, listingCount: 1, tagline: "The river is the reason. Everything else is nearby." },
  { slug: "pondicherry", name: "Pondicherry", emoji: "🌤️", lat: 11.9416, lng: 79.8083, listingCount: 1, tagline: "Shuttered windows and bakeries worth planning around." },
  { slug: "shillong",    name: "Shillong",    emoji: "🌲", lat: 25.5788, lng: 91.8933, listingCount: 1, tagline: "Pine ridges, low cloud, and very good live music." },
];

export function destinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export const EXPERIENCES: Experience[] = [
  { id: "e1", title: "Morning fish market walk", location: "Pondicherry, Tamil Nadu", emoji: "🐟",
    durationHours: 3, pricePerPerson: 1200, rating: 4.9, reviewCount: 64,
    description: "Start at five, when the boats come in and the auction is loud. Ends with breakfast at a stall that has been there longer than anyone can remember." },
  { id: "e2", title: "Coffee estate and roasting", location: "Coorg, Karnataka", emoji: "☕",
    durationHours: 4, pricePerPerson: 1800, rating: 4.8, reviewCount: 41,
    description: "Walk the rows, pick if it is the season, then roast a small batch and take it home. Run by the family who own the estate." },
  { id: "e3", title: "Old city cooking, start to finish", location: "Udaipur, Rajasthan", emoji: "🍲",
    durationHours: 5, pricePerPerson: 2400, rating: 5.0, reviewCount: 88,
    description: "Shop the market for what is actually good that day, then cook six dishes in a home kitchen and eat all of them." },
  { id: "e4", title: "Sunrise paddle on the backwaters", location: "Alleppey, Kerala", emoji: "🛶",
    durationHours: 3, pricePerPerson: 1500, rating: 4.7, reviewCount: 122,
    description: "A canoe, two paddles and the narrow canals the houseboats cannot reach. Quiet enough to hear the village waking up." },
  { id: "e5", title: "Ridge walk and waterfall swim", location: "Shillong, Meghalaya", emoji: "💦",
    durationHours: 6, pricePerPerson: 2100, rating: 4.8, reviewCount: 37,
    description: "Six hours on foot with a long stop to swim. Moderate pace, some scrambling, worth it for the last twenty minutes alone." },
  { id: "e6", title: "Evening ghats and aarti", location: "Rishikesh, Uttarakhand", emoji: "🪔",
    durationHours: 2, pricePerPerson: 900, rating: 4.6, reviewCount: 153,
    description: "Walk the quieter bank at dusk, then sit for the ceremony with someone who can explain what is happening and why." },
];

export function experienceById(id: string): Experience | undefined {
  return EXPERIENCES.find((e) => e.id === id);
}

export const HELP_ARTICLES: HelpArticle[] = [
  { slug: "service-animals", category: "Bookings", title: "Bringing a service animal",
    body: [
      "A service animal is not a pet. You do not need to add one under Pets when you search, and a host cannot turn you down or charge a pet fee because you are bringing one.",
      "Because of that, listings that say no pets are still open to you. Leave the Pets count at zero and search as you normally would.",
      "It is worth messaging your host before you arrive so they know to expect you — not for permission, but so nothing about the arrival is a surprise.",
    ] },
  { slug: "cancel-a-booking", category: "Bookings", title: "How do I cancel a booking?",
    body: [
      "Open My trips, pick the booking, and choose Cancel booking. Before you confirm, the page shows exactly what you would get back — that number is the refund, not an estimate.",
      "What you get back depends on the cancellation policy shown on the listing when you booked. Flexible refunds in full up to 24 hours before check-in. Moderate up to 5 days. Strict refunds in full only within 48 hours of booking.",
      "Refunds go back to the original payment method and usually take 5 to 7 working days.",
    ] },
  { slug: "when-am-i-charged", category: "Payments", title: "When am I charged?",
    body: [
      "The full amount is taken when you confirm the booking, not at check-in. You will see the complete breakdown — nights, cleaning, service fee and tax — before you pay anything.",
      "Prices on ApnaSafar include all taxes. There is nothing added at the property.",
    ] },
  { slug: "contact-a-host", category: "Bookings", title: "How do I contact my host?",
    body: [
      "Every booking has a Message host button, on the booking page and in Messages. Hosts see your message straight away and most reply within a few hours.",
      "Hosts do not see your phone number or email, and you do not see theirs. The address is shared once the booking is confirmed.",
    ] },
  { slug: "list-your-place", category: "Hosting", title: "How do I list my place?",
    body: [
      "Start at Become a host. You will be asked for the basics — where it is, how many people it sleeps, what is included — then photos, then a price.",
      "You can save and come back at any point. Nothing goes live until you publish it yourself.",
    ] },
  { slug: "when-do-i-get-paid", category: "Hosting", title: "When do I get paid?",
    body: [
      "Payouts are released 24 hours after your guest checks in, and land in your account within 3 to 5 working days.",
      "Every payout and its fees are itemised under Earnings.",
    ] },
  { slug: "is-my-payment-safe", category: "Safety", title: "Is my payment safe?",
    body: [
      "Card details are handled by the payment provider and never stored on our servers.",
      "Always pay through ApnaSafar. If anyone asks you to pay outside the site, that is a scam — report it and we will act on it.",
    ] },
];

export function helpArticleBySlug(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}
