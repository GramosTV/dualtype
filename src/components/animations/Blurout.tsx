"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DownsideAppearProps {
  children?: ReactNode;
  delay?: number;
}

const Blurout: React.FC<DownsideAppearProps> = ({ children, delay }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        leading: "0%",
        duration: 0.6,
        scale: 1,
        perspective: "550px",
        transformStyle: "preserve-3d",
        marginTop: "0vh",
        filter: "blur(0px)",
        ease: "power2.out",
        y: 0,
    
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{ perspective: "0px", transformStyle: "preserve-3d" }}
      className=" scale-50 w-fit p h-fit blur-[24px] translate-y-[30%] "
    >
      <div className="h-[120%]"> {children}</div>
    </div>
  );
};

export default Blurout;
