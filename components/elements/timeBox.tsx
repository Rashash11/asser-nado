"use client";

import DigitFlip from "@/components/elements/digitFlip";

export default function TimeBox({ 
    value,
    label,
    digitsSize = "text-5xl",
    labelSize = "text-sm"
}: { 
    value: number; 
    label?: string;
    digitsSize?: string;
    labelSize?: string;
}) {
    function format(value: number) {
        return value.toString().padStart(2, "0");
    }

    return (
        <div 
            className="
                flex flex-col items-center
            "
        >
            <div
                className="relative flex justify-center overflow-hidden perspective-[1000px]"
            >
                {format(value).split("").map((char, index) => (
                    <DigitFlip 
                        key={index} 
                        value={char} 
                        className={`${digitsSize} text-(--default-svg-color-fill)`}
                    />
                ))}
            </div>

            {label ? <span className={`mt-1 ${labelSize} text-neutral-600`}>{label}</span> : null}
        </div>
    );
}