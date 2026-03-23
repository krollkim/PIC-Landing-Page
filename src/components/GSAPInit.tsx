"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Prevent ScrollTrigger from recalculating on every Safari address-bar resize
ScrollTrigger.config({ ignoreMobileResize: true });

export default function GSAPInit() {
  useEffect(() => {
    // Refresh after first paint so all trigger positions are accurate
    ScrollTrigger.refresh();
  }, []);

  return null;
}
