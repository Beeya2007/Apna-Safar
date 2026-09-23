/* ============================================================
   NOTIFICATIONS — what we may send, and by which route.
   Styles live in: styles/pages/account.css  (section 4)
   ============================================================ */

import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";

/* Edit this list to change what can be switched on and off.
   `essential` means it cannot be turned off, because losing it
   would mean missing something about a booking already paid for. */
const SETTINGS = [
  { label: "Booking confirmations and changes", note: "Always on — you paid for these.", essential: true },
  { label: "Messages from hosts",               note: "As soon as a host replies.",      essential: false },
  { label: "Check-in reminders",                note: "The day before you travel.",      essential: false },
  { label: "Price drops on saved places",       note: "At most one a week.",             essential: false },
  { label: "News and offers",                   note: "Occasional. Off by default.",     essential: false },
];

export default function NotificationsSection() {
  return (
    <section className="page-container account-page">
      <PageHeading
        title="Notifications"
        lede="Choose what reaches you. Anything about a booking you have paid for stays on."
      />

      <Panel title="Email and SMS">
        {SETTINGS.map((setting) => (
          <div className="notify-row" key={setting.label}>
            <div>
              <p className="notify-row__label">{setting.label}</p>
              <p className="notify-row__note">{setting.note}</p>
            </div>
            <input
              className="notify-row__toggle"
              type="checkbox"
              defaultChecked={setting.essential || setting.label !== "News and offers"}
              disabled={setting.essential}
              aria-label={setting.label}
            />
          </div>
        ))}
      </Panel>
    </section>
  );
}
