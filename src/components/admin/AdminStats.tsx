"use client";

import React from "react";
import {
    Users,
    DollarSign,
    Building2,
    TrendingUp,
    Info,
    Activity,
    Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const adminStats = [
    { label: "Global Users", value: "4,829", icon: Users, color: "text-blue-500", trend: "+12.4%" },
    { label: "Protocol Capital", value: "$4.2M", icon: DollarSign, color: "text-emerald-500", trend: "+8.2%" },
    { label: "Review Backlog", value: "24", icon: Info, color: "text-orange-500", trend: "-2" },
    { label: "Verified Registry", value: "112", icon: Building2, color: "text-purple-500", trend: "+5" }
];

export default function AdminStats() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">
                        <Activity size={14} /> System Operational Status
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-white tracking-tight leading-tight">Master <span className="text-blue-500">Registry</span> Control</h2>
                    <p className="text-slate-500 text-base font-medium max-w-lg leading-relaxed">Real-time performance indicators and institutional volume tracking.</p>
                </div>
                <div className="bg-white/2 p-1.5 rounded-3xl border border-white/5 flex gap-2 shadow-2xl backdrop-blur-3xl">
                    {["24H", "7D", "30D", "MAX"].map(v => (
                        <button key={v} className={cn("px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all", v === "30D" ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-slate-500 hover:text-white hover:bg-white/5")}>{v}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {adminStats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        key={i}
                        className="bg-[#151c2e] p-6 rounded-2xl border border-white/5 shadow-2xl relative group overflow-hidden hover:shadow-blue-900/20 transition-all duration-700"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-50 group-hover:rotate-12 group-hover:scale-150 transition-all duration-1000 pointer-events-none">
                            <stat.icon size={120} className="text-white" />
                        </div>
                        <div className="absolute top-8 right-8 z-10">
                            <span className={cn(
                                "px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-white/5 shadow-lg",
                                stat.trend.startsWith("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            )}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className={cn("w-14 h-14 rounded-2xl bg-[#0a0f1d] flex items-center justify-center mb-6 border border-white/5 shadow-inner", stat.color)}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-[#151c2e] p-8 rounded-3xl border border-white/5 shadow-2xl h-96 flex flex-col items-center justify-center text-slate-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
                    <TrendingUp size={64} className="mb-6 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                    <p className="font-bold text-base uppercase tracking-[0.3em] italic opacity-10">Protocol Projection Matrix Active</p>
                    <div className="absolute bottom-10 left-10 flex items-center gap-3 text-slate-800 text-[9px] font-bold uppercase tracking-widest p-4 rounded-2xl bg-white/2 border border-white/5">
                        <Cpu size={14} className="animate-pulse" /> Real-time Simulation Engine Running
                    </div>
                </div>
                <div className="lg:col-span-4 bg-[#151c2e] p-8 rounded-3xl border border-white/5 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-transparent" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                                <Info size={20} />
                            </div>
                            <h4 className="font-bold text-lg uppercase tracking-widest">Protocol Alerts</h4>
                        </div>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0 group/alert">
                                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-slate-600 shrink-0 group-hover/alert:bg-blue-600 group-hover/alert:text-white transition-all shadow-lg border border-white/5">
                                        <Info size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-600 font-bold mb-1 uppercase tracking-widest">{i * 8}m ago</p>
                                        <p className="text-xs font-medium leading-relaxed text-slate-400 group-hover/alert:text-white transition-colors">Sector node {i} reporting high institutional volume on registry endpoints.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
