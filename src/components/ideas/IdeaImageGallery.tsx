"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaImageGalleryProps {
    images: string[];
}

export function IdeaImageGallery({ images }: IdeaImageGalleryProps) {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className="space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-xl group">
                <img
                    src={images[activeIdx]}
                    alt="Property Main View"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Gallery Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20 active:scale-95 shadow-xl shadow-blue-900/10"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20 active:scale-95 shadow-xl shadow-blue-900/10"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
                    <button className="w-10 h-10 bg-slate-900/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20 active:scale-95">
                        <Expand size={18} />
                    </button>
                </div>

                <div className="absolute bottom-5 right-5 z-10">
                    <div className="bg-slate-900/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-white font-bold text-[9px] uppercase tracking-[0.2em] shadow-lg">
                        {activeIdx + 1} / {images.length}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={cn(
                            "relative aspect-video rounded-xl overflow-hidden border-2 transition-all p-0",
                            activeIdx === idx ? "border-blue-600 scale-100 shadow-lg" : "border-transparent opacity-60 hover:opacity-100 scale-95"
                        )}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
