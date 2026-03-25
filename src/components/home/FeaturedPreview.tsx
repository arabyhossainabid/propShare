"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    TrendingUp,
    Heart,
    ArrowRight,
    ArrowUpRight,
    Eye,
    Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const previewProperties = [
    {
        id: "1",
        title: "Luxury Waterfront Apartment",
        location: "Gulshan, Dhaka",
        price: 15000000,
        minInvestment: 50000,
        totalShares: 300,
        availableShares: 84,
        upvotes: 142,
        category: "Residential",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "2",
        title: "Commercial Office Tower",
        location: "Banani, Dhaka",
        price: 50000000,
        minInvestment: 100000,
        totalShares: 500,
        availableShares: 50,
        upvotes: 289,
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "3",
        title: "Modern Tech Hub Space",
        location: "Uttara, Dhaka",
        price: 32000000,
        minInvestment: 25000,
        totalShares: 128,
        availableShares: 45,
        upvotes: 156,
        category: "Tech Office",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function FeaturedPreview() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".fp-header",
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
                ".property-card",
                { opacity: 0, y: 80, rotateY: 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".properties-grid",
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const fundedPercentage = (p: (typeof previewProperties)[0]) =>
        Math.round(((p.totalShares - p.availableShares) / p.totalShares) * 100);

    return (
        <section ref={sectionRef} className="section-padding relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/3 blur-[200px]" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="fp-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                                Featured Listings
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Top Performing{" "}
                            <span className="gradient-text">Properties</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl">
                            Curated selection of high-yield properties with proven
                            track records and strong appreciation potential.
                        </p>
                    </div>
                    <Link href="/properties">
                        <Button
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-6 py-5 self-start md:self-auto group"
                        >
                            View All Properties
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Properties Grid */}
                <div className="properties-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previewProperties.map((property) => (
                        <Link
                            href={`/properties/${property.id}`}
                            key={property.id}
                            className="property-card group cursor-pointer"
                        >
                            <div className="bg-[#151c2e] rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700">
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151c2e] via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                        <Badge className="bg-black/50 backdrop-blur-xl text-white border-white/10 text-xs">
                                            {property.category}
                                        </Badge>
                                        <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                            <Heart className="w-3.5 h-3.5 text-white" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            High Yield
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                            {property.title}
                                        </h3>
                                        <p className="text-sm text-white/40 flex items-center gap-1.5 mt-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {property.location}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/[0.03] rounded-xl p-3">
                                            <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                Property Value
                                            </p>
                                            <p className="text-sm font-bold text-white mt-1">
                                                ৳{(property.price / 100000).toFixed(0)}L
                                            </p>
                                        </div>
                                        <div className="bg-white/[0.03] rounded-xl p-3">
                                            <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                Min. Investment
                                            </p>
                                            <p className="text-sm font-bold text-blue-400 mt-1">
                                                ৳{property.minInvestment.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/40">Funding Progress</span>
                                            <span className="text-white font-medium">
                                                {fundedPercentage(property)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full transition-all duration-1000"
                                                style={{ width: `${fundedPercentage(property)}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] text-white/30">
                                            <span>
                                                {property.totalShares - property.availableShares}/{property.totalShares} shares
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {property.upvotes}
                                            </span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl py-5 transition-all duration-300 group/btn">
                                        Invest Now
                                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
