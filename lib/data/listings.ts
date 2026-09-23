/* ============================================================
   LISTINGS — the places to stay.
   ------------------------------------------------------------
   Safe to edit freely. This is placeholder content that stands
   in until real listings come from a database.

   Prices are WHOLE RUPEES. Dates are ISO — "2026-11-12".
   ============================================================ */

import type { Listing } from "../types";

/* Amenity labels are reused across listings, so they live here
   once. Adding a new one is just adding a string. */
export const AMENITIES = [
  "Wi-Fi", "Kitchen", "Air conditioning", "Free parking", "Pool",
  "Washing machine", "Workspace", "Breakfast", "Pets allowed",
  "Hot water", "Power backup", "Sea view", "Mountain view", "Garden",
];

export const LISTINGS: Listing[] = [
  {
    id: "1", title: "Sea-facing villa with a private deck",
    location: "Anjuna, Goa", citySlug: "goa", propertyType: "Beachfront",
    distanceKm: 580, availableFrom: "2026-11-12", availableTo: "2026-11-17",
    pricePerNight: 4200, cleaningFee: 800, rating: 4.87, reviewCount: 128,
    photos: ["/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg", "/images/placeholder-4.svg", "/images/placeholder-1.svg"],
    hostId: "h1", guests: 6, bedrooms: 3, beds: 4, bathrooms: 2,
    description: "Five minutes from the sand, with a deck that catches the evening light and a kitchen big enough to actually cook in. The lane outside is quiet after dark.",
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Free parking", "Pool", "Sea view", "Power backup"],
    houseRules: ["No parties or events", "Quiet hours after 10pm", "No smoking indoors"],
    cancellation: "flexible", neighbourhood: "A residential lane behind Anjuna beach, walkable to the market.",
  },
  {
    id: "2", title: "Cedar cabin with a valley view",
    location: "Manali, Himachal", citySlug: "manali", propertyType: "Mountains",
    distanceKm: 1240, availableFrom: "2026-12-03", availableTo: "2026-12-08",
    pricePerNight: 3100, cleaningFee: 600, rating: 4.92, reviewCount: 94,
    photos: ["/images/placeholder-2.svg", "/images/placeholder-3.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg"],
    hostId: "h2", guests: 4, bedrooms: 2, beds: 3, bathrooms: 1,
    description: "Built from local cedar, warm through the winter, with the whole valley in front of the living room window. Bring layers — mornings are cold.",
    amenities: ["Wi-Fi", "Kitchen", "Free parking", "Workspace", "Mountain view", "Hot water", "Power backup"],
    houseRules: ["No smoking", "Carry your waste down", "Check in before 8pm"],
    cancellation: "moderate", neighbourhood: "Twenty minutes above old Manali, on a road that stays open through winter.",
  },
  {
    id: "3", title: "Backwater houseboat, fully crewed",
    location: "Alleppey, Kerala", citySlug: "kerala", propertyType: "Islands",
    distanceKm: 820, availableFrom: "2026-11-20", availableTo: "2026-11-25",
    pricePerNight: 5600, cleaningFee: 0, rating: 4.78, reviewCount: 211,
    photos: ["/images/placeholder-3.svg", "/images/placeholder-4.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg"],
    hostId: "h3", guests: 4, bedrooms: 2, beds: 2, bathrooms: 2,
    description: "A traditional kettuvallam with a cook on board. You wake up somewhere different from where you went to sleep, which is the entire point.",
    amenities: ["Air conditioning", "Breakfast", "Hot water", "Sea view"],
    houseRules: ["No alcohol on deck after dark", "Boat moors at 5:30pm", "No shoes inside"],
    cancellation: "strict", neighbourhood: "Departs from Punnamada jetty and moors in the quieter canals overnight.",
  },
  {
    id: "4", title: "Haveli suite with a courtyard",
    location: "Udaipur, Rajasthan", citySlug: "udaipur", propertyType: "Heritage",
    distanceKm: 450, availableFrom: "2027-01-08", availableTo: "2027-01-12",
    pricePerNight: 7900, cleaningFee: 1200, rating: 4.95, reviewCount: 167,
    photos: ["/images/placeholder-4.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg"],
    hostId: "h4", guests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    description: "One suite in a family haveli that has been standing for two hundred years. The courtyard is shared with the owners, who will feed you if you let them.",
    amenities: ["Wi-Fi", "Air conditioning", "Breakfast", "Garden", "Hot water", "Power backup"],
    houseRules: ["Dress modestly in shared areas", "No outside guests", "Gate locks at 11pm"],
    cancellation: "moderate", neighbourhood: "Inside the old city walls, a short walk from the lake ghats.",
  },
  {
    id: "5", title: "Coffee estate cottage",
    location: "Coorg, Karnataka", citySlug: "coorg", propertyType: "Countryside",
    distanceKm: 260, availableFrom: "2026-12-15", availableTo: "2026-12-19",
    pricePerNight: 3800, cleaningFee: 700, rating: 4.81, reviewCount: 76,
    photos: ["/images/placeholder-1.svg", "/images/placeholder-3.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg"],
    hostId: "h5", guests: 5, bedrooms: 2, beds: 3, bathrooms: 2,
    description: "A working coffee estate, so expect to be woken by birds rather than traffic. Walks start at the back door and the plantation tour is included.",
    amenities: ["Wi-Fi", "Kitchen", "Free parking", "Breakfast", "Garden", "Pets allowed", "Power backup"],
    houseRules: ["Close gates behind you", "No loud music outdoors", "Dogs on the property are friendly"],
    cancellation: "flexible", neighbourhood: "Eight kilometres from Madikeri, down an estate road best driven in daylight.",
  },
  {
    id: "6", title: "Riverside room above the ghats",
    location: "Rishikesh, Uttarakhand", citySlug: "rishikesh", propertyType: "Mountains",
    distanceKm: 1100, availableFrom: "2027-02-05", availableTo: "2027-02-09",
    pricePerNight: 2400, cleaningFee: 400, rating: 4.69, reviewCount: 143,
    photos: ["/images/placeholder-2.svg", "/images/placeholder-4.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg"],
    hostId: "h2", guests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    description: "Small, plain, and directly above the water. You hear the river the whole time you are here, which people either love or do not.",
    amenities: ["Wi-Fi", "Hot water", "Workspace", "Mountain view", "Breakfast"],
    houseRules: ["No meat or alcohol on the property", "Quiet after 9pm", "No smoking"],
    cancellation: "flexible", neighbourhood: "Tapovan side, up a flight of steps from the footbridge.",
  },
  {
    id: "7", title: "French quarter townhouse",
    location: "Pondicherry, Tamil Nadu", citySlug: "pondicherry", propertyType: "City",
    distanceKm: 690, availableFrom: "2026-11-22", availableTo: "2026-11-27",
    pricePerNight: 4900, cleaningFee: 900, rating: 4.88, reviewCount: 102,
    photos: ["/images/placeholder-3.svg", "/images/placeholder-2.svg", "/images/placeholder-4.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg"],
    hostId: "h6", guests: 4, bedrooms: 2, beds: 2, bathrooms: 2,
    description: "Yellow walls, tall shutters, a courtyard with a tree in it. Ten minutes on foot to the promenade and every bakery worth the walk.",
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Washing machine", "Garden", "Workspace", "Power backup"],
    houseRules: ["No parties", "Street door stays locked", "No smoking indoors"],
    cancellation: "moderate", neighbourhood: "White Town, on a quiet cross street two blocks back from the sea.",
  },
  {
    id: "8", title: "Hillside cabin with a wood stove",
    location: "Shillong, Meghalaya", citySlug: "shillong", propertyType: "Cabins",
    distanceKm: 2050, availableFrom: "2027-03-10", availableTo: "2027-03-14",
    pricePerNight: 3300, cleaningFee: 600, rating: 4.74, reviewCount: 58,
    photos: ["/images/placeholder-4.svg", "/images/placeholder-1.svg", "/images/placeholder-2.svg", "/images/placeholder-3.svg", "/images/placeholder-4.svg"],
    hostId: "h5", guests: 3, bedrooms: 1, beds: 2, bathrooms: 1,
    description: "Pine on three sides and a stove that does the heavy lifting from October onwards. Firewood is stacked under the porch and included.",
    amenities: ["Wi-Fi", "Kitchen", "Free parking", "Hot water", "Mountain view", "Pets allowed", "Power backup"],
    houseRules: ["Stove off when you leave", "No open fires outside", "Quiet hours after 10pm"],
    cancellation: "moderate", neighbourhood: "Twenty minutes from Police Bazar, on the Laitkor ridge.",
  },
];

export function listingById(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}
