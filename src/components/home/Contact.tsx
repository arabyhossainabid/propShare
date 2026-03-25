"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageSquare,
    ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["Road 11, Block E", "Banani, Dhaka 1213"],
        color: "blue",
    },
    {
        icon: Phone,
        title: "Call Us",
        details: ["+880 1XXXXXXXXX", "+880 1XXXXXXXXX"],
        color: "emerald",
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["hello@propshare.com", "support@propshare.com"],
        color: "purple",
    },
    {
        icon: Clock,
        title: "Office Hours",
        details: ["Mon - Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
        color: "amber",
    },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-header",
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
                ".contact-info-card",
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-grid",
                        start: "top 85%",
                    },
                }
            );

            gsap.fromTo(
                ".contact-form",
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-grid",
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Frontend only - no API integration
        console.log("Form data:", formData);
    };

    return (
        <section ref={sectionRef} id="contact" className="section-padding relative">
            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="contact-header text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        <MessageSquare className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                            Get in Touch
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Let&apos;s Start{" "}
                        <span className="gradient-text">Building Wealth</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Have questions about PropShare? Our investment advisors are
                        ready to help you start your real estate journey.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="contact-grid grid lg:grid-cols-5 gap-8">
                    {/* Info Cards */}
                    <div className="lg:col-span-2 space-y-4">
                        {contactInfo.map((info) => {
                            const Icon = info.icon;
                            const colors = colorMap[info.color];
                            return (
                                <div
                                    key={info.title}
                                    className="contact-info-card group"
                                >
                                    <div className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                        <div
                                            className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon className={`w-5 h-5 ${colors.text}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white mb-1">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail) => (
                                                <p
                                                    key={detail}
                                                    className="text-sm text-white/40"
                                                >
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form lg:col-span-3">
                        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-10">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                            Full Name
                                        </label>
                                        <Input
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="bg-white/5 border-white/10 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="bg-white/5 border-white/10 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                        Subject
                                    </label>
                                    <Input
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        className="bg-white/5 border-white/10 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                                        Message
                                    </label>
                                    <textarea
                                        placeholder="Tell us about your investment goals..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/20 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 outline-none resize-none transition-all"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-6 text-sm font-semibold shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 group"
                                >
                                    Send Message
                                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
