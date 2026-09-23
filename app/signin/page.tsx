/* ============================================================
   SIGN IN PAGE  —  shown at  /signin
   Styles: styles/pages/auth.css
   ============================================================ */

import AuthSection from "@/components/auth/AuthSection";

export default function SignInPage() {
  return (
    /* SIGN IN — phone number, then a code */
    <AuthSection mode="signin" />
  );
}
