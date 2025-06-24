"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";

interface DownsideAppearProps {
    children: ReactNode;
    delay?: number;
}

const Appear: React.FC<DownsideAppearProps> = ({ children, delay }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                scale: 1,
                stagger: 0.2,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "center bottom",
                },
            });
        }
    }, [delay]);

    return (
        <div ref={ref} className="opacity-0 scale-90 flex  translate-y-[10vh]">
            {children}
        </div>
    );
};

export default Appear;
