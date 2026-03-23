import { Layers, Clock, MessageSquareX } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Eyebrow, H2 } from "@/components/ui/Typography";

const problems = [
  {
    Icon: Layers,
    title: "Fragmented vendor management",
    body: "Producers juggle dozens of unconnected suppliers across email, WhatsApp, and spreadsheets - with no single view of what is confirmed or still outstanding.",
  },
  {
    Icon: Clock,
    title: "Hours lost to back-and-forth",
    body: "Sourcing quotes, chasing confirmations, and re-sending briefs eats up time that should go into the event itself. Every hour spent on admin is an hour not spent on quality.",
  },
  {
    Icon: MessageSquareX,
    title: "No source of truth",
    body: "Logistics, timelines, and contracts live in silos. When something breaks, no one knows who owns the problem - and the event suffers the cost.",
  },
];

export default function Problem() {
  return (
    <SectionWrapper id="problem" bg="bg-white">

      {/* Section header */}
      <div className="flex flex-col items-center gap-6">
        <Eyebrow>The Problem</Eyebrow>
        <H2>The Chaos of Event Production</H2>
      </div>

      {/* Problem list - centered container, left-aligned items */}
      <ul className="w-full max-w-lg flex flex-col gap-10 mt-16">
        {problems.map(({ Icon, title, body }) => (
          <li key={title} className="flex items-start gap-5 text-left">

            {/* Icon badge */}
            <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
              <Icon size={18} strokeWidth={1.5} className="text-navy" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1.5">
              <p className="font-body font-semibold text-navy text-[0.95rem] leading-snug">
                {title}
              </p>
              <p className="font-body text-gray-400 text-sm leading-loose">
                {body}
              </p>
            </div>

          </li>
        ))}
      </ul>

    </SectionWrapper>
  );
}
