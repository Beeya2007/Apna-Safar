/* ============================================================
   PEOPLE — hosts and the reviews guests have left.
   ------------------------------------------------------------
   Safe to edit freely. Placeholder content.
   ============================================================ */

import type { Host, Review } from "../types";

export const HOSTS: Host[] = [
  { id: "h1", name: "Priya", avatar: "👩", photo: "/images/people/h1.jpg", joinedYear: 2019, responseRate: 98, isVerified: true,
    about: "I grew up two streets from here and have been letting the villa since my children moved out. I answer messages quickly and I will always tell you honestly if a date is a bad one to visit." },
  { id: "h2", name: "Tenzin", avatar: "🧔", photo: "/images/people/h2.jpg", joinedYear: 2021, responseRate: 92, isVerified: true,
    about: "I run two small properties in the hills and do the maintenance myself. Ask me about trails — I have walked most of them." },
  { id: "h3", name: "Mathew", avatar: "👨", photo: "/images/people/h3.jpg", joinedYear: 2017, responseRate: 100, isVerified: true,
    about: "Third generation on the backwaters. The boat is crewed by people I have known my whole life." },
  { id: "h4", name: "Sunita", avatar: "👵", photo: "/images/people/h4.jpg", joinedYear: 2020, responseRate: 95, isVerified: true,
    about: "The haveli is my family home and we live in the other wing. Guests are welcome at dinner if they give me a day's notice." },
  { id: "h5", name: "Arjun", avatar: "🧑", photo: "/images/people/h5.jpg", joinedYear: 2022, responseRate: 88, isVerified: false,
    about: "I look after two places, one on a coffee estate and one on a ridge. Both are quiet on purpose." },
  { id: "h6", name: "Claire", avatar: "👱", photo: "/images/people/h6.jpg", joinedYear: 2018, responseRate: 97, isVerified: true,
    about: "I restored the townhouse over four years and I am still finding things behind the walls. Happy to point you at the good food." },
];

export function hostById(id: string): Host | undefined {
  return HOSTS.find((h) => h.id === id);
}

export const REVIEWS: Review[] = [
  { id: "r1", listingId: "1", author: "Nikhil", avatar: "🧑", photo: "/images/people/r1.jpg", date: "2026-09-04", rating: 5,
    text: "The deck is the whole thing. We ate every meal out there. Priya left a note about which shack to avoid, which turned out to be good advice." },
  { id: "r2", listingId: "1", author: "Farah", avatar: "👩", photo: "/images/people/r2.jpg", date: "2026-08-19", rating: 5,
    text: "Clean, quiet, and much closer to the beach than the photos suggest. The power cut on our second night and the backup came on before we noticed." },
  { id: "r3", listingId: "1", author: "Dev", avatar: "👨", photo: "/images/people/r3.jpg", date: "2026-07-28", rating: 4,
    text: "Good stay. The road in is rough for the last hundred metres — fine in a car, less fine on a scooter with luggage." },
  { id: "r4", listingId: "2", author: "Ishita", avatar: "👩", photo: "/images/people/r4.jpg", date: "2026-08-30", rating: 5,
    text: "Woke up to the valley with no cloud in it. The cabin holds heat properly, which I did not expect at that altitude." },
  { id: "r5", listingId: "2", author: "Sameer", avatar: "🧔", photo: "/images/people/r5.jpg", date: "2026-06-11", rating: 5,
    text: "Tenzin met us on the road because we could not find the turning. Small thing, made the trip." },
  { id: "r6", listingId: "3", author: "Anjali", avatar: "👩", photo: "/images/people/r6.jpg", date: "2026-10-02", rating: 5,
    text: "The food was better than most restaurants I have eaten in. Cabins are small — go in knowing that and it is fine." },
  { id: "r7", listingId: "3", author: "Rohan", avatar: "👨", photo: "/images/people/r7.jpg", date: "2026-09-15", rating: 4,
    text: "Lovely trip. Mooring at 5:30 is earlier than we wanted but apparently it is the rule for everyone." },
  { id: "r8", listingId: "4", author: "Meera", avatar: "👩", photo: "/images/people/r8.jpg", date: "2026-09-21", rating: 5,
    text: "Staying in a house someone actually lives in is completely different to a hotel. Sunita fed us twice and refused payment both times." },
  { id: "r9", listingId: "5", author: "Kabir", avatar: "🧑", photo: "/images/people/r9.jpg", date: "2026-08-05", rating: 5,
    text: "Birds from five in the morning. I mean that as a recommendation. The plantation walk is worth getting up for." },
  { id: "r10", listingId: "6", author: "Tara", avatar: "👱", photo: "/images/people/r10.jpg", date: "2026-07-19", rating: 4,
    text: "Basic room, unbeatable location. The river is loud, so bring earplugs if you are a light sleeper." },
  { id: "r11", listingId: "7", author: "Vikram", avatar: "👨", photo: "/images/people/r11.jpg", date: "2026-10-08", rating: 5,
    text: "The courtyard makes the house. We stopped going out in the afternoons and just sat under the tree." },
  { id: "r12", listingId: "8", author: "Lily", avatar: "👩", photo: "/images/people/r12.jpg", date: "2026-09-29", rating: 5,
    text: "Wood stove, firewood stacked, nothing to work out. Cold outside and warm inside within twenty minutes of arriving." },
];

export function reviewsFor(listingId: string): Review[] {
  return REVIEWS.filter((r) => r.listingId === listingId);
}
