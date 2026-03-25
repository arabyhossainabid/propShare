"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Building2,
    Home,
    Store,
    Factory,
    Laptop,
    Palmtree,
    ArrowUpRight,
    TrendingUp,
    Users,
    BarChart3,
    Layers,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        id: "1",
        name: "Residential",
        icon: Home,
        count: 42,
        description: "Luxury apartments, penthouses, and family homes in prime locations across major cities.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
        avgReturn: "18%",
        totalInvestors: 856,
        minInvestment: "৳25,000",
        color: "blue",
    },
    {
        id: "2",
        name: "Commercial",
        icon: Building2,
        count: 28,
        description: "Office towers, business centers, and corporate spaces with high rental yields.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
        avgReturn: "22%",
        totalInvestors: 1240,
        minInvestment: "৳50,000",
        color: "emerald",
    },
    {
        id: "3",
        name: "Industrial",
        icon: Factory,
        count: 15,
        description: "Warehouses, manufacturing units, and logistics centers in industrial zones.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
        avgReturn: "15%",
        totalInvestors: 345,
        minInvestment: "৳75,000",
        color: "purple",
    },
    {
        id: "4",
        name: "Retail",
        icon: Store,
        count: 19,
        description: "Shopping malls, retail stores, and commercial shopping complexes.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
        avgReturn: "20%",
        totalInvestors: 678,
        minInvestment: "৳40,000",
        color: "amber",
    },
    {
        id: "5",
        name: "Co-working",
        icon: Laptop,
        count: 35,
        description: "Modern co-working spaces, tech hubs, and innovation centers for the new economy.",
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop",
        avgReturn: "24%",
        totalInvestors: 1560,
        minInvestment: "৳15,000",
        color: "rose",
    },
    {
        id: "6",
        name: "Vacation",
        icon: Palmtree,
        count: 17,
        description: "Beach resorts, hill-side villas, and holiday homes in tourist destinations.",
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop",
        avgReturn: "16%",
        totalInvestors: 520,
        minInvestment: "৳30,000",
        color: "cyan",
    },
];

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", gradient: "from-blue-600 to-blue-400" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-600 to-emerald-400" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", gradient: "from-purple-600 to-purple-400" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-600 to-amber-400" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", gradient: "from-rose-600 to-rose-400" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", gradient: "from-cyan-600 to-cyan-400" },
};

export default function CategoriesPage() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".page-header",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(
                ".category-full-card",
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".categories-full-grid",
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="min-h-screen bg-[#0a0f1d] pt-28 pb-20">
            <div className="container-custom">
                {/* Page Header */}
                <div className="page-header space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <Layers className="w-3 h-3 text-purple-400" />
                        <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                            Property Categories
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
                        Invest by{" "}
                        <span className="gradient-text">Category</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl">
                        Choose from diverse property types. Each category offers
                        unique opportunities for growth and income.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="categories-full-grid grid md:grid-cols-2 gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const colors = colorMap[category.color];
                        return (
                            <Link
                                href={`/categories/${category.id}`}
                                key={category.id}
                                className="category-full-card group"
                            >
                                <div className="relative bg-[#151c2e] rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700 h-full">
                                    {/* Image Banner */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#151c2e] via-[#151c2e]/40 to-transparent" />

                                        {/* Icon Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div
                                                className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} backdrop-blur-xl flex items-center justify-center`}
                                            >
                                                <Icon className={`w-6 h-6 ${colors.text}`} />
                                            </div>
                                        </div>

                                        {/* Count Badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-xs font-medium text-white">
                                                {category.count} Properties
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-white/40 mt-2 leading-relaxed">
                                                {category.description}
                                            </p>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="bg-white/[0.03] rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                                                        Avg Return
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-emerald-400">
                                                    {category.avgReturn}
                                                </p>
                                            </div>
                                            <div className="bg-white/[0.03] rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Users className="w-3 h-3 text-blue-400" />
                                                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                                                        Investors
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-white">
                                                    {category.totalInvestors.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="bg-white/[0.03] rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <BarChart3 className="w-3 h-3 text-amber-400" />
                                                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                                                        Min. Invest
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-white">
                                                    {category.minInvestment}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                                                View Properties
                                            </span>
                                            <div
                                                className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <ArrowUpRight className={`w-5 h-5 ${colors.text}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
