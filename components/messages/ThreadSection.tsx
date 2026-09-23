/* ============================================================
   ONE CONVERSATION — the thread, with the list still beside it
   on desktop so you can jump between hosts.
   Styles live in: styles/pages/messages.css  (section 2)
   ============================================================ */

import Link from "next/link";
import type { Conversation } from "@/lib/types";
import { listingById } from "@/lib/data/listings";
import { hostById } from "@/lib/data/people";
import ConversationList from "./ConversationList";

export default function ThreadSection({ conversation }: { conversation: Conversation }) {
  const host = hostById(conversation.hostId)!;
  const listing = listingById(conversation.listingId)!;

  return (
    <section className="page-container thread">
      <div className="thread__layout">

        {/* LEFT — every other conversation */}
        <div className="thread__sidebar">
          <ConversationList activeId={conversation.id} />
        </div>

        {/* RIGHT — this one */}
        <div className="thread__panel">
          <header className="thread__head">
            <span className="thread__avatar" aria-hidden>{host.avatar}</span>
            <div>
              <h1 className="thread__name">{host.name}</h1>
              <Link className="thread__place" href={`/listing/${listing.id}`}>
                {listing.title}
              </Link>
            </div>
          </header>

          <div className="thread__messages">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "guest"
                    ? "bubble bubble--mine"
                    : "bubble bubble--theirs"
                }
              >
                <p>{message.text}</p>
                <span className="bubble__time">
                  {message.sentAt.replace("T", " · ")}
                </span>
              </div>
            ))}
          </div>

          {/* REPLY — not wired to anything yet */}
          <form className="thread__reply">
            <label className="field">
              <span className="field__label">Reply to {host.name}</span>
              <textarea className="field__textarea" placeholder="Write a message" />
            </label>
            <button className="button button--primary" type="button">Send</button>
          </form>
        </div>

      </div>
    </section>
  );
}
