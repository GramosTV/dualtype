"use client";
import React, { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CleanAppearProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number; // How much of the element needs to be visible (0-1)
}

const CleanAppear: React.FC<CleanAppearProps> = ({ 
  children, 
  className, 
  delay = .3,
  threshold = 0.2 // Default - element appears when 20% visible
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    // Create animation context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(contentRef.current, {
        translateY: "100%"
      });
      
      gsap.set(containerRef.current, {
        translateY: "0%"
      });
      
      // Create animation timeline
      const tl = gsap.timeline({
        paused: true,
        delay: delay,
      });
      
      // Add animations to timeline
      tl.to(contentRef.current, {
        translateY: "0%",
        duration: 0.9,
        ease: "power3.out",
      });
      
      // Create ScrollTrigger with markers for debugging
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "top 85%",
        toggleActions: "restart none none reverse", // Play when entering, reset when leaving
     
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
        
      });
    }, containerRef); // Scope the context to the container
    
    // Return the context's cleanup function
    return () => ctx.revert();
  }, [delay, threshold]);
  
  return (
    <div
      ref={containerRef}
      style={{ willChange: "transform" }}
      className={`overflow-hidden  px-1  h-fit  leading-[85%] `}
    >
      <div 
        ref={contentRef} 
        className={`${className} `}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
};

export default CleanAppear;
