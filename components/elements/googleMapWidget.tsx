"use client";

import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function GoogleMapWidget() {
    const customerDetails = useCustomerDetails();

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
                delay: 0.5,
                duration: 0.75,
                opacity: 0,
                y: "+=50"
            }
        );
    }, [containerRef]);

    return (
        <div
            ref={containerRef}
            className="
                google-map-widget flex flex-col ml-8 mr-8 mt-8 p-6 items-center justify-start gap-5
                bg-(--our-story-items-bg) rounded-xl shadow overflow-hidden
                lg:w-[80%] lg:ml-auto lg:mr-auto 2xl:w-[60%]
            "
        >
            <h3
                className={`
                    block relative text-3xl whitespace-nowrap tracking-wider leading-none
                    w-fit ml-auto mr-auto text-(--foreground)
                `}
                style={{
                    fontFamily: "var(--font-great-vibes)"
                }}
            >
                {customerDetails.event_detail_location_title}
            </h3>

            <iframe
                src={customerDetails.event_detail_google_maps_url}
                className="w-[100%] h-[300px] rounded-xl shadow"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />    
        </div>
    );
}