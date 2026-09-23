/* ============================================================
   PROFILE — name, photo and the short "about" hosts can read.
   Styles live in: styles/pages/account.css  (section 2)
   ============================================================ */


"use client";

import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import { User } from "@phosphor-icons/react";

export default function ProfileSection() {
  return (
    <section className="page-container account-page">
      <PageHeading
        title="Personal details"
        lede="Hosts see your name, photo and what you write here. They never see your phone number or email."
      />

      <Panel title="About you">
        <div className="profile__identity">
          <span className="profile__avatar" aria-hidden>
            <User size={32} />
          </span>
          <button className="button button--secondary button--small">Change photo</button>
        </div>

        <div className="field-row profile__names">
          <label className="field">
            <span className="field__label">First name</span>
            <input className="field__input" defaultValue="Palak" />
          </label>
          <label className="field">
            <span className="field__label">Last name</span>
            <input className="field__input" defaultValue="Agarwal" />
          </label>
        </div>

        <label className="field profile__about">
          <span className="field__label">A line about you</span>
          <textarea className="field__textarea"
            defaultValue="Travel for the food, mostly. Tidy guest, early riser." />
        </label>
      </Panel>

      <Panel title="How we reach you">
        <div className="field-row">
          <label className="field">
            <span className="field__label">Email</span>
            <input className="field__input" type="email" defaultValue="palak@example.com" />
          </label>
          <label className="field">
            <span className="field__label">Phone</span>
            <input className="field__input" type="tel" defaultValue="98765 43210" />
          </label>
        </div>
      </Panel>

      <div className="account-page__save">
        <button className="button button--primary button--large">Save changes</button>
      </div>
    </section>
  );
}
