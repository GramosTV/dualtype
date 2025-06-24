'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Line } from '@/components/ui';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Inuse = () => {
  const containerRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const [lineLength, setLineLength] = useState(100);

  useEffect(() => {
    // Create a GSAP timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', // Start animation when top of container hits 80% from top of viewport
        end: 'bottom center', // End animation when bottom of container hits 20% from top of viewport
        scrub: 1, // Smooth scrubbing effect with 1 second delay
        markers: process.env.NODE_ENV === 'development', // Show markers only in development mode
        onUpdate: (self) => {
          // Calculate new line length based on scroll progress
          const newLength = 100 + 900 * self.progress;
          setLineLength(newLength);
        },
      },
    });

    // Add animations to the timeline
    tl.to(
      leftLineRef.current,
      {
        width: 100,
        duration: 1,
        ease: 'power2.in',
      },
      0
    );

    tl.to(
      rightLineRef.current,
      {
        width: 100,
        duration: 1,
        ease: 'power2.in',
      },
      0
    );

    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-fit flex items-start mt-[-60vh] justify-center" ref={containerRef}>
      <div className="w-full h-[100vh] mx-[12vw] flex justify-between items-center relative">
        <div className="h-fit transform rotate-45 origin-left" ref={leftLineRef}>
          <Line start={{ x: 0, y: 0 }} length={lineLength} thickness={1} color="white" />
        </div>

        <div className="h-fit transform rotate-[495deg] origin-left" ref={leftLineRef}>
          <Line start={{ x: 0, y: 0 }} length={lineLength} thickness={1} color="white" />
        </div>

        {/* Content section */}
      </div>
    </div>
  );
};

export default Inuse;
