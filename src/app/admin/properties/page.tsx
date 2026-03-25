"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, CheckCircle, XCircle, Clock, Eye, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const allProperties = [
    { id: "1", title: "Aurora Waterfront Residences", owner: "Rahim Khan", category: "Residential", status: "approved", date: "Mar 10, 2026", target: "৳1.5Cr" },
    { id: "2", title: "Tech Co-working Hub", owner: "Fatima Akter", category: "Co-working", status: "under_review", date: "Mar 18, 2026", target: "৳45L" },
    { id: "3", title: "Luxury Beach Villa", owner: "Rahim Khan", category: "Vacation", status: "under_review", date: "Mar 21, 2026", target: "৳85L" },
    { id: "4", title: "Downtown Office Space", owner: "Nadia Islam", category: "Commercial", status: "under_review", date: "Mar 20, 2026", target: "৳1.2Cr" },
    { id: "5", title: "Riverside Restaurant", owner: "Sakib Ahmed", category: "Commercial", status: "rejected", date: "Feb 15, 2026", target: "৳30L" },
];

const statusStyles: Record<string, string> = {
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    under_review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminPropertiesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = allProperties.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">Property Moderation</h1>
                    <p className="text-sm text-white/40 mt-1">Review, approve, or reject property listings.</p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">{allProperties.filter(p => p.status === 'under_review').length} Pending</Badge>
                </div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Search properties or owners..." 
                        className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30" 
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "under_review", "approved", "rejected"].map((s) => (
                        <button 
                            key={s} 
                            onClick={() => setStatusFilter(s)} 
                            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${statusFilter === s ? "bg-blue-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}
                        >
                            {s === "under_review" ? "Under Review" : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Property List */}
            <div className="space-y-3">
                {filtered.map((p) => (
                    <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                                        <Badge className={`text-[10px] ${statusStyles[p.status]}`}>
                                            {p.status === "under_review" ? "Under Review" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-white/30 mt-1">Owner: <span className="text-white/60">{p.owner}</span> · Target: <span className="text-white/60">{p.target}</span></p>
                                    <p className="text-[10px] text-white/20 mt-1 uppercase tracking-wider">{p.category} · Submitted {p.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                {p.status === "under_review" ? (
                                    <Link href={`/admin/properties/${p.id}/review`}>
                                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs h-9 px-4">
                                            Review Now
                                            <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={`/properties/${p.id}`}>
                                        <Button variant="outline" className="border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-xs h-9 px-4">
                                            View Listing
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
                        <p className="text-white/20 text-sm">No properties found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
