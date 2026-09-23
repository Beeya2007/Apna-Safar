/* ============================================================
   ACCOUNT MENU — the dropdown behind the avatar in the header.
   ------------------------------------------------------------
   Signing out asks first. It is one click from every screen,
   and losing your place because you brushed a menu item is a
   bad way to find that out.

   Styles live in: styles/components/dropdown.css
   ============================================================ */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Popover from "./Popover";
import Modal from "./Modal";

/* Edit this list to change what the account menu offers. */
const LINKS = [
  { label: "Account",   href: "/account" },
  { label: "My trips",  href: "/trips" },
  { label: "Wishlists", href: "/wishlists" },
  { label: "Messages",  href: "/messages" },
  { label: "Hosting",   href: "/host/dashboard" },
  { label: "Help",      href: "/help" },
];

export default function AccountMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [askingSignOut, setAskingSignOut] = useState(false);

  function signOut() {
    setAskingSignOut(false);
    router.push("/signin");
  }

  return (
    <div className="account-menu">
      <button
        type="button"
        className="site-header__account"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        <span aria-hidden>☰</span>
        <span className="site-header__avatar" aria-hidden>👤</span>
      </button>

      <Popover open={open} onClose={() => setOpen(false)} align="right">
        <ul className="dropdown__list" role="menu">
          {LINKS.map((link) => (
            <li key={link.href} role="none">
              <Link className="dropdown__option" role="menuitem" href={link.href}
                onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}

          <li className="account-menu__divider" role="none" />

          <li role="none">
            <button type="button" role="menuitem"
              className="dropdown__option account-menu__signout"
              onClick={() => { setOpen(false); setAskingSignOut(true); }}>
              Sign out
            </button>
          </li>
        </ul>
      </Popover>

      {/* ASK FIRST — signing out is one click from every screen */}
      <Modal
        open={askingSignOut}
        onClose={() => setAskingSignOut(false)}
        title="Sign out of ApnaSafar?"
        closeOnBackdrop={false}
        footer={
          <>
            <button type="button" className="button button--ghost"
              onClick={() => setAskingSignOut(false)}>Stay signed in</button>
            <button type="button" className="button button--primary"
              onClick={signOut}>Sign out</button>
          </>
        }
      >
        <p>
          Your trips, wishlists and messages stay exactly where they are. You
          will need your phone number and a code to get back in.
        </p>
      </Modal>
    </div>
  );
}
