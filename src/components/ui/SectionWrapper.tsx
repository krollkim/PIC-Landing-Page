import { ReactNode } from "react";

interface SectionWrapperProps {
  children:        ReactNode;
  id?:             string;
  bg?:             string;
  className?:      string;
  innerClassName?: string;
}

/**
 * SectionWrapper
 *
 * Two-layer centering guarantee:
 *   Layer 1 — <section> uses flex justify-center (centers the inner column horizontally)
 *   Layer 2 — inner <div> uses flex flex-col items-center text-center (centers children + text)
 *
 * Spacing: py-48 (192px) / md:py-64 (256px)
 * Column:  max-w-4xl (896px)
 */
export default function SectionWrapper({
  children,
  id,
  bg = "bg-white",
  className = "",
  innerClassName = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full ${bg} py-48 md:py-64 px-6 flex justify-center ${className}`}
    >
      <div className={`w-full max-w-4xl flex flex-col items-center text-center ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
