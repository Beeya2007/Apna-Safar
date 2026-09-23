/* ============================================================
   ONE CONVERSATION PAGE  —  shown at  /messages/c1
   Styles: styles/pages/messages.css
   ============================================================ */

import { notFound } from "next/navigation";
import { conversationById } from "@/lib/data/bookings";
import ThreadSection from "@/components/messages/ThreadSection";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conversation = conversationById(id);
  if (!conversation) notFound();

  return (
    /* THREAD — the conversation, with the others beside it */
    <ThreadSection conversation={conversation} />
  );
}
