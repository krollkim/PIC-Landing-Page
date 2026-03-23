import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import TransitionBar  from "@/components/TransitionBar";
import Solution       from "@/components/Solution";
import UniqueValue    from "@/components/UniqueValue";
import Process        from "@/components/Process";
import LeadCapture    from "@/components/LeadCapture";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <>
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
    </>
  );
}
