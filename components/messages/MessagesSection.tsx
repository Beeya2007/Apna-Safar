/* ============================================================
   MESSAGES — the list of threads on its own.
   Styles live in: styles/pages/messages.css  (section 1)
   ============================================================ */


"use client";

import { CONVERSATIONS } from "@/lib/data/bookings";
import PageHeading from "@/components/shared/PageHeading";
import EmptyState from "@/components/shared/EmptyState";
import { Envelope } from "@phosphor-icons/react";
import ConversationList from "./ConversationList";

export default function MessagesSection() {
  return (
    <section className="page-container messages">
      <PageHeading title="Messages" lede="Hosts never see your phone number. Everything goes through here." />

      {CONVERSATIONS.length === 0 ? (
        <EmptyState
          icon={<Envelope size={32} />}
          title="No messages yet"
          body="Once you book somewhere, or ask a host a question, the conversation lives here."
          actionLabel="Find somewhere to stay"
          actionHref="/search"
        />
      ) : (
        <ConversationList />
      )}
    </section>
  );
}
