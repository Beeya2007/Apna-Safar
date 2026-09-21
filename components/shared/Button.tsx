/* ============================================================
   BUTTON — reusable button used across the whole app.
   Styles live in: styles/components/button.css
   ============================================================ */

type ButtonProps = {
  children: React.ReactNode;
  /** Which look to use. Default is the filled pink "primary". */
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  /** Stretch to fill the width of whatever contains it */
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  // Build the list of CSS classes based on the options passed in
  const classes = [
    "button",
    `button--${variant}`,
    size !== "medium" ? `button--${size}` : "",
    fullWidth ? "button--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
