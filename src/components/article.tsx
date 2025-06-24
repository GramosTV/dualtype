"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ArticleProps {
  img: string;
  desc: string;
  title: string;
} // hover clippath

const Article: React.FC<ArticleProps> = ({ img, desc, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none none",
      },

      ease: "none",
      y: "10vh",
    });
  }, []);

  return (

    <div style={{clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 70%, 100% 100%, 5% 100%, 0 95%, 0% 30%);"}} className="w-full rounded-[16px]    bg-slate-500 overflow-hidden h-fit article relative ">
     <div className="absolute  top-0 text-[5vh] z-[10] opacity-40 capitalize p-[1.8vw]">({title[1]})</div>
    <div className="w-full h-full absolute   z-[10] bg-gradient-to-t from-black/80 to-transparent"></div>
     
      <div ref={ref} className="mt-[-10vh]">
        <Image
          src={img}
          className="object-cover s rounded-[16px] w-full resize-none h-[65vh] articlezoom"
          alt={title}
          width={1000}
          height={1000}
        />
      </div>
      <div className="absolute flex flex-col w-[79%]  md:gap-1 p-[3vw] md:p-[1.8vw] gap-[3vh]  bottom-0 z-[10]">
        <div className="text-title w-[86%] tracking-tighter">{title}</div>
        <p className="text-desc ppercase tracking-tighter">{desc}</p>
      </div>
    </div>
  );
};

export default Article;
