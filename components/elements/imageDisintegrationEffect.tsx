"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextImage, { StaticImageData } from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ImageDisintegrationEffect = forwardRef<HTMLDivElement, {
    className: string;
    image: StaticImageData;
    alt: string;
    conteinerClassName?: string;
    triggerID?: string;
    triggerStart?: string | number | ScrollTrigger.StartEndFunc;
    triggerEnd?: string | number | ScrollTrigger.StartEndFunc;
    delay?: number;
    duration?: number;
    ease?: gsap.EaseString | gsap.EaseFunction;
    start?: string;
    toggleActions?: string;
}>((props, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const copyImageRef = useRef<HTMLImageElement | null>(null);

    useImperativeHandle(ref, () => containerRef.current!, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        var timeLine: gsap.core.Timeline | null = null;
        const container = props.triggerID 
            ? document.getElementById(props.triggerID) 
            : containerRef.current;

        if (container) {
            timeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: props.start ? props.start : "top 80%",
                    toggleActions: props.toggleActions ? props.toggleActions : "play none none none",
                },
            });

            timeLine.from(imageRef.current,  
                {
                    filter: "blur(20px)",
                    opacity: 0,
                    translateX: "-=10%",
                    duration: props.duration ? props.duration : 1.25,
                    ease: props.ease ? props.ease : "power2.in"
                }, 
                props.delay ? props.delay : 1
            )
            .from(copyImageRef.current,  
                {
                    filter: "blur(20px)",
                    opacity: 0,
                    translateX: "+=10%",
                    duration: props.duration ? props.duration : 1.25,
                    ease: props.ease ? props.ease : "power2.in",
                    onComplete: () => {
                        if (copyImageRef.current) {
                            copyImageRef.current.style.display = "none";
                        }
                    }
                }, 
                props.delay ? props.delay : 1
            );
        }
        
        return () => {
            timeLine?.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [imageRef, copyImageRef]);

    return (
        <div 
            ref={containerRef} 
            className={props.conteinerClassName}
            style={{
                position: "relative"
            }}
        >
            <NextImage
                ref={copyImageRef}
                alt={props.alt}
                src={props.image}
                width={props.image.width}
                height={props.image.height}
                className={`${props.className} absolute top-0 left-0`}
            />
            <NextImage
                ref={imageRef}
                alt={props.alt}
                src={props.image}
                width={props.image.width}
                height={props.image.height}
                className={props.className}
            />
        </div>
    );
});

export default ImageDisintegrationEffect;