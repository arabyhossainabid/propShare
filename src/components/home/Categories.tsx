"use client";

import React, { useEffect, useRef } from "react";
import {
    Building2,
    Home,
    Store,
    Factory,
    Laptop,
    Palmtree,
    Warehouse,
    Hotel,
    ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Category {
    id: string;
    name: string;
    icon: string;
    count: number;
}

const iconMap: Record<string, React.ElementType> = {
    "🏠": Home,
    "🏢": Building2,
    "🏭": Factory,
    "🛒": Store,
    "💻": Laptop,
    "🏖️": Palmtree,
    "🏬": Warehouse,
    "🏨": Hotel,
};

const gradients = [
    "from-blue-600 to-blue-400",
    "from-emerald-600 to-emerald-400",
    "from-purple-600 to-purple-400",
    "from-amber-600 to-amber-400",
    "from-rose-600 to-rose-400",
    "from-cyan-600 to-cyan-400",
];

export default function Categories({ categories }: { categories: Category[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".section-header",
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
                ".category-card",
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".categories-grid",
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative">
            <div className="container-custom">
                {/* Section Header */}
                <div className="section-header text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                            Browse Categories
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Invest by{" "}
                        <span className="gradient-text">Property Type</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Explore diverse property categories and find the perfect
                        investment opportunity that matches your portfolio goals.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="categories-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => {
                        const Icon = iconMap[category.icon] || Building2;
                        const gradient = gradients[index % gradients.length];
                        return (
                            <div
                                key={category.id}
                                className="category-card group cursor-pointer"
                            >
                                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center space-y-4 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 h-full">
                                    {/* Hover glow */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    />

                                    <div
                                        className={`relative mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                                        style={{
                                            background: `linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.05))`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                    </div>

                                    <div className="relative">
                                        <h3 className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-white/30 mt-1">
                                            {category.count} Properties
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <ArrowRight className="w-4 h-4 mx-auto text-white/0 group-hover:text-white/40 translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
