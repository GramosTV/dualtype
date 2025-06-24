'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BorderButton, Textbg, Blocks } from '@/components/ui';
import { Appear } from '@/components/animations';
import React from 'react';

export default function Header() {
  const video = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fallback timeout in case video events don't fire
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setLoading(false);
    if (video.current) {
      // Ensure the video plays when loaded
      video.current.play().catch((error) => {
        console.error('Video playback failed:', error);
        // Still remove loading screen even if autoplay fails
        setLoading(false);
      });
    }
  };

  return (
    <div id="header" className="w-full h-screen flex flex-col overflow-x-hidden items-center">
      <Textbg />
      <Blocks />

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-[#ffffff] border-r-[#ffffff30] border-b-[#ffffff30] border-l-[#ffffff30] rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">Loading...</p>
          </div>
        </div>
      ) : null}

      {!loading && (
        <>
          <div className="absolute hidden w-full h-[100vh] md:flex items-center justify-center">
            <video
              src="/assets/videos/output.webm"
              ref={video}
              muted
              autoPlay
              playsInline
              onCanPlayThrough={handleVideoLoaded}
              onLoadedData={handleVideoLoaded}
              onError={() => setLoading(false)}
              className="w-[89vw] z-[0] mt-[25vh] h-[89vh]"
            ></video>
          </div>

          <div className="flex flex-col mt-[12vh] overflow-hidden justify-center items-center gap-[2px]">
            <Appear delay={0}>
              <h2 className="flex font-normal font-arial leading-[100%] mt-[2vh] mb-[3vh]">
                <div className="text-upheader tracking-tighter">creativity</div>
                <div className="opacity-50 text-upheader tracking-tight">&nbsp;& quality</div>
              </h2>
            </Appear>
            <Appear delay={0.2}>
              <h1 className="z-[-10] font-b w-fit text-header opacity-100 tracking-tighter leading-[85%] gradient-text flex flex-col font justify-center items-center ">
                <div className="leading-[87%]">Just what</div>
                <div className="leading-[87%]">your setup needs</div>
              </h1>
            </Appear>
            <Appear delay={0.4}>
              <div className="opacity-45 text-[24px] tracking-tighter text-center mt-[1vh]">
                {' '}
                [ Product made for gamers, workers and focused people ]{' '}
              </div>
            </Appear>
            <Appear delay={0.8}>
              <BorderButton />
            </Appear>
          </div>
          <Image width={700} height={700} className="md:hidden block" alt="x" src="/assets/images/Frame 6.png" />
        </>
      )}
    </div>
  );
}
