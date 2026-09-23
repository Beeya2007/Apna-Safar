/* ============================================================
   ONE WISHLIST PAGE  —  shown at  /wishlists/w1
   Styles: styles/pages/saved.css
   ============================================================ */

import { notFound } from "next/navigation";
import { wishlistById } from "@/lib/data/bookings";
import WishlistDetailSection from "@/components/saved/WishlistDetailSection";

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = wishlistById(id);
  if (!list) notFound();

  return (
    /* WISHLIST DETAIL — the places saved into this list */
    <WishlistDetailSection list={list} />
  );
}
