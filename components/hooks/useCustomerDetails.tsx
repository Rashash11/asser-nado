"use client";

import { ICustomerDetails } from "@/types";
import { useState } from "react";
import nonTypedCustomerDetails from "@/customer-details.json";

export default function useCustomerDetails() {
    const [customerDetails] = useState<ICustomerDetails>(() => {
        if (!(typeof window !== "undefined")) {
            return nonTypedCustomerDetails as ICustomerDetails;
        }

        if (!window.customerDetails) {
            window.customerDetails = nonTypedCustomerDetails as ICustomerDetails;
        }

        return window.customerDetails;
    });

    return customerDetails;
}