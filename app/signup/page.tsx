/* ============================================================
   SIGN UP PAGE  —  shown at  /signup
   Styles: styles/pages/auth.css
   ============================================================ */

import AuthSection from "@/components/auth/AuthSection";

export default function SignUpPage() {
  return (
    /* SIGN UP — name, phone number, then a code */
    <AuthSection mode="signup" />
  );
}
