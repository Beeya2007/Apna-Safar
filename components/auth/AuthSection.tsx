/* ============================================================
   SIGN IN / SIGN UP — one phone number, one code. The same
   screen does both jobs; only the wording changes.
   Styles live in: styles/pages/auth.css
   ============================================================ */

"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthSection({ mode }: { mode: "signin" | "signup" }) {
  const [sent, setSent] = useState(false);
  const isNew = mode === "signup";

  return (
    <section className="page-container auth">
      <div className="auth__card">
        <h1 className="auth__title">
          {isNew ? "Create an account" : "Sign in"}
        </h1>
        <p className="auth__lede">
          {isNew
            ? "One phone number is all we need. No password to forget."
            : "Enter your number and we will text you a code."}
        </p>

        {!sent ? (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {isNew && (
              <label className="field auth__field">
                <span className="field__label">Your name</span>
                <input className="field__input" required placeholder="Palak" />
              </label>
            )}

            <label className="field auth__field">
              <span className="field__label">Phone number</span>
              <input className="field__input" type="tel" required placeholder="10 digits" />
            </label>

            <button className="button button--primary button--large button--full" type="submit">
              Send me a code
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="field auth__field">
              <span className="field__label">The six digits we just sent</span>
              <input className="field__input type-numeric" inputMode="numeric"
                placeholder="000000" maxLength={6} />
            </label>
            <Link href="/account" className="button button--primary button--large button--full">
              {isNew ? "Create my account" : "Sign in"}
            </Link>
            <button className="auth__resend" type="button" onClick={() => setSent(false)}>
              Use a different number
            </button>
          </form>
        )}

        <p className="auth__switch">
          {isNew ? (
            <>Already have an account? <Link href="/signin">Sign in</Link></>
          ) : (
            <>New here? <Link href="/signup">Create an account</Link></>
          )}
        </p>

        <p className="auth__legal">
          By continuing you agree to our <Link href="/legal/terms">terms</Link> and{" "}
          <Link href="/legal/privacy">privacy policy</Link>.
        </p>
      </div>
    </section>
  );
}
