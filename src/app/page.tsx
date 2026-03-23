import Navbar               from "@/components/Navbar";
import Hero                 from "@/components/Hero";
import TransitionBar        from "@/components/TransitionBar";
import Solution             from "@/components/Solution";
import UniqueValue          from "@/components/UniqueValue";
import Process              from "@/components/Process";
import LeadCapture          from "@/components/LeadCapture";
import Footer               from "@/components/Footer";
import AccessibilityWidget  from "@/components/AccessibilityWidget";
import GSAPInit             from "@/components/GSAPInit";

export default function Home() {
  return (
    <>
      <GSAPInit />
      <Navbar />
      <main>
        <Hero />
        <TransitionBar />
        <Solution />
        <UniqueValue />
        <Process />
        <LeadCapture />
      </main>
      <Footer />
      <AccessibilityWidget />
    </>
  );
}
