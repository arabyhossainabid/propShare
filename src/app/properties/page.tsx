"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MapPin,
    TrendingUp,
    Heart,
    ArrowUpRight,
    Eye,
    Search,
    SlidersHorizontal,
    Grid3X3,
    LayoutList,
    ChevronDown,
    Filter,
    Sparkles,
    Share2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allProperties = [
    {
        id: "1",
        title: "Luxury Waterfront Apartment",
        location: "Gulshan, Dhaka",
        price: 15000000,
        minInvestment: 50000,
        totalShares: 300,
        availableShares: 84,
        upvotes: 142,
        category: "Residential",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "2",
        title: "Commercial Office Tower",
        location: "Banani, Dhaka",
        price: 50000000,
        minInvestment: 100000,
        totalShares: 500,
        availableShares: 50,
        upvotes: 289,
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "3",
        title: "Modern Tech Hub Space",
        location: "Uttara, Dhaka",
        price: 32000000,
        minInvestment: 25000,
        totalShares: 128,
        availableShares: 45,
        upvotes: 156,
        category: "Tech Office",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "4",
        title: "Premium Shopping Mall",
        location: "Dhanmondi, Dhaka",
        price: 85000000,
        minInvestment: 200000,
        totalShares: 425,
        availableShares: 190,
        upvotes: 98,
        category: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "5",
        title: "Beachside Resort Villa",
        location: "Cox's Bazar",
        price: 22000000,
        minInvestment: 30000,
        totalShares: 220,
        availableShares: 78,
        upvotes: 215,
        category: "Vacation",
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "6",
        title: "Industrial Warehouse Complex",
        location: "Gazipur",
        price: 45000000,
        minInvestment: 75000,
        totalShares: 600,
        availableShares: 320,
        upvotes: 67,
        category: "Industrial",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "7",
        title: "Co-working Innovation Center",
        location: "Mirpur DOHS, Dhaka",
        price: 18000000,
        minInvestment: 15000,
        totalShares: 360,
        availableShares: 110,
        upvotes: 178,
        category: "Co-working",
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "8",
        title: "Skyline Penthouse Suite",
        location: "Bashundhara, Dhaka",
        price: 28000000,
        minInvestment: 60000,
        totalShares: 280,
        availableShares: 55,
        upvotes: 340,
        category: "Residential",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "9",
        title: "Heritage Business Center",
        location: "Motijheel, Dhaka",
        price: 65000000,
        minInvestment: 150000,
        totalShares: 650,
        availableShares: 280,
        upvotes: 112,
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop",
        featured: false,
    },
];

const filterCategories = [
    "All",
    "Residential",
    "Commercial",
    "Industrial",
    "Retail",
    "Co-working",
    "Vacation",
    "Tech Office",
];

