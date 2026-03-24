"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    PlusCircle,
    Send,
    Instagram,
    Twitter,
    Linkedin,
    Facebook,
    Mail,
    MapPin,
    Phone,
    Building2,
    ShieldCheck,
    Globe,
    Lock,
    Zap
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Identity Synced. Welcome to the Registry.", {
                position: "bottom-center",
                duration: 4000,
                style: {
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: "24px",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }
            });
            setEmail("");
        } catch (error) {
            toast.error("Transmission interruption.");
        } finally {
            setLoading(false);
        }
    };

    const footerLinks = [
        {
            title: "Exchange Vault",
            links: [
                { name: "About Protocol", href: "/about" },
                { name: "Governance Matrix", href: "/team" },
                { name: "Whitepaper v2.0", href: "/how-it-works" },
                { name: "Support Terminal", href: "/contact" }
            ]
        },
        {
            title: "Policy & Safety",
            links: [
                { name: "Risk Disclosure", href: "/help" },
                { name: "Security Audit", href: "/terms" },
                { name: "Privacy Protocol", href: "/privacy" },
                { name: "Transparency Log", href: "/careers" }
            ]
        },
        {
            title: "Market Access",
            links: [
                { name: "Active Terminal", href: "/ideas" },
                { name: "Asset Registry", href: "/dashboard" },
                { name: "Yield Analytics", href: "/ideas?sortBy=top_voted" },
                { name: "Registry Feed", href: "/ideas?sortBy=newest" }
            ]
        }
    ];

    return (
        <footer className="relative bg-[#0a0f1d] pt-32 pb-16 overflow-hidden border-t border-white/5">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-16 mb-24">

                    {/* Brand and Newsletter */}
                    <div className="lg:col-span-6 space-y-12">
                        <Link href="/" className="flex items-center gap-4 group relative z-10 w-fit">
                            <div className="w-12 h-12 bg-blue-600 rounded-[18px] flex items-center justify-center text-white shadow-3xl shadow-blue-500/30 transition-all group-hover:rotate-12 group-hover:scale-110 active:scale-95">
                                <Building2 size={28} />
                            </div>
                            <span className="text-3xl font-bold font-heading text-white tracking-tighter">
                                Prop<span className="text-blue-500">Share</span>
                            </span>
                        </Link>

                        <p className="text-slate-500 text-lg leading-relaxed max-w-lg font-medium opacity-80">
                            The institutional gateway to fractional commercial real estate.
                            Secure your position in Tier-1 assets with surgical digital precision via our global exchange protocol.
                        </p>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-1">
                                <Zap size={14} className="animate-pulse" /> Registry Briefing System
                            </div>
                            <form onSubmit={handleSubscribe} className="relative max-w-md flex flex-col sm:flex-row gap-5 group/form">
                                <div className="relative grow">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/form:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        placeholder="Professional Node Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#151c2e] border border-white/5 rounded-[22px] py-5.5 pl-16 pr-6 text-white placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 shadow-inner transition-all text-sm font-bold tracking-tight"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 text-white px-10 py-5.5 rounded-[22px] font-bold transition-all shadow-3xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10">{loading ? "Establishing..." : "Sync Node"}</span>
                                    <Send size={18} className={loading ? "hidden" : "block shadow-sm relative z-10"} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16 pt-4">
                        {footerLinks.map((section) => (
                            <div key={section.title} className="space-y-10 group/section">
                                <h4 className="text-white font-bold text-[11px] font-heading uppercase tracking-[0.4em] opacity-40 group-hover/section:opacity-100 transition-opacity duration-500">{section.title}</h4>
                                <ul className="space-y-6">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-slate-600 hover:text-blue-500 transition-all font-bold text-[10px] uppercase tracking-[0.2em] inline-block relative group"
                                            >
                                                {link.name}
                                                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-blue-500 transition-all duration-500 group-hover:w-full" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                        <div className="flex items-center gap-4 bg-white/2 py-2.5 px-6 rounded-full border border-white/5 order-2 md:order-1">
                            <Lock size={14} className="text-emerald-500" />
                            <p className="text-slate-700 text-[9px] font-bold uppercase tracking-[0.3em]">
                                Registry v1.0.4-STABLE
                            </p>
                        </div>
                        <p className="text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em] order-1 md:order-2">
                            &copy; {new Date().getFullYear()} PROPSHARE GLOBAL ASSET EXCHANGE
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-[9px] text-slate-800 font-bold uppercase tracking-[0.4em] mr-4 hidden xl:block">Connect Terminal:</p>
                        {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-12 h-12 rounded-[18px] bg-[#151c2e] border border-white/5 flex items-center justify-center text-slate-700 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all shadow-3xl active:scale-90 group"
                            >
                                <Icon size={20} className="group-hover:scale-110 transition-transform duration-500" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 text-slate-800 text-[8px] font-bold uppercase tracking-[0.6em] opacity-40">
                        <Globe size={12} /> GLOBAL REAL ESTATE LEDGER ACCESS
                    </div>
                </div>
            </div>
        </footer>
    );
}
