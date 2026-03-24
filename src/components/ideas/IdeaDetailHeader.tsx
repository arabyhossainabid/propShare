"use client";

import React from "react";
import { ArrowLeft, Share2, Heart, Flag, MapPin } from "lucide-react";
import Link from "next/link";

interface IdeaDetailHeaderProps {
    title: string;
    category: string;
    location?: string;
}

export function IdeaDetailHeader({ title, category, location }: IdeaDetailHeaderProps) {
    return (
        <div className="space-y-8">
            <Link href="/ideas" className="group inline-flex items-center gap-3 text-slate-500 hover:text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Registry Terminal
            </Link>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="bg-blue-600/10 text-blue-500 px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] border border-blue-500/20 shadow-lg">
                            {category}
                        </span>
                        <span className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            Protocol Verified
                        </span>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight tracking-tight">
                            {title}
                        </h1>
                        {location && (
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                <MapPin size={14} className="text-blue-500" /> {location}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    {[Share2, Heart, Flag].map((Icon, i) => (
                        <button key={i} className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all active:scale-95 shadow-2xl group">
                            <Icon size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
