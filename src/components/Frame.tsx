"use client";
import React from "react";
import Corner from "../../public/svg/Corner";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useEffect, useState } from "react";
const Frame = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 0) {
      gsap.to("#frame", {
        y: scrollY,
        ease: "power2.out",
        duration: 0.5,
      });
    }
  }, [scrollY]);

  return (
    <>
      <div
        id="frame"
        className="w-[95vw] z-[100010] pointer-events-none absolute flex flex-col justify-between  bottom-[5vh] h-[85vh]"
      >
        {/* <div className="absolute left-[5vw]  text-[10px] opacity-45 top-[0vh]">SCROLL {((scrollY / window.innerHeight) * 100).toFixed(1) + "%"}</div> */}

        <div className=" flex w-full justify-between">
          <div className="rotate-[-90deg]">
            <Corner></Corner>
          </div>
          <div></div>
          <Corner></Corner>
        </div>

        <div className=" rotate-[-180deg]  flex w-full justify-between">
          <div className="rotate-[-90deg]">
            <Corner></Corner>
          </div>
          <Corner></Corner>
        </div>
      </div>
    </>
  );
};

export default Frame;
