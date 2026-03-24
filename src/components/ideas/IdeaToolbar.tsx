"use client";

import React from "react";
import {
    SlidersHorizontal,
    ChevronDown,
    Grid2X2,
    List
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaToolbarProps {
    categories: any[];
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    sortBy: string;
    setSortBy: (id: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    sortOptions: any[];
}

export function IdeaToolbar({
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    sortOptions
}: IdeaToolbarProps) {
    return (
        <div className="sticky top-[72px] z-40 bg-[#0a0f1d]/60 backdrop-blur-2xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 grow">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap border",
                                selectedCategory === cat.id
                                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                                    : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <span className="text-sm">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <div className="relative group">
                        <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                            <SlidersHorizontal size={14} className="text-blue-500" />
                            Sort: <span className="text-white">{sortOptions.find(o => o.id === sortBy)?.name}</span>
                            <ChevronDown size={14} className="opacity-50" />
                        </button>
                    </div>

                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-2 rounded-xl transition-all",
                                viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Grid2X2 size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "p-2 rounded-xl transition-all",
                                viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
