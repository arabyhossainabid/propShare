"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Calendar, Eye, ArrowUpRight, DollarSign, Filter } from "lucide-react";

const investments = [
    { id: 1, property: "Aurora Waterfront Residences", category: "Residential", shares: 10, pricePerShare: 50000, totalAmount: 500000, currentValue: 610000, returnPct: "+22%", date: "Mar 15, 2026", status: "active", nextPayout: "Apr 15, 2026" },
    { id: 2, property: "Skyline Business Hub", category: "Commercial", shares: 5, pricePerShare: 75000, totalAmount: 375000, currentValue: 442500, returnPct: "+18%", date: "Feb 28, 2026", status: "active", nextPayout: "Apr 28, 2026" },
    { id: 3, property: "Green Valley Homes", category: "Residential", shares: 8, pricePerShare: 25000, totalAmount: 200000, currentValue: 240000, returnPct: "+20%", date: "Jan 10, 2026", status: "active", nextPayout: "May 10, 2026" },
    { id: 4, property: "Metro Tech Park", category: "Co-working", shares: 15, pricePerShare: 40000, totalAmount: 600000, currentValue: 744000, returnPct: "+24%", date: "Dec 5, 2025", status: "active", nextPayout: "Apr 5, 2026" },
    { id: 5, property: "Heritage Mall Complex", category: "Retail", shares: 3, pricePerShare: 100000, totalAmount: 300000, currentValue: 285000, returnPct: "-5%", date: "Nov 20, 2025", status: "completed", nextPayout: "—" },
];

const totalInvested = investments.reduce((s, i) => s + i.totalAmount, 0);
const totalCurrentValue = investments.reduce((s, i) => s + i.currentValue, 0);
const totalGain = totalCurrentValue - totalInvested;

export default function InvestmentsPage() {
    const [filter, setFilter] = useState("all");
    const filtered = filter === "all" ? investments : investments.filter((i) => i.status === filter);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">My Investments</h1>
                <p className="text-sm text-white/40 mt-1">Track and manage all your property investments.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Invested", value: `৳${(totalInvested / 100000).toFixed(1)}L`, icon: DollarSign, color: "blue" },
                    { label: "Current Value", value: `৳${(totalCurrentValue / 100000).toFixed(1)}L`, icon: TrendingUp, color: "emerald" },
                    { label: "Total Gain", value: `৳${(totalGain / 1000).toFixed(0)}K`, icon: ArrowUpRight, color: totalGain >= 0 ? "emerald" : "red" },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`w-4 h-4 ${s.color === "emerald" ? "text-emerald-400" : s.color === "red" ? "text-red-400" : "text-blue-400"}`} />
                                <span className="text-xs text-white/30 uppercase tracking-wider">{s.label}</span>
                            </div>
                            <p className="text-2xl font-bold font-heading">{s.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-white/20" />
                {["all", "active", "completed"].map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Investment List */}
            <div className="space-y-3">
                {filtered.map((inv) => (
                    <Link href={`/properties/${inv.id}`} key={inv.id} className="block">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all group">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Building2 className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{inv.property}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                                            <span>{inv.category}</span>
                                            <span>{inv.shares} shares</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{inv.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-bold text-white">৳{inv.currentValue.toLocaleString()}</p>
                                    <p className={`text-xs font-semibold ${inv.returnPct.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{inv.returnPct}</p>
                                    <p className="text-[10px] text-white/20 mt-0.5">Next: {inv.nextPayout}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
