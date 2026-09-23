/* ============================================================
   HOST PITCH — the case for listing a place, and what it earns.
   Styles live in: styles/pages/host.css  (section 1)
   ============================================================ */

import Link from "next/link";
import { rupees } from "@/lib/format";

/* Edit these three to change the steps shown. */
const STEPS = [
  { number: "1", title: "Describe the place", body: "Where it is, how many it sleeps, what is included. Ten minutes." },
  { number: "2", title: "Add photos and a price", body: "We suggest a nightly rate from what similar places nearby charge." },
  { number: "3", title: "Publish when ready", body: "Nothing goes live until you say so, and you can unpublish any time." },
];

export default function HostPitchSection() {
  return (
    <section className="host-pitch">
      <div className="page-container">
        <p className="host-pitch__eyebrow">Hosting</p>
        <h1 className="host-pitch__title">Open your door.<br />Earn on your terms.</h1>
        <p className="host-pitch__lede">
          You set the price, the dates and the house rules. A place like yours
          in this area earns around {rupees(38000)} a month with eight nights booked.
        </p>

        <div className="host-pitch__actions">
          <Link href="/host/listings/new" className="button button--primary button--large">
            List your place
          </Link>
          <Link href="/host/dashboard" className="button button--secondary button--large">
            I already host
          </Link>
        </div>

        <ol className="host-pitch__steps">
          {STEPS.map((step) => (
            <li className="host-step" key={step.number}>
              <span className="host-step__number" aria-hidden>{step.number}</span>
              <h2 className="host-step__title">{step.title}</h2>
              <p className="host-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
