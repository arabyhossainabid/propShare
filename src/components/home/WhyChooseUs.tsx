"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
    Shield,
    TrendingUp,
    Clock,
    Users,
    Banknote,
    Lock,
    BarChart3,
    Gem,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description:
            "Your investments are protected with enterprise-level encryption and multi-layered security protocols.",
        color: "blue",
    },
    {
        icon: TrendingUp,
        title: "High Yield Returns",
        description:
            "Earn 15-25% annual returns through rental income and property value appreciation.",
        color: "emerald",
    },
    {
        icon: Clock,
        title: "Instant Liquidity",
        description:
            "Trade your property shares anytime on our secondary marketplace. No lock-in period.",
        color: "purple",
    },
    {
        icon: Banknote,
        title: "Low Entry Barrier",
        description:
            "Start with just ৳5,000. No need for millions to invest in premium real estate.",
        color: "amber",
    },
    {
        icon: BarChart3,
        title: "Real-Time Dashboard",
        description:
            "Monitor your portfolio performance, rental yields, and property valuations in real-time.",
        color: "rose",
    },
    {
        icon: Lock,
        title: "Legal Ownership",
        description:
            "Each share represents real legal ownership. Fully RERA compliant and government registered.",
        color: "cyan",
    },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
};

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".wcu-header",
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
                ".feature-card",
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".features-grid",
                        start: "top 85%",
                    },
                }
            );

            // Image parallax
            gsap.fromTo(
                ".wcu-image",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".wcu-image",
                        start: "top 90%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-600/3 blur-[200px]" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="wcu-header text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <Gem className="w-3 h-3 text-amber-400" />
                        <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                            Why PropShare
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Built for{" "}
                        <span className="gradient-text">Smart Investors</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        We combine cutting-edge technology with deep real estate
                        expertise to deliver the most transparent and profitable
                        investment experience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        const colors = colorMap[feature.color];
                        return (
                            <div
                                key={feature.title}
                                className="feature-card group"
                            >
                                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full">
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute inset-0 rounded-3xl ${colors.bg} opacity-20`} />
                                    </div>

                                    <div className="relative space-y-5">
                                        <div
                                            className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon
                                                className={`w-6 h-6 ${colors.text}`}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-white">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-white/40 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Image Showcase */}
                <div className="wcu-image mt-20 relative rounded-3xl overflow-hidden gradient-border">
                    <div className="aspect-[21/9] relative">
                        <Image
                            src="/property-aerial.png"
                            alt="Premium Properties"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/30 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-heading">
                                        Premium Properties Across Bangladesh
                                    </h3>
                                    <p className="text-white/40 mt-2 text-sm">
                                        From Gulshan penthouses to Uttara commercial
                                        centres — we bring you the best.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">12+</p>
                                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                                            Cities
                                        </p>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">156+</p>
                                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                                            Properties
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
