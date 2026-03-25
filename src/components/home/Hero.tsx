"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    MapPin,
    ArrowRight,
    Play,
    TrendingUp,
    Shield,
    Building2,
    ChevronDown,
} from "lucide-react";
import gsap from "gsap";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Badge animation
            tl.fromTo(
                ".hero-badge",
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
            );

            // Title animation - word by word
            tl.fromTo(
                ".hero-title-line",
                { opacity: 0, y: 80, rotateX: -30 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power4.out",
                },
                "-=0.3"
            );

            // Subtitle
            tl.fromTo(
                ".hero-subtitle",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

            // Search bar
            tl.fromTo(
                ".hero-search",
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );

            // CTA buttons
            tl.fromTo(
                ".hero-cta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.3"
            );

            // Stats
            tl.fromTo(
                ".hero-stat",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.2"
            );

            // Floating cards
            tl.fromTo(
                ".floating-card",
                { opacity: 0, scale: 0.8, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "back.out(1.5)",
                },
                "-=0.5"
            );

            // Background orbs animation
            gsap.to(".orb-1", {
                x: 100,
                y: -50,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".orb-2", {
                x: -80,
                y: 60,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".orb-3", {
                x: 60,
                y: 80,
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 grid-pattern opacity-30" />

                {/* Floating Orbs */}
                <div className="orb-1 absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="orb-2 absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px]" />
                <div className="orb-3 absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[80px]" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-transparent to-[#0a0f1d]" />
            </div>

            <div className="container-custom relative z-10 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div ref={textRef} className="space-y-8">
                        {/* Badge */}
                        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                                Live Investment Platform
                            </span>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                                <span className="hero-title-line block">Invest in</span>
                                <span className="hero-title-line block gradient-text">
                                    Premium Real
                                </span>
                                <span className="hero-title-line block">
                                    Estate{" "}
                                    <span className="text-white/20">Shares</span>
                                </span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="hero-subtitle text-lg text-white/50 max-w-lg leading-relaxed">
                            Own fractional shares in institutional-grade properties. Start
                            investing with as little as ৳5,000 and earn monthly rental income
                            from premium real estate across Bangladesh.
                        </p>

                        {/* Search Bar */}
                        <div
                            ref={searchRef}
                            className="hero-search relative max-w-xl"
                        >
                            <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/20 hover:border-white/15 transition-all duration-300">
                                <div className="flex items-center gap-2 px-4 flex-1">
                                    <Search className="w-5 h-5 text-white/30" />
                                    <Input
                                        placeholder="Search properties, locations..."
                                        className="border-0 bg-transparent text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-10"
                                    />
                                </div>
                                <div className="hidden sm:flex items-center gap-2 px-3 border-l border-white/10">
                                    <MapPin className="w-4 h-4 text-white/30" />
                                    <span className="text-sm text-white/30">Dhaka</span>
                                    <ChevronDown className="w-3 h-3 text-white/30" />
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 h-10 shadow-lg shadow-blue-500/20 ml-2"
                                >
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button className="hero-cta bg-blue-600 hover:bg-blue-500 text-white rounded-2xl px-8 py-6 text-sm font-semibold shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 group">
                                Explore Properties
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hero-cta border-white/10 text-white hover:bg-white/5 rounded-2xl px-8 py-6 text-sm font-semibold backdrop-blur-xl group"
                            >
                                <Play className="w-4 h-4 mr-2 text-blue-400" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div
                            ref={statsRef}
                            className="flex flex-wrap gap-8 pt-4"
                        >
                            {[
                                { value: "৳250M+", label: "Total Invested" },
                                { value: "2,500+", label: "Active Investors" },
                                { value: "18.5%", label: "Avg. Returns" },
                            ].map((stat) => (
                                <div key={stat.label} className="hero-stat">
                                    <div className="text-2xl font-bold font-heading text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-white/40 uppercase tracking-wider mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Hero Image & Floating Cards */}
                    <div ref={imageRef} className="relative hidden lg:block">
                        {/* Main Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-3xl gradient-border">
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/hero-property.png"
                                    alt="Premium Property"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent" />
                            </div>

                            {/* Image Overlay Badge */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="glass rounded-2xl p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Gulshan Heights
                                            </p>
                                            <p className="text-xs text-white/50 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                Gulshan, Dhaka
                                            </p>
                                        </div>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            +22%
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/40">Share Price</span>
                                        <span className="font-bold text-white">৳15,000</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full"
                                            style={{ width: "72%" }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-white/40">
                                        <span>72% Funded</span>
                                        <span>18 shares left</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card - Top Right */}
                        <div
                            ref={floatingRef}
                            className="floating-card absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Monthly Yield
                                    </p>
                                    <p className="text-xs text-emerald-400 font-medium">
                                        +৳12,500
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card - Bottom Left */}
                        <div className="floating-card absolute -bottom-4 -left-8 glass rounded-2xl p-4 animate-float-delayed shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Verified
                                    </p>
                                    <p className="text-xs text-white/50">
                                        RERA Approved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                    Scroll
                </span>
                <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
                    <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
