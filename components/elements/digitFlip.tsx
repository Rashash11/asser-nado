"use client";

import gsap from "gsap";
import { CSSProperties, useLayoutEffect, useRef } from "react";

export default function DigitFlip({ 
    value, 
    className = "",
    style
}: { 
    value: string; 
    className?: string;
    style?: CSSProperties;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const prevValueRef = useRef<number>(-1);

    useLayoutEffect(() => {
        const digit = Number(value);

        if (digit !== prevValueRef.current) {
            prevValueRef.current = digit;

            gsap.fromTo(containerRef.current,
                { 
                    yPercent: -100, 
                    scale: 0.9, 
                    rotateY: -60,
                    transformOrigin: "center top"
                }, 
                {
                    yPercent: 0, 
                    scale: 1, 
                    rotateY: 0,
                    transformOrigin: "center top",
                    duration: 0.5, 
                    ease: "expo.out"
                }
            );
        }
    }, [value]);

    return (
        <div
            ref={containerRef}
            style={style}
            className={`relative w-[1ch] text-center ${className}`}
        >
            {value}
        </div> 
    );
}