"use client";

import { IEventDetailsItem } from "@/types";
import Icon from "@/components/elements/icon";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function EventItem(props: IEventDetailsItem) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(containerRef.current,
            {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                delay: 0.8,
                duration: 0.5,
                opacity: 0,
                y: "+=50"
            }
        );
    }, [containerRef]);

    return (
        <div
            ref={containerRef}
            className="
                event-item flex flex-col pt-6 pb-6 pl-2 pr-2 items-center justify-start gap-4
                bg-(--our-story-items-bg) rounded-xl shadow
            "
        >
            <Icon
                name={props.image}
                className="
                    h-24 w-24 bg-center bg-no-repeat bg-cover
                "
            />

            <h3
                className="text-3xl tracking-wider text-(--default-svg-color-fill) mb-2"
                style={{
                    fontFamily: "var(--font-great-vibes)"
                }}
            >
                {props.title}
            </h3>

            {props.dress_code_colors
                ? (
                    <div 
                        className="w-full h-10 flex flex-row items-center justify-center gap-4"
                    >
                        {props.dress_code_colors.map((color, key) => 
                            <div
                                key={key}
                                //className={`${color} rounded-[50%] shadow h-10 w-10 border-1 border-[#0000000c]`}
                                className={`rounded-[50%] shadow h-10 w-10 border-1 border-[#0000000c]`}
                                style={{backgroundColor: color}}
                            />
                        )}
                    </div>
                )
                : undefined
            }

            {props.paragraphs.map((item, key) => 
                <p
                    key={key}
                    className="
                        text-md text-center text-balance text-shadow-stone-950
                        font-light whitespace-pre-line
                    "
                    dangerouslySetInnerHTML={{ __html: item }}
                />
            )}
        </div>
    );
}