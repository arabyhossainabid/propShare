"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
    const ref = useRef<HTMLDivElement>(null);

    return { ref, gsap, ScrollTrigger };
}

export function useFadeInOnScroll(options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const children = ref.current.children;

        gsap.fromTo(
            children,
            {
                opacity: 0,
                y: options?.y ?? 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: options?.duration ?? 1,
                delay: options?.delay ?? 0,
                stagger: options?.stagger ?? 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: options?.start ?? "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [options?.y, options?.duration, options?.delay, options?.stagger, options?.start]);

    return ref;
}

export function useParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            yPercent: speed * 30,
            ease: "none",
            scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [speed]);

    return ref;
}

export function useCountUp(
    endValue: number,
    options?: { duration?: number; suffix?: string; prefix?: string }
) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const obj = { value: 0 };

        gsap.to(obj, {
            value: endValue,
            duration: options?.duration ?? 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
                toggleActions: "play none none none",
            },
            onUpdate: () => {
                if (ref.current) {
                    ref.current.textContent = `${options?.prefix ?? ""}${Math.floor(
                        obj.value
                    ).toLocaleString()}${options?.suffix ?? ""}`;
                }
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [endValue, options?.duration, options?.suffix, options?.prefix]);

    return ref;
}
