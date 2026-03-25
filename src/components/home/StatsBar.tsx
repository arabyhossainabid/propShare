"use client";

import React, { useEffect, useRef } from "react";
import { Building2, Users, TrendingUp, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        icon: Building2,
        value: 156,
        suffix: "+",
        label: "Premium Properties",
        color: "blue",
    },
    {
        icon: Users,
        value: 2500,
        suffix: "+",
        label: "Active Investors",
        color: "emerald",
    },
    {
        icon: TrendingUp,
        value: 18,
        suffix: ".5%",
        label: "Average Returns",
        color: "amber",
    },
    {
        icon: MapPin,
        value: 12,
        suffix: "",
        label: "Cities Covered",
        color: "purple",
    },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        ring: "ring-blue-500/20",
    },
    emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        ring: "ring-emerald-500/20",
    },
    amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        ring: "ring-amber-500/20",
    },
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        ring: "ring-purple-500/20",
    },
};

export default function StatsBar() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Animate stat items
            gsap.fromTo(
                ".stat-item",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Count up animations
            stats.forEach((stat, index) => {
                const el = containerRef.current?.querySelectorAll(
                    ".stat-value"
                )[index] as HTMLElement;
                if (!el) return;

                const obj = { value: 0 };
                gsap.to(obj, {
                    value: stat.value,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                    },
                    onUpdate: () => {
                        el.textContent = `${Math.floor(obj.value).toLocaleString()}${stat.suffix}`;
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative z-10 -mt-12">
            <div className="container-custom">
                <div
                    ref={containerRef}
                    className="glass rounded-3xl p-8 md:p-10 gradient-border"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            const colors = colorMap[stat.color];
                            return (
                                <div
                                    key={stat.label}
                                    className="stat-item flex flex-col items-center text-center space-y-3 group cursor-default"
                                >
                                    <div
                                        className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center ring-1 ${colors.ring} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <div>
                                        <p className="stat-value text-3xl md:text-4xl font-bold font-heading text-white">
                                            0
                                        </p>
                                        <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                                            {stat.label}
                                        </p>
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
