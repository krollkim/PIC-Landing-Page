import SectionWrapper from "@/components/ui/SectionWrapper";
import { Eyebrow, H2, Body } from "@/components/ui/Typography";

/**
 * About — "We are building the operating system for live events."
 * STATUS: PLACEHOLDER — awaiting Lead Architect approval of Hero before build.
 *
 * Planned content:
 *   Founder narrative in 3 paragraphs
 *   Key line: "PIC is not a marketplace. It is infrastructure."
 */
export default function About() {
  return (
    <SectionWrapper id="about" bg="bg-white">
      <Eyebrow>Who We Are</Eyebrow>
      <H2 className="mt-6">Coming Soon</H2>
      <Body className="mt-6 max-w-md">
        This section is a placeholder. Awaiting Hero approval.
      </Body>
    </SectionWrapper>
  );
}