export default function PropertiesPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredProperties = allProperties.filter((p) => {
        const matchesCategory =
            activeFilter === "All" || p.category === activeFilter;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".page-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                ".filter-bar",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Animate cards when filter changes
        gsap.fromTo(
            ".prop-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
            }
        );
    }, [activeFilter, searchQuery]);

    const fundedPercentage = (p: (typeof allProperties)[0]) =>
        Math.round(((p.totalShares - p.availableShares) / p.totalShares) * 100);

    return (
        <div ref={sectionRef} className="min-h-screen bg-[#0a0f1d] pt-28 pb-20">
            {/* Page Header */}
            <div className="container-custom">
                <div className="page-header space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                            Investment Opportunities
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
                        All <span className="gradient-text">Properties</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl">
                        Browse our complete collection of verified, high-yield
                        investment properties. Filter by category, search by name or
                        location.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar space-y-6 mb-12">
                    {/* Search & Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                            <Input
                                placeholder="Search properties, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 py-6 text-white placeholder:text-white/30 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                                className={`rounded-xl h-[52px] w-[52px] ${
                                    viewMode === "grid"
                                        ? "bg-blue-600 text-white"
                                        : "border-white/10 text-white/40 hover:bg-white/5"
                                }`}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                                className={`rounded-xl h-[52px] w-[52px] ${
                                    viewMode === "list"
                                        ? "bg-blue-600 text-white"
                                        : "border-white/10 text-white/40 hover:bg-white/5"
                                }`}
                            >
                                <LayoutList className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {filterCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeFilter === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-white/5"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-white/30">
                            Showing{" "}
                            <span className="text-white font-medium">
                                {filteredProperties.length}
                            </span>{" "}
                            properties
                        </p>
                        <button className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            Sort by: Popularity
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Properties Grid */}
                <div
                    className={`${
                        viewMode === "grid"
                            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "flex flex-col gap-4"
                    }`}
                >
                    {filteredProperties.map((property) =>
                        viewMode === "grid" ? (
                            <Link
                                href={`/properties/${property.id}`}
                                key={property.id}
                                className="prop-card group cursor-pointer"
                            >
                                <div className="bg-[#151c2e] rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700 h-full">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#151c2e] via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <Badge className="bg-black/50 backdrop-blur-xl text-white border-white/10 text-xs">
                                                    {property.category}
                                                </Badge>
                                                {property.featured && (
                                                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                                    <Heart className="w-3.5 h-3.5 text-white" />
                                                </button>
                                                <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                                    <Share2 className="w-3.5 h-3.5 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                High Yield
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                {property.title}
                                            </h3>
                                            <p className="text-sm text-white/40 flex items-center gap-1.5 mt-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {property.location}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white/[0.03] rounded-xl p-3">
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                    Property Value
                                                </p>
                                                <p className="text-sm font-bold text-white mt-1">
                                                    ৳{(property.price / 100000).toFixed(0)}L
                                                </p>
                                            </div>
                                            <div className="bg-white/[0.03] rounded-xl p-3">
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                    Min. Investment
                                                </p>
                                                <p className="text-sm font-bold text-blue-400 mt-1">
                                                    ৳{property.minInvestment.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-white/40">Funding Progress</span>
                                                <span className="text-white font-medium">
                                                    {fundedPercentage(property)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-1.5">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full"
                                                    style={{ width: `${fundedPercentage(property)}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] text-white/30">
                                                <span>
                                                    {property.totalShares - property.availableShares}/{property.totalShares} shares
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {property.upvotes}
                                                </span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl py-5 transition-all duration-300 group/btn">
                                            Invest Now
                                            <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            /* List View */
                            <Link
                                href={`/properties/${property.id}`}
                                key={property.id}
                                className="prop-card group cursor-pointer"
                            >
                                <div className="bg-[#151c2e] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-72 aspect-[16/10] md:aspect-auto overflow-hidden shrink-0">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge className="bg-black/50 backdrop-blur-xl text-white border-white/10 text-xs">
                                                {property.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {property.title}
                                            </h3>
                                            <p className="text-sm text-white/40 flex items-center gap-1.5 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {property.location}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                    Value
                                                </p>
                                                <p className="text-sm font-bold text-white">
                                                    ৳{(property.price / 100000).toFixed(0)}L
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                    Min. Investment
                                                </p>
                                                <p className="text-sm font-bold text-blue-400">
                                                    ৳{property.minInvestment.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider">
                                                    Funded
                                                </p>
                                                <p className="text-sm font-bold text-emerald-400">
                                                    {fundedPercentage(property)}%
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <Button className="bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all duration-300">
                                                    Invest Now
                                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </div>

                {/* Empty State */}
                {filteredProperties.length === 0 && (
                    <div className="text-center py-20 space-y-4">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto">
                            <Filter className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            No properties found
                        </h3>
                        <p className="text-white/40">
                            Try adjusting your filters or search query.
                        </p>
                        <Button
                            onClick={() => {
                                setActiveFilter("All");
                                setSearchQuery("");
                            }}
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5 rounded-xl"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
