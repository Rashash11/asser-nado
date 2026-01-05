"use client";

import { EVENT_DETAILS_PAGE_ID } from "@/constants";
import TitleText from "@/components/elements/titleText";
import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import EventItem from "@/components/elements/eventItem";
import GoogleMapWidget from "@/components/elements/googleMapWidget";

export default function EventDetails() {
    const customerDetails = useCustomerDetails();

    return (
        <div 
            id={EVENT_DETAILS_PAGE_ID}
            className="relative mb-32"
        >
            <TitleText  
                triggerID={EVENT_DETAILS_PAGE_ID}
                text={customerDetails.event_details_title}
                delay={0.25}
                duration={0.75}
                className="!mb-10"
            />

            <div
                className="
                    grid grid-cols-1 justify-center gap-8 ml-8 mr-8 

                    lg:grid-cols-3 lg:w-[80%] lg:ml-auto lg:mr-auto 2xl:w-[60%]
                "
            >
                {customerDetails.event_details_items.map((item, key) => 
                    <EventItem 
                        key={key}
                        image={item.image}
                        title={item.title}
                        paragraphs={item.paragraphs}
                        dress_code_colors={item.dress_code_colors}
                    />
                )}
            </div>
            
            {customerDetails.event_detail_location_enabled ? <GoogleMapWidget /> : null}
        </div>
    ); 
}