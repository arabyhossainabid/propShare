"use client";

import React from "react";
import Link from "next/link";
import {
    MapPin,
    TrendingUp,
    Users,
    ChevronRight,
    Star,
    ArrowUpRight,
    Search,
    ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        location: string;
        price: number;
        minInvestment: number;
        totalShares: number;
        availableShares: number;
        upvotes: number;
        category: string;
        image: string;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const percentSold = Math.round(((property.totalShares - property.availableShares) / property.totalShares) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            key={property.id}
            className="group bg-[#151c2e] rounded-2xl border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-blue-900/20 hover:-translate-y-3 transition-all duration-700 overflow-hidden flex flex-col h-full relative"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden m-3 rounded-2xl">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
                />

                {/* Floating Labels */}
                <div className="absolute top-5 left-5 flex gap-2 z-10">
                    <span className="px-4 py-1.5 bg-[#0a0f1d]/80 backdrop-blur-xl rounded-2xl text-[9px] font-bold text-blue-400 shadow-2xl uppercase tracking-[0.2em] border border-white/5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-2xl animate-pulse" />
                        {property.category}
                    </span>
                    {property.upvotes > 50 && (
                        <span className="px-4 py-1.5 bg-emerald-500/80 backdrop-blur-xl rounded-2xl text-[9px] font-bold text-white shadow-2xl flex items-center gap-2 uppercase tracking-[0.2em]">
                            <Star size={10} className="fill-white" />
                            Tier-1
                        </span>
                    )}
                </div>

                <Link
                    href={`/ideas/${property.id}`}
                    className="absolute top-5 right-5 h-12 w-12 bg-[#0a0f1d]/80 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/5 shadow-2xl cursor-pointer hover:bg-blue-600 hover:scale-110 transition-all transform active:scale-95 group/btn z-10"
                >
                    <ArrowUpRight size={22} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>

                {/* Progress Bar overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5 backdrop-blur-md">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentSold}%` }}
                        transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                        className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] relative"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col grow space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] px-1">
                        <MapPin size={14} className="text-blue-500/50" />
                        {property.location}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-[1.2] tracking-tighter">
                        {property.title}
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 hidden sm:block" />
                    <div className="space-y-1.5">
                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Registry Valuation</p>
                        <p className="text-xl font-bold text-white tracking-tighter">{formatCurrency(property.price)}</p>
                    </div>
                    <div className="space-y-1.5 sm:pl-4">
                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Entry Threshold</p>
                        <p className="text-xl font-bold text-blue-500 tracking-tighter">{formatCurrency(property.minInvestment)}</p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3 overflow-hidden">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="inline-block h-9 w-9 rounded-2xl border-2 border-[#151c2e] bg-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/5">
                                    <img src={`https://avatar.iran.liara.run/public/${i + 30}`} alt="Authorized Node" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white tracking-widest">{property.upvotes}+</span>
                            <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Authorized Nodes</span>
                        </div>
                    </div>

                    <Link
                        href={`/ideas/${property.id}`}
                        className="flex items-center gap-3 font-bold text-[10px] text-blue-500 hover:text-white transition-all uppercase tracking-[0.3em] group/link p-2 -mr-2"
                    >
                        <span className="relative">
                            Analyze
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover/link:w-full" />
                        </span>
                        <ChevronRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Regulatory Badge */}
            <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#0a0f1d] border border-white/5 rounded-2xl text-[7px] font-bold text-slate-600 tracking-[0.2em] uppercase whitespace-nowrap">
                    <ShieldCheck size={10} className="text-emerald-500" /> SECURED ASSET
                </div>
            </div>
        </motion.div>
    );
}
