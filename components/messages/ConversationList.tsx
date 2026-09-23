/* ============================================================
   CONVERSATION LIST — every thread, newest message first.
   Doubles as the left column of a single conversation.
   Styles live in: styles/pages/messages.css  (section 1)
   ============================================================ */

import Link from "next/link";
import { CONVERSATIONS } from "@/lib/data/bookings";
import { listingById } from "@/lib/data/listings";
import { hostById } from "@/lib/data/people";

export default function ConversationList({ activeId }: { activeId?: string }) {
  return (
    <nav className="conversations">
      {CONVERSATIONS.map((conversation) => {
        const host = hostById(conversation.hostId)!;
        const listing = listingById(conversation.listingId)!;
        const last = conversation.messages[conversation.messages.length - 1];

        return (
          <Link
            key={conversation.id}
            href={`/messages/${conversation.id}`}
            className={
              conversation.id === activeId
                ? "conversation conversation--active"
                : "conversation"
            }
          >
            <span className="conversation__avatar" aria-hidden>{host.avatar}</span>
            <span className="conversation__body">
              <span className="conversation__name">
                {host.name}
                {conversation.unread && <span className="conversation__dot" aria-label="Unread" />}
              </span>
              <span className="conversation__place">{listing.location}</span>
              <span className="conversation__preview">{last.text}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
