"use client";

import React, { useState, useEffect } from "react";
import { IdeaSearchHeader } from "@/components/ideas/IdeaSearchHeader";
import { IdeaToolbar } from "@/components/ideas/IdeaToolbar";
import PropertyCard from "@/components/PropertyCard";
import { cn } from "@/lib/utils";
import { propertyService, interactionService } from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, SearchX } from "lucide-react";

const sortOptions = [
    { id: "newest", name: "Newest Arrivals" },
    { id: "top_voted", name: "Most Upvoted" },
    { id: "valuation_high", name: "Highest Valuation" },
    { id: "valuation_low", name: "Lowest Valuation" }
];

export default function IdeaExplorerPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        sortBy: "newest"
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [propRes, catRes] = await Promise.all([
                propertyService.getAll({
                    search: filters.search || undefined,
                    category: filters.category === "all" ? undefined : filters.category,
                    sortBy: filters.sortBy
                }),
                interactionService.getCategories()
            ]);
            setProperties(propRes.data);

            // Add 'All' Category
            setCategories([
                { id: "all", name: "All Assets", icon: "🌐" },
                ...catRes.data
            ]);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to load properties. Please try again.");
            toast.error("Error loading marketplace data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    return (
        <div className="min-h-screen bg-[#0a0f1d] pt-24 pb-20">
            <IdeaSearchHeader
                searchTerm={filters.search}
                setSearchTerm={(val: string) => setFilters({ ...filters, search: val })}
            />

            <IdeaToolbar
                categories={categories}
                selectedCategory={filters.category}
                setSelectedCategory={(val: string) => setFilters({ ...filters, category: val })}
                sortBy={filters.sortBy}
                setSortBy={(val: string) => setFilters({ ...filters, sortBy: val })}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortOptions={sortOptions}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 gap-6"
                        >
                            <div className="relative">
                                <Loader2 size={48} className="text-blue-500 animate-spin" />
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                            </div>
                            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Accessing Global Ledger...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/5 border border-red-500/20 rounded-3xl p-20 text-center space-y-6 shadow-2xl shadow-red-500/10"
                        >
                            <AlertCircle size={64} className="text-red-500 mx-auto" />
                            <h2 className="text-2xl font-bold text-white leading-tight">System Authority Error</h2>
                            <p className="text-slate-400 max-w-md mx-auto font-medium text-sm">{error}</p>
                            <button
                                onClick={fetchData}
                                className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-red-500 transition-all shadow-xl shadow-red-900/40 active:scale-95"
                            >
                                Re-verify Connection
                            </button>
                        </motion.div>
                    ) : properties.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#151c2e] border border-white/5 rounded-3xl p-28 text-center space-y-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]" />
                            <div className="w-28 h-28 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 mx-auto border border-white/5 group-hover:border-blue-500/20 transition-all">
                                <SearchX size={56} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold text-white tracking-tight">Zero Matching Assets</h2>
                                <p className="text-slate-400 max-w-sm mx-auto font-medium text-sm leading-relaxed">No institutional grade assets were found matching your current parameters. Please adjust filters.</p>
                            </div>
                            <button
                                onClick={() => setFilters({ search: "", category: "all", sortBy: "newest" })}
                                className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 active:scale-95"
                            >
                                Reset Registry Filters
                            </button>
                        </motion.div>
                    ) : (
                        <div className={cn(
                            "grid gap-10",
                            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                        )}>
                            {properties.map((prop, idx) => (
                                <motion.div
                                    key={prop.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                                >
                                    <PropertyCard property={prop} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
