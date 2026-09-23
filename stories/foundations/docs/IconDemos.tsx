/* Icon demonstrations. Real markup, real tokens — these are the
   rules from the page working rather than being described. */
import React from 'react';
import {
  ArrowRight, CheckCircle, WarningCircle, Envelope, Heart, DotsThreeVertical,
  MagnifyingGlass, Trash, House, MapPin,
} from '@phosphor-icons/react';

/* ---- ALIGNMENT — leading, trailing, and in flowing text ----- */

export function Alignment() {
  return (
    <div className="ico-demo sb-unstyled">
      <div className="ico-demo__row">
        <span className="icon-text"><Envelope className="icon" /> Leading icon</span>
        <span className="icon-text">Trailing icon <ArrowRight className="icon" /></span>
        <span className="icon-text icon-text--sm"><MapPin className="icon" /> Small pairing, 4px gap</span>
      </div>
      <p className="ico-demo__prose">
        In flowing text an icon <House className="icon" style={{ width: 20, height: 20 }} /> sits
        on the baseline because of the optical nudge, rather than floating above the line.
      </p>
    </div>
  );
}

/* ---- MEANING — colour is never the whole message ------------ */

export function Meaning() {
  return (
    <div className="bh sb-unstyled">
      <div className="bh__side bh__side--good">
        <span className="bh__lbl bh__lbl--good">different glyph, and a word</span>
        <div className="ico-demo__row">
          <span className="icon-text" style={{ color: 'var(--color-status-success-icon)' }}>
            <CheckCircle className="icon" weight="fill" /> Trip confirmed
          </span>
          <span className="icon-text" style={{ color: 'var(--color-status-error-icon)' }}>
            <WarningCircle className="icon" weight="fill" /> Payment failed
          </span>
        </div>
      </div>
      <div className="bh__side bh__side--bad">
        <span className="bh__lbl bh__lbl--bad">same glyph, colour only — identical to a screen reader</span>
        <div className="ico-demo__row">
          <CheckCircle className="icon" weight="fill" size={20}
                       color="var(--color-status-success-icon)" />
          <CheckCircle className="icon" weight="fill" size={20}
                       color="var(--color-status-error-icon)" />
        </div>
      </div>
    </div>
  );
}

/* ---- CONTAINERS — when an icon earns a box ------------------ */

export function Containers() {
  return (
    <div className="ico-demo sb-unstyled">
      <div className="ico-demo__row ico-demo__row--wide">
        <Sample label="Bare" note="beside text, inside a labelled button">
          <Heart className="icon" size={20} />
        </Sample>
        <Sample label="Icon button" note="the icon IS the control">
          <button className="icon-button" type="button" aria-label="More options">
            <DotsThreeVertical size={20} />
          </button>
        </Sample>
        <Sample label="Tinted mark" note="a status that must read at a glance">
          <span className="ico-mark"><CheckCircle size={20} weight="fill" /></span>
        </Sample>
        <Sample label="Avatar" note="a person or a place, never an action">
          <span className="ico-avatar">PA</span>
        </Sample>
      </div>
    </div>
  );
}

/* ---- ICON BUTTONS — sizes and states ------------------------ */

export function IconButtons() {
  return (
    <div className="ico-demo sb-unstyled">
      <div className="ico-demo__row ico-demo__row--wide">
        <Sample label="32px" note="--control-height-sm, 16px icon">
          <button className="icon-button icon-button--sm" type="button" aria-label="Search">
            <MagnifyingGlass size={16} />
          </button>
        </Sample>
        <Sample label="40px" note="--control-height-md, the default">
          <button className="icon-button" type="button" aria-label="Search">
            <MagnifyingGlass size={20} />
          </button>
        </Sample>
        <Sample label="48px" note="--control-height-lg, 24px icon">
          <button className="icon-button icon-button--lg" type="button" aria-label="Search">
            <MagnifyingGlass size={24} />
          </button>
        </Sample>
        <Sample label="Round" note="--radius-full, floating actions">
          <button className="icon-button icon-button--round" type="button" aria-label="Save">
            <Heart size={20} />
          </button>
        </Sample>
        <Sample label="Selected" note="aria-pressed, and the fill weight">
          <button className="icon-button" type="button" aria-pressed="true" aria-label="Saved">
            <Heart size={20} weight="fill" />
          </button>
        </Sample>
        <Sample label="Disabled" note="same size, colour only">
          <button className="icon-button" type="button" disabled aria-label="Delete">
            <Trash size={20} />
          </button>
        </Sample>
      </div>
    </div>
  );
}

function Sample({ label, note, children }:
  { label: string; note: string; children: React.ReactNode }) {
  return (
    <div className="ico-sample">
      <div className="ico-sample__stage">{children}</div>
      <strong className="ico-sample__label">{label}</strong>
      <span className="ico-sample__note">{note}</span>
    </div>
  );
}
