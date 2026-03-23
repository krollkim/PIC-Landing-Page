import { ReactNode } from "react";

interface TypoProps {
  children:   ReactNode;
  className?: string;
}

export function H1({ children, className = "" }: TypoProps) {
  return (
    <h1 className={`font-display font-bold text-navy uppercase tracking-tighter leading-none text-[5rem] md:text-[8rem] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: TypoProps) {
  return (
    <h2 className={`font-display font-bold text-navy uppercase tracking-tight leading-[1.05] text-[2rem] md:text-[3.2rem] ${className}`}>
      {children}
    </h2>
  );
}

export function Eyebrow({ children, className = "" }: TypoProps) {
  return (
    <span className={`font-body text-xs font-semibold text-navy uppercase tracking-[0.2em] ${className}`}>
      {children}
    </span>
  );
}

export function Body({ children, className = "" }: TypoProps) {
  return (
    <p className={`font-body text-gray-400 text-base leading-loose ${className}`}>
      {children}
    </p>
  );
}
