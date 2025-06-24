'use client';
import React, { useEffect, useRef, memo, useState } from 'react';
import { Button, Links } from '@/components/ui';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Bottombar: React.FC = () => {
  const bottombarRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect for initial loading state
  useEffect(() => {
    // Simulate content preloading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only set up animations when component is loaded
    if (!isLoaded || !bottombarRef.current || !innerRef.current || !footerRef.current) return;

    // Preload any images in the footer to prevent flashing during animation
    const preloadImages = () => {
      // Find all image elements within the footer
      const images = footerRef.current?.querySelectorAll('img') || [];
      images.forEach((img) => {
        const src = img.getAttribute('src');
        if (src) {
          const preloadImage = new Image();
          preloadImage.src = src;
        }
      });
    };
    preloadImages();

    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial styles to prevent flicker
      gsap.set(innerRef.current, { height: 'fit-content', display: 'flex' });
      gsap.set(footerRef.current, { display: 'none' });

      // Create the animation to expand the height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement, // Use documentElement for more reliable triggering
          start: '98% bottom', // Slightly before reaching bottom
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          markers: process.env.NODE_ENV === 'development', // Only in development
          once: false, // Allow repeated triggers
          onEnter: () => {
            // Add pointer-events when expanded
            if (bottombarRef.current) {
              bottombarRef.current.classList.remove('pointer-events-none');
              bottombarRef.current.classList.add('pointer-events-auto');
            }
          },
          onLeaveBack: () => {
            // Remove pointer-events when collapsed
            if (bottombarRef.current) {
              bottombarRef.current.classList.add('pointer-events-none');
              bottombarRef.current.classList.remove('pointer-events-auto');
            }
          },
        },
      });

      // Optimized timeline with proper easing
      tl.to(
        innerRef.current,
        {
          height: '88vh',
          alignItems: 'start',
          duration: 0.9,
          ease: 'power3.out',
        },
        0
      )
        .to(
          bottombarRef.current,
          {
            alignItems: 'start',
            duration: 0.9,
            ease: 'power3.out',
          },
          0
        )
        .to(
          footerRef.current,
          {
            display: 'block',
            opacity: 0,
            translateY: '-5%',
            duration: 0,
            filter: 'blur(15px)',
          },
          0
        )
        .to(
          footerRef.current,
          {
            opacity: 1,
            delay: 0.5,
            duration: 0.9,
            filter: 'blur(0px)',
            translateY: '0%',
            ease: 'power4.out',
          },
          0.2
        ); // Delay footer appearance for smoother effect
    }, bottombarRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      id="bottombar"
      ref={bottombarRef}
      className={`h-fit pointer-events-none fixed bottom-0 z-[10000000] flex w-full items-end justify-center transition-opacity ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={innerRef}
        className="bottombar-inner w-[90%] mb-[2vh] border-[1px] border-[#ffffff40] bg-[#0c0c0c3c] backdrop-blur-[50px] p-6 px-10 rounded-[9px] h-fit items-start justify-center bottom-0 flex-col"
      >
        <div className="z-[110000] w-full items-center flex justify-between">
          <h2 className="text-upheader">handmade keyboards</h2>
          <div className="leading-[110%] uppercase md:block hidden text-[12px] text-desc opacity-50">
            Probably my favorite page. <br />I used to avoid this kind of{' '}
          </div>
          <div className="md:hidden block bg-white text-black p-2">Creator</div>
          <div className="md:block hidden scale-90">
            <Button src="/assets/icons/anarrow.svg">Chose your model</Button>
          </div>
          <div className="leading-[110%] md:block hidden text-sm">
            <div>ECSPLITS</div>
            <div className="opacity-50">(AVILABLE)</div>
          </div>
        </div>
        <div ref={footerRef} className="bottom-footer hidden w-full">
          <div className="w-full h-[68vh] mt-[11vh] justify-between flex">
            <div id="col1" className="h-full flex flex-col justify-between">
              <div className="">
                <h1 className="font-bold uppercase text-[4vw] leading-[100%]">
                  Custom handmade <br /> your experience.
                </h1>
                <div className=" text-[.8vw] pt-8  font-bold uppercase">
                  © {new Date().getFullYear()} ECSPLITS. All rights reserved.
                </div>
              </div>
              <div className="flex gap-[3vw]">
                <div className="flex flex-col gap-[.2vw]">
                  <div className="font-bold text-[20px] tracking-tighter">CONTACT</div>
                  <div className="text-[0.7vw] leading-[120%] uppercase opacity-50">
                    support@ecsplits.com <br />
                    +48 123 456 789
                  </div>
                </div>
                <div className="flex flex-col gap-[.2vw]">
                  <div className="font-bold text-[20px] tracking-tighter">ABOUT</div>
                  <div className="text-[0.7vw] leading-[120%] uppercase opacity-50">
                    Custom handmade keyboards <br /> designed typing experience.
                  </div>
                </div>
              </div>
            </div>
            <div id="col2" className="h-full flex flex-col justify-between">
              <Links></Links>
              <div className="text-[0.7vw] leading-[120%] uppercase opacity-50">
                Custom handmade keyboards <br /> designed typing experience.
              </div>
            </div>
            <div id="col3" className="h-full flex flex-col justify-between">
              <div className="opacity-0">empty</div>
              <div>instagram, likeding, github</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Bottombar);
