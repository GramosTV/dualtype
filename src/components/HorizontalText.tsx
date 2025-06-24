"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalText = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: "-140%",
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "bottom bottom",
        end: "130% top",
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill()); // Cleanup
  }, []);

  return (
    <div className="overflow-hidden border-y-4 my-[7vh]">
      <div ref={ref} className="h-[25vh] flex items-center border-y-2">
        <div className="flex items-center w-fit">
          <div className="text-[10vw] tracking-[-0.7vw] w-[99vw] uppercase whitespace-nowrap">
          POSTER -- 2025 © PEOPLE
          BEST GRAPHIC  POSTER 2025 © PEOPLE
          BEST GRAPHIC 
          BEST GRAPHIC  POSTER 2025 © PEOPLE
          BEST GRAPHIC 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalText;
