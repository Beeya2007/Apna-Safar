/* ============================================================
   AMENITIES — what the place comes with.
   Styles live in: styles/pages/listing.css  (section 3)
   ============================================================ */

export default function AmenitiesBlock({ amenities }: { amenities: string[] }) {
  return (
    <div className="listing-block">
      <h2 className="listing-block__title">What this place offers</h2>
      <ul className="amenities">
        {amenities.map((amenity) => (
          <li className="amenities__item" key={amenity}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
}
