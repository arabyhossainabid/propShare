"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import CTA from "@/components/home/CTA";
import FeaturedPreview from "@/components/home/FeaturedPreview";
import CategoriesPreview from "@/components/home/CategoriesPreview";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-0 overflow-x-hidden bg-[#0a0f1d]">
            <Hero />
            <StatsBar />
            <FeaturedPreview />
            <CategoriesPreview />
            <CTA />
        </div>
    );
}
