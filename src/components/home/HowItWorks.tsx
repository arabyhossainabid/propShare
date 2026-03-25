"use client";

import React, { useEffect, useRef } from "react";
import {
    Search,
    ShieldCheck,
    Wallet,
    BarChart3,
    ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Discover Properties",
        description:
            "Browse our curated collection of high-yield, verified properties across multiple cities and categories.",
        color: "blue",
    },
    {
        icon: ShieldCheck,
        number: "02",
        title: "Due Diligence",
        description:
            "Every property undergoes rigorous verification including legal checks, valuation reports, and RERA compliance.",
        color: "emerald",
    },
    {
        icon: Wallet,
        number: "03",
        title: "Invest & Own Shares",
        description:
            "Purchase fractional shares starting from ৳5,000. Each share represents real ownership in the property.",
        color: "purple",
    },
    {
        icon: BarChart3,
        number: "04",
        title: "Earn Returns",
        description:
            "Receive monthly rental income and benefit from property appreciation. Track everything on your dashboard.",
        color: "amber",
    },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        glow: "shadow-blue-500/10",
    },
    emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        glow: "shadow-emerald-500/10",
    },
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
        glow: "shadow-purple-500/10",
    },
    amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        glow: "shadow-amber-500/10",
    },
};

export default function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".hiw-header",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                ".step-card",
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".steps-container",
                        start: "top 85%",
                    },
                }
            );

            // Animate the connecting line
            gsap.fromTo(
                ".connecting-line",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".steps-container",
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="how-it-works" className="section-padding relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="hiw-header text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                            Simple Process
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        How{" "}
                        <span className="gradient-text">PropShare</span>{" "}
                        Works
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Start your real estate investment journey in four simple
                        steps. No hassle, no paperwork, just smart investing.
                    </p>
                </div>

                {/* Steps */}
                <div className="steps-container relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[1px]">
                        <div className="connecting-line w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 origin-left" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const colors = colorClasses[step.color];
                            return (
                                <div
                                    key={step.number}
                                    className="step-card group"
                                >
                                    <div className="relative text-center space-y-6">
                                        {/* Step Number & Icon */}
                                        <div className="relative mx-auto">
                                            {/* Outer ring */}
                                            <div
                                                className={`w-[100px] h-[100px] mx-auto rounded-3xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-2xl ${colors.glow} group-hover:scale-110 transition-all duration-500`}
                                            >
                                                <Icon
                                                    className={`w-10 h-10 ${colors.text}`}
                                                />
                                            </div>
                                            {/* Step number badge */}
                                            <div
                                                className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0a0f1d] border-2 ${colors.border} flex items-center justify-center`}
                                            >
                                                <span
                                                    className={`text-xs font-bold ${colors.text}`}
                                                >
                                                    {step.number}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-white">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Arrow indicator */}
                                        {index < steps.length - 1 && (
                                            <div className="hidden lg:block absolute top-[42px] -right-4">
                                                <ArrowRight className="w-4 h-4 text-white/10" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
