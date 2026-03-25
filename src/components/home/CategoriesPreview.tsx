"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Building2,
    Home,
    Store,
    Factory,
    Laptop,
    Palmtree,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { id: "1", name: "Residential", icon: Home, count: 42, color: "from-blue-600 to-blue-400" },
    { id: "2", name: "Commercial", icon: Building2, count: 28, color: "from-emerald-600 to-emerald-400" },
    { id: "3", name: "Industrial", icon: Factory, count: 15, color: "from-purple-600 to-purple-400" },
    { id: "4", name: "Retail", icon: Store, count: 19, color: "from-amber-600 to-amber-400" },
    { id: "5", name: "Co-working", icon: Laptop, count: 35, color: "from-rose-600 to-rose-400" },
    { id: "6", name: "Vacation", icon: Palmtree, count: 17, color: "from-cyan-600 to-cyan-400" },
];

export default function CategoriesPreview() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".cat-header",
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
                ".cat-card",
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".cat-grid",
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
                {/* Header */}
                <div className="cat-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                                Browse Categories
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Invest by{" "}
                            <span className="gradient-text">Property Type</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl">
                            Explore diverse property categories and find the perfect
                            investment opportunity.
                        </p>
                    </div>
                    <Link href="/categories">
                        <Button
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-6 py-5 self-start md:self-auto group"
                        >
                            All Categories
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="cat-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                href={`/categories/${category.id}`}
                                key={category.id}
                                className="cat-card group cursor-pointer"
                            >
                                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center space-y-4 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 h-full">
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    />
                                    <div className="relative mx-auto w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                    </div>
                                    <div className="relative">
                                        <h3 className="text-sm font-semibold text-white">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-white/30 mt-1">
                                            {category.count} Properties
                                        </p>
                                    </div>
                                    <ArrowUpRight className="relative w-4 h-4 mx-auto text-white/0 group-hover:text-white/40 translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
