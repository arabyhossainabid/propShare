"use client";

import React from "react";
import {
    Building2,
    MapPin,
    Calendar,
    ArrowRight,
    ShieldCheck,
    TrendingUp
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import Link from "next/link";

interface MyInvestmentsTableProps {
    investments: any[];
}

export function MyInvestmentsTable({ investments }: MyInvestmentsTableProps) {
    return (
        <div className="bg-[#151c2e] rounded-3xl border border-white/5 shadow-2xl overflow-hidden p-6 md:p-10 space-y-8 animate-in fade-in duration-1000 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-4 tracking-tight">
                        <Building2 size={28} className="text-blue-500" />
                        Active Asset Registry
                    </h2>
                    <p className="text-slate-500 text-sm font-medium max-w-lg leading-relaxed">Systematic valuation of fractional real estate holdings within your digital portfolio.</p>
                </div>
                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 border border-white/5 transition-all active:scale-95 shadow-2xl">
                    Generate Audit Report <ArrowRight size={16} className="text-blue-500" />
                </button>
            </div>

            <div className="overflow-x-auto no-scrollbar relative z-10">
                <table className="w-full text-left border-separate border-spacing-y-5">
                    <thead>
                        <tr className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                            <th className="pb-4 px-8">Class & Designation</th>
                            <th className="pb-4 px-8">Initial Allocation</th>
                            <th className="pb-4 px-8">Market Performance</th>
                            <th className="pb-4 px-8">Security Status</th>
                            <th className="pb-4 px-8 text-right">Registry</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {investments.map((inv) => (
                            <tr key={inv.id} className="group transition-all duration-500">
                                <td className="py-6 px-8 bg-white/5 first:rounded-l-2xl group-hover:bg-white/10 border-y border-transparent transition-all shadow-xl">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-slate-500 border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                                            <Building2 size={22} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="font-bold text-white text-base leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tight">{inv.property?.title || "Asset Portfolio"}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                                                <MapPin size={12} className="text-blue-500" />
                                                {inv.property?.location || "Global Region"}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-8 bg-white/5 group-hover:bg-white/10 border-y border-transparent transition-all shadow-xl">
                                    <div className="space-y-2">
                                        <p className="text-white font-bold text-xl tracking-tighter">{formatCurrency(inv.amount)}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest py-1 px-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                {inv.shares} Fractional Shares
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-8 bg-white/5 group-hover:bg-white/10 border-y border-transparent transition-all shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-2xl text-[10px] font-bold border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                                            +12.4% APR
                                        </div>
                                        <TrendingUp size={20} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                                    </div>
                                </td>
                                <td className="py-6 px-8 bg-white/5 group-hover:bg-white/10 border-y border-transparent transition-all shadow-xl">
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                                            <ShieldCheck size={18} className="text-blue-500" />
                                            Active Ledger
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-bold flex items-center gap-2 tracking-widest">
                                            <Calendar size={14} className="text-blue-500" /> {formatDate(inv.createdAt)}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-6 px-8 bg-white/5 last:rounded-r-2xl text-right group-hover:bg-white/10 border-y border-transparent transition-all shadow-xl">
                                    <Link
                                        href={`/ideas/${inv.propertyId}`}
                                        className="inline-flex w-12 h-12 bg-[#0a0f1d] border border-white/10 rounded-2xl items-center justify-center text-slate-500 group-hover:text-blue-500 group-hover:border-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
                                    >
                                        <ArrowRight size={20} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {investments.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 animate-in zoom-in-95 duration-700 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-slate-700 mx-auto shadow-2xl mb-10 border border-white/5 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={48} />
                    </div>
                    <div className="space-y-4 relative z-10">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Registry Currently Empty</h3>
                        <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">Establish your first institutional real estate position to generate verified protocol yield.</p>
                    </div>
                    <div className="pt-10">
                        <Link href="/ideas" className="bg-blue-600 text-white px-14 py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-blue-500/30 hover:bg-blue-500 active:scale-95 transition-all">
                            Scan Assets
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
