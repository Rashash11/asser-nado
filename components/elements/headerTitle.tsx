"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { GENERAL_LOADING_ID } from "@/constants";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import Icon from "@/components/elements/icon";

export default function HeaderTitle() {
    const customerDetails = useCustomerDetails();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const firtsSvgRef = useRef<SVGSVGElement | null>(null);
    const secondSvgRef = useRef<SVGSVGElement | null>(null);
    const textRef = useRef<HTMLHeadingElement | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);
        const split = new SplitText(textRef.current, { type: "chars" });
        const tl = gsap.timeline();

        tl.fromTo(firtsSvgRef.current,
            {
                opacity: 0,
                scale: 0.9,
                filter: "blur(2px)",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            },
            0.5
        )
        .fromTo(secondSvgRef.current,
            {
                opacity: 0,
                scale: 0.9,
                filter: "blur(2px)",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            },
            0.5
        )
        .fromTo(split.chars,
            {
                opacity: 0,
                y: 50,
                scale: 2,
                filter: "blur(10px)",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                stagger: 0.075,
                ease: "power3.out",
            },
            0.5
        );

        return () => {
            split.revert();
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [firtsSvgRef, secondSvgRef, textRef]);

    useEffect(() => {
        const removeLoader = () => {
            const loader = document.getElementById(GENERAL_LOADING_ID);

            if (loader) {
                loader.style.opacity = "0";
                loader.style.display = "none";
            }
        }

        if (document.readyState === "complete") {
            removeLoader();
        } else {
            window.addEventListener("load", removeLoader);

            return () => window.removeEventListener("load", removeLoader);
        }
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="
                absolute flex items-stretch mt-12 space-x-0 gap-0 justify-center left-1/2 
                transform -translate-x-1/2 z-10
            "
        >
            <Icon
                ref={firtsSvgRef}
                name="branch"
                className="
                    h-14 w-20 bg-contain bg-no-repeat bg-center rotate-75 translate-x-2 drop-shadow
                    2xl:h-18 2xl:w-28
                "
            />
            
            <div className="block whitespace-nowrap">
                <h1
                    ref={textRef}
                    className="
                        flex items-stretch text-3xl text-center h-16 whitespace-nowrap 
                        tracking-wider leading-none drop-shadow
                        2xl:text-4xl 2xl:h-18
                    "
                    style={{
                        fontFamily: "var(--font-great-vibes)",
                        color: "var(--foreground)"
                    }}
                >
                    <span className="self-start">{customerDetails.first_human_name}</span>
                    <span className="
                        mr-2 ml-2 self-center
                        2xl:mr-4 2xl:ml-4
                    ">{customerDetails.ampersand}</span>
                    <span className="self-end">{customerDetails.second_human_name}</span>
                </h1>
            </div>

            <Icon
                ref={secondSvgRef}
                name="branch"
                className="
                    h-14 w-20 bg-contain bg-no-repeat bg-center rotate-250 -translate-x-2
                    2xl:h-18 2xl:w-28
                "
            />
        </div>
    );
}