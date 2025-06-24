"use client";
import React, { ReactNode, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface DownsideAppearProps {
  children: ReactNode;
}

const DownsideAppear: React.FC<DownsideAppearProps> = ({ children }) => {
  const text = children?.toString() || " ";
  const myArray = text.split("  ");

  useEffect(() => {
    
    gsap.to(".hoe", {
      scrollTrigger: {
        trigger: "#mfcontasiner",
        start: "bottom bottom",
        end: "bottom center",
        scrub: true,
        toggleActions: "play none none none",
      },
      ease: "none",
      stagger: 0.1,
      filter: "blur(0px)",
      opacity: "100%",
    });
  }, []);

  return (
    <div className="relative">
    <div id="mfcontasiner" className="flex lettefcon">
      <div className="flex  ">
        {myArray.map((line, i) => (
          <div key={i} className="text-[12vw] md:text-[4.9vw]">
            <div className="flex md:w-[50vw] gap-x-[1.1vw] flex-wrap">
              {line.split(" ").map((word, n) => (
                <div className="flex" key={n}>
                  {word.split("").map((letter, l) => (
                    <div  key={l} className="text-white opacity-0   blur-sm tracking-tighter  y-10 hoe leading-[100%]">
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>
    {/* <div className="absolute  top-0">
    <div className=" opacity-[100%] flex lettefcon">
      <div className="flex">
        {myArray.map((line, i) => (
          <div key={i} className="text-[4.9vw]">
            <div className="flex w-[50vw] gap-x-[1.1vw] flex-wrap">
              {line.split(" ").map((word, n) => (
                <div className="flex" key={n}>
                  {word.split("").map((letter, l) => (
                    <div style={{ opacity: "10%" }} key={l} className="text-white blur-sm  tracking-tighter opacity-[50] y-10 leading-[100%]">
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>

    </div> */}
    </div>
  );
};

export default DownsideAppear;
