import type { Metadata } from "next";
import AccessibilityContent from "@/components/AccessibilityContent";

export const metadata: Metadata = {
  title: "Accessibility Statement - PIC Platform | הצהרת נגישות",
  description:
    "PIC Platform accessibility statement. This website meets the requirements of Israeli Standard 5568 (based on WCAG 2.1) at level AA. " +
    "הצהרת הנגישות של פלטפורמת PIC. האתר עומד בדרישות התקן הישראלי 5568 ברמה AA.",
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
