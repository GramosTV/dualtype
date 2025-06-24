"use client";
import Navbar from "@/components/Navbar";
const Header = React.lazy(() => import("@/components/Header"));
import { Suspense } from "react";
import gsap from "gsap";
import Features from "@/components/Features";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Presentation from "@/components/Presentation";
import ScrollTrigger from "gsap/src/ScrollTrigger";

import useLenisScroll from "@/components/Lenis";
import Article from "@/components/article";

import Bottombar from "@/components/Bottombar";

import Rotation from "@/components/Rotation";

import Reviews from "@/components/Reviews"; 
import Specifications from "@/components/Specifications";

import FromOrder from "@/components/FromOrder";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine if it's a mobile device
    setIsMobile(window.innerWidth < 768);

    // Lock the scroll and set initial properties when page is loading
    document.body.style.cursor = "default";
    window.scrollTo(0, 0);

    // Unlock after the loading time has completed (1000ms here)
    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 1000);

    // Cleanup: revert styles to normal
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "default";
    };
  }, []);

  // Apply Lenis scroll only if not mobile
  useLenisScroll(isLoading && !isMobile);

  return (
    <div
      id="thecontainer"
      ref={scrollRef}
      className="h-fit overflow-y-hidden  x  w-full flex items-center flex-col "
    >
  
      <Frame/>

      <div className=" bg-black w-full   z-[110000]    h-[15vw] ] bottom-[0vh] opacity-85  translate-y-[70%] fixed blur-[40px]"></div>
      <Navbar />
      <Bottombar></Bottombar>
      <div className="absolute  h-[100vh]"></div>

      <div className="bg-white opacity-40 w-[50vw] h-[15vw] z-[-10] top-[-30vh] left-[25vw] absolute blur-[344px]"></div>
      <div className="bg-white  opacity-50  w-[15vw] h-[15vw] z-[-10] bottom-0 left-[0vw] absolute blur-[344px]"></div>
      <div className="bg-white  opacity-50  w-[15vw] h-[15vw] z-[-10] bottom-0 right-[0vw] absolute blur-[344px]"></div>
      <Suspense fallback={<p>loading</p>}>
        <Header />
      </Suspense>

      <div>
       
        <Features></Features>

        <div className="w-[87vw]    gap-[3vw] my-[10vh] h-[90vh] md:h-[50vh] flex-col md:flex-row flex justify-between">
          <Article
            title="made with precission
 and thought"
            desc="Probably my favorite page I used to avoid this kind."
            img="/img/article1.png"
          />

          <Article
            title="Keycaps quality is the best always "
            desc="Probably my favorite page I used to avoid this kind."
            img="/img/article2.png"
          />
        </div>
      </div>

      {/* <HorizontalText></HorizontalText> */}

      <Presentation />
      <div></div>

      <div className="h-fit w-full mt-[-15%] ">
  
     <FromOrder></FromOrder>
         <div className="mb-[10vh]"></div>
        <Rotation></Rotation>
      </div>

      
      <div className=" w-full flex items-start px-[3vw] justify-between mb-[4vh]">
   
  
      </div>

 

      <Specifications/>

   
     
      <Reviews></Reviews>
  <Footer></Footer>
    </div>
  );
}
