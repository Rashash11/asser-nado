"use client";

import { TIMER_TO_WEDDING_PAGE_ID } from "@/constants";
import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import TitleText from "@/components/elements/titleText";
import { useEffect, useRef, useState } from "react";
import { RemainingTime } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimeBox from "@/components/elements/timeBox";

export default function TimerToWedding() {
    const customerDetails = useCustomerDetails();
 
    const containerRef = useRef<HTMLDivElement | null>(null);
    const curtainRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<HTMLDivElement | null>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [weddingDateOfMilliseconds] = useState<number>(() => Date.parse(
        customerDetails.wedding_date.replaceAll(".", "-")));
    const [remainingTime, setRemainingTime] = useState<RemainingTime>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0 
    } as RemainingTime);

    useEffect(() => {
        function convertToRemainingTime(date: number): RemainingTime {
            const remaining = date - Date.now();

            if (remaining <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                } as RemainingTime;
            }

            const result: RemainingTime = Object.assign({}, remainingTime);

            result.seconds  =   Math.floor(remaining / 1000) % 60;
            result.minutes  =   Math.floor(remaining / (1000 * 60)) % 60;
            result.hours    =   Math.floor(remaining / (1000 * 60 * 60)) % 24;
            result.days     =   Math.floor(remaining / (1000 * 60 * 60 * 24));

            return result;
        }

        function clear() {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }   
        }

        intervalRef.current = setInterval(() => {
            var remaining = convertToRemainingTime(weddingDateOfMilliseconds);

            setRemainingTime(remaining);

            if (
                remaining.seconds <= 0 &&
                remaining.minutes <= 0 &&
                remaining.hours <= 0 &&
                remaining.days <= 0
            ) clear();
        }, 500);

        return () => clear();
    }, [weddingDateOfMilliseconds]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const timeLine = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        })
        .from(curtainRef.current, {
            height: 0,
            duration: 0.5,
            filter: "blur(2.5px)",
            ease: "power1.out"
        }, 1.5)
        .to(curtainRef.current, {
            xPercent: 100,
            duration: 1,
            filter: "blur(2.5px)",
            ease: "power1.out"
        }, 2.5)
        .to(curtainRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out"
        }, 3.75)
        .from(timerRef.current, {
            opacity: 0,
            duration: 0.1,
            ease: "power1.out"
        }, 2);

        return () => {
            timeLine.clear();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id={TIMER_TO_WEDDING_PAGE_ID}
            className="mb-32"
        >
            <TitleText  
                triggerID={TIMER_TO_WEDDING_PAGE_ID}
                text={customerDetails.timer_to_wedding_title}
                delay={0.25}
                duration={0.75}
                className="mb-18"
            />

            <div
                className="
                    relative flex flex-row gap-6 w-fit ml-auto mr-auto 
                "
            >
                <div
                    ref={curtainRef}
                    className="
                        timer-to-wedding-curtain absolute top-1 -left-[50%] 
                        h-[100%] w-[200%] border-l-2 bg-(--background) 
                        border-yellow-950 z-50
                    "
                />

                <div 
                    ref={timerRef}
                    className="
                        flex flex-col items-center gap-10 w-fit ml-auto mr-auto
                    "
                >
                    <TimeBox 
                        label={customerDetails.timer_to_wedding_label_days} 
                        value={remainingTime.days} 
                        digitsSize="text-7xl"
                        labelSize="text-lg"
                    />
                    <TimeBox 
                        label={customerDetails.timer_to_wedding_label_hours} 
                        value={remainingTime.hours} 
                        digitsSize="text-6xl"
                        labelSize="text-base"
                    />
                    <TimeBox 
                        label={customerDetails.timer_to_wedding_label_minutes} 
                        value={remainingTime.minutes} 
                        digitsSize="text-5xl"
                        labelSize="text-sm"
                    />
                    <TimeBox 
                        label={customerDetails.timer_to_wedding_label_seconds} 
                        value={remainingTime.seconds} 
                        digitsSize="text-4xl"
                        labelSize="text-xs"
                    />
                </div>
            </div>
        </div>
    );
}