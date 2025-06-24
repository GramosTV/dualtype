"use client";
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import ThreeScene from "./ThreeScene";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GiCurlyWing } from "react-icons/gi";

import Blurout from "./Blurout";
import Image from "next/image";
import Tag from "./tag";
import HorizontalText from "./HorizontalText";
import Switches from "./switches";
import CleanAppear from "./CleanAppear";
import StaggerBlurOut from "./StaggerBlurOut";

// Available colors for the keyboard and board
const COLORS = ["#0d1b2a", "#282828", "#8C8C8C", "#FF4D00", "#FF3D27"];
// Define multiple color palettes as arrays of arrays
const EXTENDEDCOLORS = [
  ["#1e293b", "#334155", "#64748b", "#f59e0b"], // Dark blue to red palette
  ["#0d1b2a", "#282828", "#8C8C8C", "#FF4D00"], // Dark to orange palette
  ["#064e3b", "#065f46", "#047857", "#10b981"], // Green palette
  ["#312e81", "#4338ca", "#6366f1"], // Indigo palette
  ["#831843", "#9d174d"], // Pink palette
];

const Presentation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const compatibleRef = useRef<HTMLDivElement>(null);
  const colorSwatchesRef = useRef<HTMLDivElement>(null);
  const [isRandom, setIsRandom] = useState(false);
  const [color, setColor] = useState("#282828");
  const [temporaryColor, setTemporaryColor] = useState<string | null>(null);
  const [hover, setHover] = useState(true);
  const [colorBoard, setColorBoard] = useState("#282828");
  const [temporaryColorBoard, setTemporaryColorBoard] = useState<string | null>(
    null
  );

  // Function to handle actual color selection - optimized with useCallback
  const pickColor = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsRandom(false);
    if (hover === true) {
      setColorBoard((e.target as HTMLDivElement).id);
    } else {
      setColor((e.target as HTMLDivElement).id);
    }
  }, [hover]);

  // Handle color hover preview effect - optimized with useCallback
  const handleColorHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsRandom(false);
    const colorId = (e.target as HTMLDivElement).id;
    if (hover === true) {
      setTemporaryColorBoard(colorId);
    } else {
      setTemporaryColor(colorId);
    }
  }, [hover]);

  // Reset temporary color when mouse leaves - optimized with useCallback
  const handleColorLeave = useCallback(() => {
    setTemporaryColor(null);
    setTemporaryColorBoard(null);
  }, []);

  // Setup hover animations for all color swatches
  useEffect(() => {
    // Register GSAP plugins inside useEffect
    gsap.registerPlugin(ScrollTrigger);
    
    if (!colorSwatchesRef.current) return;

    // Initialize all extended colors as hidden
    gsap.set(".extendedcolor", {
      opacity: 0,
      filter: "blur(20px)",
      y: 20,
    });

    // Get all color swatches
    const swatches = colorSwatchesRef.current.querySelectorAll(".color-swatch");

    if (swatches.length === 0) return;

    // Create and store event handlers for cleanup
    const handlers: { [key: string]: { [key: string]: EventListener } } = {};

    // Setup animations for each swatch
    swatches.forEach((swatch, index) => {
      // Get the matching palette of extended colors
      const targetedExtendedColors = document.querySelectorAll(
        `#palette-${index} .extendedcolor`
      );

      // Create hover-in animation
      const handleMouseEnter = () => {
        gsap.to(targetedExtendedColors, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
      };

      // Create hover-out animation
      const handleMouseLeave = () => {
        gsap.to(targetedExtendedColors, {});
      };

      // Store handlers for cleanup
      handlers[index] = {
        enter: handleMouseEnter as EventListener,
        leave: handleMouseLeave as EventListener,
      };

      // Add event listeners
      swatch.addEventListener("mouseenter", handlers[index].enter);
      swatch.addEventListener("mouseleave", handlers[index].leave);
    });

    // Cleanup function
    return () => {
      swatches.forEach((swatch, index) => {
        if (handlers[index]) {
          swatch.removeEventListener("mouseenter", handlers[index].enter);
          swatch.removeEventListener("mouseleave", handlers[index].leave);
        }
      });
    };
  }, []);

  // Random color interval effect
  useEffect(() => {
    if (!isRandom) return;
    
    const colorInterval = setInterval(() => {
      const newRandomIndex = Math.floor(Math.random() * COLORS.length);
      const newRandomIndex2 = Math.floor(Math.random() * COLORS.length);
      setColor(COLORS[newRandomIndex]);
      setColorBoard(COLORS[newRandomIndex2]);
    }, 1000);
    
    return () => clearInterval(colorInterval);
  }, [isRandom]);

  // Main animation setup
  useEffect(() => {
    if (
      !container.current ||
      !ref.current ||
      !text.current ||
      !compatibleRef.current
    )
      return;

    // "Compatible" section animation
    gsap.to("#compatible", {
      scrollTrigger: {
        trigger: "#compatible",
        start: "top center",
        end: "top bottom",
        scrub: 1,
      },
      ease: "power2.inOut",
      duration: 0.1,
      onComplete: () => {
        setIsRandom(true);
      },
    });

    // Circle clip path animation
    gsap.set("#circle", {
      clipPath: "ellipse(43% 0% at 50% 49%)",
    });

    gsap.to("#circle", {
      scrollTrigger: {
        trigger: "#circle",
        start: "top bottom",
        end: "center center",
        scrub: 1,
      },
      ease: "power2.inOut",
      clipPath: "ellipse(43% 6% at 50% 67%)",
    });

    // Main scroll animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(ref.current, {
      y: "-20%",
      ease: "power1.out",
    });
    gsap.set("#blur-section", {
      filter: "blur(100px)",
      scale: 0.95,
    });
    gsap.from("#blur-section", {
      filter: "blur(100px)",
      scale: 0.95,
    });
    gsap.to("#blur-section", {
      scrollTrigger: {
        trigger: "#blur-section",
        start: "top bottom",
        end: "center bottom",
        scrub: 1,
      },
      scale: 0.99,
      filter: "blur(0px)",
    });

    gsap.to("#blur-section", {
      scrollTrigger: {
        trigger: "#blur-section",
        start: "center center",
        end: "bottom center",
        scrub: 1,
      },
      ease: "power2.inOut",
      duration: 0.1,
      scale: 0.8,
    });

    tl.to(
      "#bgcircle",
      {
        width: "50vw",
        opacity: 0.1,
        height: "50vw",
      },
      "<"
    );

    tl.to(
      "#con",
      {
        marginTop: "0",
      },
      "<"
    );

    tl.to(
      "#compatible",
      {
        y: "-100%",
      },
      "<"
    );

    tl.to(
      text.current,
      {
        opacity: 0.7,
        y: "-20%",
        scale: 0.9,
        filter: "blur(34px)",
      },
      "<"
    );
    
    gsap.set("#workplace", { height: "0px", skewY: "-10deg" });
    gsap.to("#workplace", {
      scrollTrigger: {
        trigger: "#workplacecon",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      duration: 0.5,
      height: "100%",
      skewY: "0deg",
    });

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Memoize active colors to avoid unnecessary re-renders
  const activeColor = useMemo(() => temporaryColor || color, [temporaryColor, color]);
  const activeColorBoard = useMemo(() => temporaryColorBoard || colorBoard, [temporaryColorBoard, colorBoard]);

  // Memoize the ThreeScene component to prevent unnecessary re-renders
  const memoizedThreeScene = useMemo(() => (
    <ThreeScene board={activeColorBoard} color={activeColor} />
  ), [activeColorBoard, activeColor]);

  // Memoize color swatches to prevent unnecessary re-renders
  const colorSwatches = useMemo(() => (
    COLORS.map((item, i) => (
      <div
        className="w-fit relative pt-[2px] px-[2px] group"
        key={`color-wrapper-${i}`}
      >
        <div
          className={`w-[2.5vw] thecolor hover:scale-[60%] transform duration-300 h-[2.5vw] rounded-[3px] cursor-pointer color-swatch ${
            i === 0 ? "first-swatch" : ""
          }`}
          id={item}
          data-index={i}
          key={`coloring-${i}`}
          onClick={pickColor}
          onMouseEnter={handleColorHover}
          onMouseLeave={handleColorLeave}
          style={{
            backgroundColor: item,
            clipPath:
              "polygon(0 0, 95% 0, 100% 15%, 100% 100%, 100% 100%, 10% 100%, 0 80%, 0 0)",
          }}
          aria-label={`Select color ${item}`}
        ></div>
      </div>
    ))
  ), [pickColor, handleColorHover, handleColorLeave]);

  // Memoize extended color palettes to prevent unnecessary re-renders
  const extendedColorPalettes = useMemo(() => (
    EXTENDEDCOLORS.map((ex, it) => (
      <div
        key={`palette-${it}`}
        id={`palette-${it}`}
        aria-label={`Select color ${ex}`}
      >
        {ex.map((e, idx) => (
          <div
            key={`group-${it}-${idx}`}
            className="grouped p-[2px] hover:scale-75 duration-300 h-[2.5vw] cursor-pointer"
          >
            <div
              key={`color-${it}-${idx}skibidi`}
              id={`color-${it}-${idx}papa`}
              style={{
                // Only apply initial hidden style to palette-0
                ...(it === 0
                  ? {
                      opacity: 0,
                      transform: "translateY(20px)",
                    }
                  : {}),
              }}
              className="w-[2.5vw] extendedcolor transform duration-100 ease-out h-[2.5vw] rounded-[3px]"
            >
              <div
                key={`color-${it}-${idx}`}
                id={e}
                onClick={pickColor}
                onMouseEnter={handleColorHover}
                onMouseLeave={handleColorLeave}
                style={{
                  backgroundColor: e,
                  clipPath:
                    "polygon(0 0, 95% 0, 100% 15%, 100% 100%, 100% 100%, 10% 100%, 0 80%, 0 0)",
                }}
                className="w-[2.5vw] h-[2.5vw] rounded-[3px]"
              ></div>
            </div>
          </div>
        ))}
      </div>
    ))
  ), [pickColor, handleColorHover, handleColorLeave]);

  // Helper function for hover state changes (memoized)
  const handleHoverChange = useCallback((value: boolean) => () => setHover(value), []);

  return (
    <div className=" ">
      <div
        ref={container}
        id="scroll-container"
        className="flex flex-col items-center justify-start z-[] relative w-full h-[190vh]"
      >
        {" "}
        <div
          id="workplacecon"
          className="h-[70vh] absolute bottom-[35vh] w-[35vw]  mr-[5vw] "
        >
          <div
            id="workplace"
            className=" h-0 rounded-2xl bg-[#b6b6b610] backdrop-blur-md border-[#ffffff1a] border-[1px] border-dashed "
          ></div>
        </div>
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="filter  opacity-[15%] w-[50vw] h-[35vw] z-[-10] bottom-[10vh] ] absolute blur-[284px]"
        ></div>
        <div
          id="compatible"
          ref={compatibleRef}
          style={{
            clipPath:
              " polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)",
          }}
          className="absolute top-[59vh]   w-[15vw] left-[40.8vw]"
        >
          {/* <div className=" w-fit p-[20px]">
            <div className="text-[14px] opacity-55 font-mono  mb-[1vh]">
              [Highly Compatible]
            </div>
            <div className="text-[18px]dsa leading-[110%] mb-[2vh]">
              Our clients are our top priority we&apos;re always here for you to
              deliver the best experience.
            </div>
            <div className="flex gap-[1vw]">
              <div className="scale-[2]">
                <DiApple />
              </div>
              <div className="scale-[1.8]">
                <DiAndroid />
              </div>
              <div className="scale-[1.8]">
                <FaWindows />
              </div>
            </div>
          </div> */}
        </div>
        <div className="bg-white z-[100] opacity-20 w-[90vw] rounded-full mt-[10vh] h-[15vw]  top-[-10vh] absolute blur-[224px]"></div>
        <Blurout>
          <div className="text-[1.2vw] my-[3vh] underline flex gap-2 ">
            <GiCurlyWing className="scale-[1.1] z-[10000000000]" />
            Sold on Etsy
            <GiCurlyWing className="transform scale-[1.1] scale-x-[-1]" />
          </div>
        </Blurout>
        <div
          style={{ backgroundColor: colorBoard }}
          className="opacity-50 w-[18vw] rounded-full h-[18vw] bottom-[15vh] left-0 z-[1000000000000000] text-right absolute blur-[284px]"
        ></div>
        <div className=" opacity-30 bg-[#e8e4da] w-[18vw] rounded-full h-[18vw] bottom-[15vh] right-0 z-[1000000000000000] text-right absolute blur-[134px]"></div>
        <Blurout>
          <div ref={text}>
            <div className="text-center uppercase bg font-bold leading-[90%] gradient-text text-[11.5vw] tracking-[-0.7vw]">
              custom <br />
              Experience
            </div>
            <div>Designed in Poland</div>
            <div className="opacity-60">52°13′48″N, 21°0040″E</div>
          </div>
        </Blurout>
        <div
          id="con"
          className="w-[100%] h-[200vh] z-[1000] flex flex-col items-center justify-center absolute"
        ></div>
        <div className="z-[-10000] mt-[50vh] opacity-35 blur-[8px]  absolute">
          <HorizontalText></HorizontalText>
        </div>
        <div
          id="threescene"
          ref={ref}
          className="mt-[-33vh] w-[80vw] h-[180vh]  flex items-start justify-center"
        >
          {memoizedThreeScene}
        </div>
        <div className="h-[100vh] relative flex w-[90vw] justify-center items-center mt-[-100vh]">
          <div className="absolute top-0 gap-[3vh] text-[60px] flex-col tracking-tighter leading-[100%] left-0">
            <div className="text-[20px] leading-none tracking-tighter">
              <div className="leading-none text-[14px] mb-[1vh] opacity-50">
                (Keyboard)
              </div>
            </div>

            <div className="flex  flex-col text-[3.1vw] leading-[90%] tracking-tighter w-[30vw]">
              <div className="mb-[1vh]">
                <CleanAppear>Perfect Keyboard</CleanAppear>{" "}
                <CleanAppear> Justified For You</CleanAppear>
              </div>

              <div className="flex">
                <div className="flex flex-col item justify-center relative  text-[24px] w-fit tracking-tighter">
                  <div className="flex mb-[1.5vh] items-center gap-2">
                    {" "}
                    <div className=" relative h-fit  w-fit ">
                      {" "}
                      <div className=" absolute flex w-full  h-full opacity-50 overflow-hidden z-[10000]">
                        <div
                          onMouseEnter={handleHoverChange(true)}
                          onMouseLeave={handleHoverChange(true)}
                          className=" h-[10vh] w-full z-[100000] "
                        ></div>
                        <div
                          onMouseEnter={handleHoverChange(false)}
                          onMouseLeave={handleHoverChange(false)}
                          className="b  h-[10vh] w-full z-[100000]"
                        ></div>
                      </div>
                      <Switches value={hover} />
                    </div>{" "}
                  </div>

                  <div className=" h-fit flex w-fit z-[1111] items-center flex-row-reverse">
                    <div ref={colorSwatchesRef} className="w-fit flex ">
                      {colorSwatches}
                      <div className="flex w-fit gap-3"></div>
                    </div>
                  </div>

                  <div className="flex z-[10000]">
                    {extendedColorPalettes}
                  </div>
                  <div className="text-[14px] opacity-40 tracking-tight ">
                    (Unlimited Color Options)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0  w-[25vw]  right-0">
            <div className="leading-none tracking-tighter text-[14px] mb-[1vh] opacity-50">
              (Keyboard)
            </div>

            <div className="tracking-tighter leading-[100%] text-[2.2vw]">
              <CleanAppear> Your Dream Keyboard has</CleanAppear>
              <div className="flex gap-2  items-center">
                <div
                  style={{
                    backgroundColor: color,
                    clipPath:
                      " polygon(0 0, 95% 0, 100% 15%, 100% 100%, 100% 100%, 10% 100%, 0 80%, 0 0)",
                  }}
                  className="w-[1.5vw]   h-[1.5vw]"
                >
                  {" "}
                </div>{" "}
                <CleanAppear> Board & </CleanAppear>
                <div
                  style={{
                    backgroundColor: colorBoard,
                    clipPath:
                      " polygon(0 0, 95% 0, 100% 15%, 100% 100%, 100% 100%, 10% 100%, 0 80%, 0 0)",
                  }}
                  className="w-[1.5vw]  h-[1.5vw]"
                >
                  {" "}
                </div>
                <CleanAppear>Keycaps.</CleanAppear>{" "}
              </div>
            </div>

            <div >
              <StaggerBlurOut className="flex gap-[0.5vw] mt-[2vh] flex-wrap w-[25vw]">
                <Tag color="bg-[#212121]">Manufactured in Poland</Tag>
                <Tag color="bg-[#212121]">Cable length: 2(m)</Tag>
                <Tag color="bg-[#212121]">SoundProof: on</Tag>
                <Tag keycaps={color} color="bg-[#212121]">
                  Keycaps: Red
                </Tag>
                <Tag board={colorBoard} color="bg-[#212121]">
                  Board: Yellow
                </Tag>
              </StaggerBlurOut>
            </div>
          </div>

          <div className="blur-[12px]">
            <div
              id="circle"
              className=" w-[20vw] z-[-10] mt-[20vh] mr-[2vw] opacity-20 h-[20vw] bg-white"
              style={{ clipPath: "ellipse(43% 60% at 50% 49%)" }}
            ></div>
          </div>

          <div className=" absolute bottom-[50vh] mr-[0vw]  opacity-[5%] rotate-[90deg] z-[-10000]">
            <Image
              src={"/svg/Vector.svg"}
              width={1000}
              height={1000}
              alt="xx"
              className="w-[380vw]  z-[-10000000000] "
            />
          </div>

          {/* <div className="w-[97%]  z-[-10] opacity-30 h-[1px] bg-white absolute bottom-[50vh]"></div> */}
        </div>
        <div
          id="bgcircle"
          className="w-[5vw] h-[5vw] absolute bottom-[30vh]   mr-[3vw] opacity-10  z-[-10] border-2 border-white rounded-full"
        ></div>
      </div>
      <div></div>
   
    </div>
  );
};

export default Presentation;



