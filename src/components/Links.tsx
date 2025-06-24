import React, { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const Links = () => {
  // Fixed typing: React.RefObject<HTMLDivElement>
  const link1 = useRef<HTMLDivElement>(null)
  const link2 = useRef<HTMLDivElement>(null)
  const link3 = useRef<HTMLDivElement>(null)
  const link4 = useRef<HTMLDivElement>(null)
  const selector = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  // Use useCallback to create stable function references with proper typing
  const animateToLink = useCallback((linkRef: React.RefObject<HTMLDivElement | null>) => {
    if (selector.current && linkRef.current) {
      gsap.to(selector.current, {
        duration: 0.2,
        y: linkRef.current.offsetTop,
        ease: "slow(0.7,0.7,false)",
        delay: 0.1,
        onComplete: () => {
          setTimeout(() => {
            console.log("Animation complete and waited 1 second");
          }, 2000);
        }
      });
    }
  }, []);

  const enterzone = useCallback(() => {
    if (selector.current) {
      gsap.to(selector.current, {
        duration: 0.18,
        scale: 1.25,
        ease: "power4.out",
        delay: 0.2
      });
    }
  }, []);

  const leavezone = useCallback(() => {
    if (selector.current) {
      gsap.to(selector.current, {
        duration: 0.1,
        scale: 1,
        ease: "back.out(1)",
        delay: 0.2
      });
    }
  }, []);

  useEffect(() => {
    // Create stable function references for event handlers
    const handleLink1 = () => animateToLink(link1);
    const handleLink2 = () => animateToLink(link2);
    const handleLink3 = () => animateToLink(link3);
    const handleLink4 = () => animateToLink(link4);
    
    // Add event listeners with proper function references
    if (container.current) {
      container.current.addEventListener('mouseenter', enterzone);
      container.current.addEventListener('mouseleave', leavezone);
    }
    
    link1.current?.addEventListener('mouseenter', handleLink1);
    link2.current?.addEventListener('mouseenter', handleLink2);
    link3.current?.addEventListener('mouseenter', handleLink3);
    link4.current?.addEventListener('mouseenter', handleLink4);
    
    // Clean up using the same function references
    return () => {
      if (container.current) {
        container.current.removeEventListener('mouseenter', enterzone);
        container.current.removeEventListener('mouseleave', leavezone);
      }
      
      link1.current?.removeEventListener('mouseenter', handleLink1);
      link2.current?.removeEventListener('mouseenter', handleLink2);
      link3.current?.removeEventListener('mouseenter', handleLink3);
      link4.current?.removeEventListener('mouseenter', handleLink4);
    };
  }, [animateToLink, enterzone, leavezone]);
  
  // Define links for cleaner rendering
  const links = [
    { ref: link1, text: 'home' },
    { ref: link2, text: 'contact' },
    { ref: link3, text: 'about' },
    { ref: link4, text: 'Product' }
  ];
  
  return (
    <div ref={container} className="flex relative w-full h-fit justify-between">
      <div 
        ref={selector}
        className="absolute pointer-events-none"
      >
        <Image src='/svg/border.svg' alt='selector' className='mt-[0.5vh] ml-[5vw] scale-150' width={222} height={352} />
      </div>
      <div className="text-[1.5vw] font-bold uppercase flex flex-col items-start">
        {links.map((link, index) => (
          <div 
            key={index}
            ref={link.ref} 
            className='h-[5vh] ml-[3vw] flex items-center justify-center cursor-pointer'
          >
            {link.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Links