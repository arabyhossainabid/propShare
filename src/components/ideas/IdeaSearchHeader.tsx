"use client";

import React from "react";
import { Search } from "lucide-react";

interface IdeaSearchHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export function IdeaSearchHeader({ searchTerm, setSearchTerm }: IdeaSearchHeaderProps) {
    return (
        <section className="bg-[#0a0f1d] pt-28 pb-24 px-4 md:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 pt-12">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
                        Discover <span className="text-blue-500">Asset Velocity</span>
                    </h1>
                    <p className="text-slate-400 text-base max-w-xl mx-auto font-medium leading-relaxed">
                        Access institutional-grade fractional real estate opportunities curated for high-performance portfolio growth.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-all" size={20} />
                    <input
                        type="text"
                        placeholder="Search location, asset class or yield..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl py-5.5 pl-16 pr-32 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all shadow-[0_0_50px_rgba(0,0,0,0.3)] font-medium"
                    />
                    <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 active:scale-95 transition-all">
                        Registry
                    </button>
                </div>
            </div>
        </section>
    );
}
