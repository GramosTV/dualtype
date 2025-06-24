"use client";
import React, { useEffect, useRef } from "react";
import Instruction from "./Instruction";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Specifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const insideTextRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // Make sure the DOM elements are available
    if (!containerRef.current || !textRef.current || !insideTextRef.current) return;

    // Create the scroll trigger for the text pinning
    // const scrollTrigger = ScrollTrigger.create({
    //   trigger: containerRef.current,
    //   start: "center center", // Start when the container's top hits the center of viewport
    //   end: "bottom center", // End when the container's bottom hits the top of viewport
    //   pin: textRef.current,
    //   pinSpacing: false, // Prevents ScrollTrigger from adding extra space
    //   markers: process.env.NODE_ENV === 'development', // Only show markers in development
    // });

    // Set up animation for the main text container
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "top top",
        scrub: 1,
        markers: process.env.NODE_ENV === "development", // Only show markers in development
      },
      top: "110%", // Move the text up by 100% of the viewport height
      ease: "none",
    });

    // Set up animation for the inside text that will toggle based on scroll direction
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom center",
      end: "bottom top",
      scrub: 1,
      onEnter: () => {
        gsap.to(insideTextRef.current, {
          translateY: "-50%",
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(insideTextRef.current, {
          translateY: "0%",
          duration: 0.3,
        });
      },
    });

    // Optional: Clean up the ScrollTrigger instance when component unmounts
    // return () => {
    //   scrollTrigger.kill();
    // };

    // Clean up the ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex   border-[0.5px] border-[#ffffff30]   bo h-fit w-full"
    >
      <div className="w-[50%] relative ">
        <h1
          ref={textRef}
          id="scrollingtext"
          className="uppercase overflow-hidden absolute top-0 h-[15%]  tracking-tighter ml-[3vw] font-bold"
        ><div
        ref={insideTextRef} className="h-fit">
          <div className="">about me</div>
          <div>reviews</div>
          </div>
        </h1>
      </div>
      <div className="w-[70%] ">
        <Instruction></Instruction>
      </div>
    </div>
  );
};

export default Specifications;
