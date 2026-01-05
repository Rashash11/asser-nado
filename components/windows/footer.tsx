"use client";

import { FOOTER_PAGE_ID } from "@/constants";
import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import { useRef } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

export default function Footer() {
    const customerDetails = useCustomerDetails();

    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            id={FOOTER_PAGE_ID}
            ref={containerRef}
            className="bg-neutral-700 flex flex-col gap-2 pt-6 pb-6 pl-4 pr-4 items-center"
        >
            {customerDetails.footer_paragraphs.map((item, key) => 
                <p
                    key={key}
                    className="text-amber-50 text-sm"
                    dangerouslySetInnerHTML={{ __html: item }}
                />
            )}

            <a
                className="text-amber-50 text-sm flex flex-row items-center mt-4 cursor-pointer"
                target="_blank"
                href={customerDetails.footer_developer_link}
            >
                {customerDetails.footer_developer_text}

                <DynamicIcon
                    name="send" 
                    color="var(--gold)" 
                    size={20} 
                    strokeWidth={1.75}
                    opacity={0.85}
                    className="block ml-2 mr-1"
                />
                
                <span
                    className="text-(--gold) font-medium"
                >
                    {customerDetails.footer_developer_name}
                </span>
            </a>
        </div>
    );
}