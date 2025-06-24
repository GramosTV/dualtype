"use client"
import React, { useEffect, useRef } from "react";

const letters = "&1$*01_____";

interface TextProps {
    children?: string;
    width?: true
}

const Text: React.FC<TextProps> = ({ children, width }) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    let interval: NodeJS.Timeout | null = null;

    useEffect(() => {
        const screen = screenRef.current;
        const name = nameRef.current;
        if (!screen || !name) return;

        const handleMouseEnter = () => {
            let iteration = -1;
            if (interval) clearInterval(interval);

            interval = setInterval(() => {
                const textValue = name.dataset.value;
                if (!textValue) return;

                name.innerText = textValue
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return textValue[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                iteration += 0.35;
                if (iteration >= textValue.length) clearInterval(interval!);
            }, 16);
        };

        screen.addEventListener("mouseenter", handleMouseEnter);
        return () => {
            screen.removeEventListener("mouseenter", handleMouseEnter);
            if (interval) clearInterval(interval);
        };
    }, [interval]);

    return (
        <div ref={screenRef} className="screen">
            <div ref={nameRef} className={`leading-[520%]  cursor-pointer ${width ? '' : 'w-[3.5vw]'} flex items-center justify-center`} data-value={children}>
                {children}
            </div>
        </div>
    );
};

export default Text;
