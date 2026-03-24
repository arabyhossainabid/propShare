"use client";

import React from "react";
import {
    DollarSign,
    TrendingUp,
    Layers,
    Activity
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface DashboardStatsProps {
    investments: any[];
}

export function DashboardStats({ investments }: DashboardStatsProps) {
    const totalValue = investments.reduce((acc, inv) => acc + (inv.amount || 0), 0);
    const totalShares = investments.reduce((acc, inv) => acc + (inv.shares || 0), 0);
    const monthlyYield = totalValue * 0.01; // Mock 12.4% annual = ~1% monthly

    const stats = [
        { label: "Portfolio Value", value: formatCurrency(totalValue), icon: DollarSign, color: "text-blue-500", shadow: "shadow-blue-500/20" },
        { label: "Estimated Yield", value: formatCurrency(monthlyYield), icon: TrendingUp, color: "text-emerald-500", shadow: "shadow-emerald-500/20" },
        { label: "Active Shares", value: totalShares.toString(), icon: Layers, color: "text-purple-500", shadow: "shadow-purple-500/20" },
        { label: "Performance", value: "12.4%", icon: Activity, color: "text-orange-500", shadow: "shadow-orange-500/20" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-[#151c2e] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group hover:shadow-blue-900/30 transition-all duration-700">
                    <div className={cn(
                        "w-14 h-14 rounded-2xl bg-[#0a0f1d] flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform shadow-inner",
                        stat.color,
                        stat.shadow
                    )}>
                        <stat.icon size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                    </div>

                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 scale-50 group-hover:scale-200 transition-all duration-1000 rotate-12 pointer-events-none">
                        <stat.icon size={120} className="text-white" />
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
            ))}
        </div>
    );
}
