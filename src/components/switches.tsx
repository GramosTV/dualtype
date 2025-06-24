"use client"
import { useEffect,  useRef } from "react";
import React from "react";
import gsap from "gsap";

const tabs = ["KEYBOARD", "KEYCAPS"];
interface SwitchTabsProps {
  value: boolean;
}
export default function SwitchTabs({value }: SwitchTabsProps) {
  // const [active, setActive] = useState(0);

  const animationInProgress = useRef(false);
  const switch0Ref = useRef<HTMLDivElement>(null);
  const switch1Ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    //  
     
        if (!switch0Ref.current || !switch1Ref.current) return;
    
        // Prevent animation conflicts
        gsap.killTweensOf(switch0Ref.current);
        gsap.killTweensOf(switch1Ref.current);
    
        // Set flag to prevent clicking during animation
        animationInProgress.current = true;
    
        const duration = 0.3;
    
        if (value === true) {
          // First cover switch1Ref
          gsap.set(switch1Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          });
    
          gsap.set(switch0Ref.current, {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          });
    
          const tl = gsap.timeline({
            onComplete: () => {
              animationInProgress.current = false;
            }
          });
    
          
       
          // Then uncover switch0Ref (showing it)
          tl.to(switch0Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: duration,
            ease: "power3.out"
          });
    
          // First, cover switch1Ref (hiding it)
          tl.to(switch1Ref.current, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            duration: duration,
            ease: "power1.out",
          });
    
        }
        else if (value === false) {
          
        
    
          gsap.set(switch1Ref.current, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          });
    
            // First cover switch0Ref
            gsap.set(switch0Ref.current, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            });
    
          const tl = gsap.timeline({
            onComplete: () => {
              animationInProgress.current = false;
            }
          });
    
         
    
          // Then uncover switch1Ref (showing it)
          tl.to(switch1Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: duration,
            ease: "power3.out"
          });
    
           // First, cover switch0Ref (hiding it)
           tl.to(switch0Ref.current, {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            duration: duration,
            ease: "power1.out",
          });
        }
      }, [value]);
    

  return (
    <div className="flex  gap-2 z-[1000] py-[1vh]  p-1 relative rounded-md">
      <div
    
        
    
   
            
 
    
        className={`
            relative px-4 py-2 
            border-2 border-white tracking-tigh
            overflow-hidden 
          `}
      >
        <p className="mix-blend-difference
         text-[#ffffff] z-[100] opacity-100 text-sm font-bold tracking-tight">    {tabs[0]}</p>
    
        <div
          ref={switch0Ref}
          className="bg-white  t top-[-10px] left-0 z-[-10] h-[10vh] w-[10vw] absolute"
        ></div>
      </div>
      <div
       
        className={`
            relative px-4 py-2 text-sm font-bold
            border-2 border-white   tracking-tigh
        overflow-hidden
 
          `}
      >
        <div
          ref={switch1Ref}
          className="bg-white top-[-10px] left-0 z-[-10] h-[10vh] w-[10vw] absolute"
        ></div>
         <p className="mix-blend-difference
         text-[#ffffff] z-[100] opacity-100 text-sm font-bold tracking-tight">    {tabs[1]}</p>
    
      </div>
    </div>
  );
}
