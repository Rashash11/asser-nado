"use client";

import useCustomerDetails from "@/components/hooks/useCustomerDetails";
import TitleText from "@/components/elements/titleText";
import { GET_IN_TOUCH_PAGE_ID } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormDataType = {
    name: string;
    guests_count: string;
    message?: string;
};

export default function GetInTouch() {
    const customerDetails = useCustomerDetails();
    const { register, handleSubmit, reset } = useForm<FormDataType>();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const onSubmit = async (data: FormDataType) => {
        try {
            setStatus("loading");

            const formData = new FormData();

            formData.append("access_key", "b8103831-4f24-4458-8fe8-e003ad1f178a");
            formData.append(
                "subject",
                "Feedback [Wedding Invitation]"
            );
            formData.append("from_name", "Wedding invitation");
            formData.append("botcheck", "");
            formData.append("name", data.name);
            formData.append("guests_count", data.guests_count);
            if (data.message) {
                formData.append("message", data.message);
            }

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                setStatus("success");
                reset();
            } else {
                throw new Error("Form submit failed");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(formRef.current,
            {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                delay: 0.8,
                duration: 1.25,
                opacity: 0,
                y: "+=50"
            }
        );
    }, [formRef]);


    return (
        <div
            id={GET_IN_TOUCH_PAGE_ID}
            ref={containerRef}
            className="mb-16 px-4"
        >
            <TitleText
                triggerID={GET_IN_TOUCH_PAGE_ID}
                text={customerDetails.get_in_touch_title}
                delay={0.25}
                duration={0.75}
                style={{
                    marginBottom: "3rem"
                }}
            />

            <form
                id="get-in-touch-form"
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-md rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur"
            >
                <input type="hidden" name="access_key" value="b8103831-4f24-4458-8fe8-e003ad1f178a" />
                <input type="hidden" name="subject" value="Feedback [Wedding Invitation]" />
                <input type="hidden" name="replyto" value="your-email@example.com" />
                <input type="hidden" name="from_name" value="Wedding invitation" />
                <input type="checkbox" name="botcheck" className="hidden" />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Your Name
                    </label>
                    <input
                        {...register("name", { required: true })}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                                    focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        placeholder="Your Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Number of Guests
                    </label>
                    <input
                        {...register("guests_count", { required: true })}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                                    focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        placeholder="1, 2, 3..."
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        {...register("message")}
                        rows={4}
                        className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-gray-800
                                    focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        placeholder="Here you can leave your wishes or questions..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-md bg-(--default-svg-color-fill) py-3 text-white font-medium
                            transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                    {status === "loading" ? "Sending..." : "Send"}
                </button>

                {status === "success" && (
                    <p className="mt-4 text-center text-sm text-green-600">
                        Thank you! Message sent 💚
                    </p>
                )}

                {status === "error" && (
                    <p className="mt-4 text-center text-sm text-red-600">
                        An error occurred. Please try again later.
                    </p>
                )}
            </form>
        </div>
    );
}