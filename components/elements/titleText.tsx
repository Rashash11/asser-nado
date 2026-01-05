"use client";

import { CssVar } from "@/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { forwardRef, useImperativeHandle, useRef } from "react";

const TitleText = forwardRef<HTMLHeadingElement, {
    text: string;
    className?: string;
    fontFamily?: CssVar;
    triggerID?: string;
    triggerStart?: string | number | ScrollTrigger.StartEndFunc;
    triggerEnd?: string | number | ScrollTrigger.StartEndFunc;
    delay?: number;
    duration?: number;
    ease?: gsap.EaseString | gsap.EaseFunction;
    start?: string;
    toggleActions?: string;
    style?: React.CSSProperties;
}>((props, ref) => {
    const textRef = useRef<HTMLHeadingElement | null>(null);
    const underlineRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => textRef.current!, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const splitText = SplitText.create(textRef.current, { type: "chars" });
        var timeLine: gsap.core.Timeline | null = null;
        const container = props.triggerID 
            ? document.getElementById(props.triggerID) 
            : textRef.current;

        if (container) {
            timeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: props.start ? props.start : "top 80%",
                    toggleActions: props.toggleActions ? props.toggleActions : "play none none none",
                },
            })
            .from(splitText.chars, 
                {
                    opacity: 0,
                    scale: 1.25,
                    filter: "blur(10px)",
                    stagger: 0.1,
                    duration: props.duration ? props.duration : 1,
                    ease: props.ease ? props.ease : "power3.out",
                }, 
                props.delay ? props.delay : 1
            )
            .from(underlineRef.current, 
                {
                    width: 0,
                    duration: props.duration ? props.duration / 2 : 0.5,
                    ease: props.ease ? props.ease : "expo.out",
                }, 
                props.delay ? props.delay + 1 : 2
            );
        }

        return () => {
            timeLine?.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [textRef, underlineRef]);

    const fontFamily = props.fontFamily ? props.fontFamily : "var(--font-great-vibes)";
    let styles = props.style;

    if (!styles) {
        styles = { fontFamily: fontFamily };
    } else {
        styles.fontFamily = fontFamily;
    }

    return (
        <h2 
            ref={textRef}
            className={`
                block relative text-4xl whitespace-nowrap leading-none
                pl-4 pr-4 w-fit ml-auto mr-auto mb-16 text-(--foreground)
                2xl:text-5xl
                ${props.className ?? ""}
            `}
            style={styles}
        >
            {props.text}
            <div 
                ref={underlineRef}
                className="
                    w-1/2 ml-auto mr-auto transform translate-y-2 border-b-2 
                    border-yellow-950 drop-shadow-xs
                " 
            />
        </h2>
    );
});

export default TitleText;