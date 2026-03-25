"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Rafiq Ahmed",
        role: "Property Investor",
        avatar: "https://avatar.iran.liara.run/public/1",
        rating: 5,
        text: "PropShare transformed my investment strategy. I now own shares in 5 premium properties across Dhaka with consistent monthly returns of 18%. The platform is incredibly transparent.",
        invested: "৳500,000",
        returns: "22%",
    },
    {
        name: "Fatima Begum",
        role: "Business Owner",
        avatar: "https://avatar.iran.liara.run/public/2",
        rating: 5,
        text: "As a first-time real estate investor, I was nervous. But PropShare's verification process and detailed property reports gave me complete confidence. Started with just ৳10,000!",
        invested: "৳200,000",
        returns: "19%",
    },
    {
        name: "Kamal Hassan",
        role: "Tech Professional",
        avatar: "https://avatar.iran.liara.run/public/3",
        rating: 5,
        text: "The real-time dashboard is phenomenal. I can track my rental income, property valuations, and portfolio performance all in one place. Best investment platform in Bangladesh.",
        invested: "৳1,200,000",
        returns: "24%",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".test-header",
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
                ".testimonial-card",
                { opacity: 0, y: 60, rotateX: 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".testimonials-grid",
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="test-header text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20">
                        <Star className="w-3 h-3 text-rose-400 fill-rose-400" />
                        <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">
                            Investor Stories
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Trusted by{" "}
                        <span className="gradient-text">2,500+ Investors</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Real stories from real investors who have grown their
                        wealth through PropShare's fractional ownership platform.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.name}
                            className="testimonial-card group"
                        >
                            <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full flex flex-col">
                                {/* Quote Icon */}
                                <Quote className="w-8 h-8 text-blue-500/20 mb-4" />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 text-amber-400 fill-amber-400"
                                            />
                                        )
                                    )}
                                </div>

                                {/* Text */}
                                <p className="text-sm text-white/60 leading-relaxed flex-1 mb-6">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                {/* Stats */}
                                <div className="flex gap-4 mb-6">
                                    <div className="bg-white/[0.03] rounded-xl px-4 py-2">
                                        <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                            Invested
                                        </p>
                                        <p className="text-sm font-bold text-white">
                                            {testimonial.invested}
                                        </p>
                                    </div>
                                    <div className="bg-emerald-500/5 rounded-xl px-4 py-2">
                                        <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                            Returns
                                        </p>
                                        <p className="text-sm font-bold text-emerald-400">
                                            {testimonial.returns}
                                        </p>
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-xs text-white/40">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
