/* ============================================================
   ACCOUNT HOME — the hub. Everything a signed-in person can
   change about themselves, one tile each.
   Styles live in: styles/pages/account.css  (section 1)
   ============================================================ */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmButton from "@/components/shared/ConfirmButton";
import PageHeading from "@/components/shared/PageHeading";

/* Edit this list to change what appears on the account hub. */
const TILES = [
  { icon: "🪪", title: "Personal details", body: "Name, photo, and what hosts see about you.", href: "/account/profile" },
  { icon: "💳", title: "Payments",         body: "Cards, refunds and every receipt.",          href: "/account/payments" },
  { icon: "🔔", title: "Notifications",    body: "What we send you, and how.",                 href: "/account/notifications" },
  { icon: "🧳", title: "My trips",         body: "Upcoming, past and cancelled bookings.",     href: "/trips" },
  { icon: "♡",  title: "Wishlists",        body: "Places you saved for later.",                href: "/wishlists" },
  { icon: "🏠", title: "Hosting",          body: "List a place, or manage the ones you have.", href: "/host" },
];

export default function AccountHomeSection() {
  const router = useRouter();

  return (
    <section className="page-container account">
      <PageHeading title="Account" lede="Signed in as Palak · palak@example.com" />

      <div className="account__tiles">
        {TILES.map((tile) => (
          <Link key={tile.href} href={tile.href} className="account-tile">
            <span className="account-tile__icon" aria-hidden>{tile.icon}</span>
            <h2 className="account-tile__title">{tile.title}</h2>
            <p className="account-tile__body">{tile.body}</p>
          </Link>
        ))}
      </div>

      {/* Signing out asks first — see ConfirmButton */}
      <div className="account__signout">
        <ConfirmButton
          variant="ghost"
          label="Sign out"
          title="Sign out of ApnaSafar?"
          body="Your trips, wishlists and messages stay exactly where they are. You will need your phone number and a code to get back in."
          confirmLabel="Sign out"
          cancelLabel="Stay signed in"
          onConfirm={() => router.push("/signin")}
        />
      </div>
    </section>
  );
}
