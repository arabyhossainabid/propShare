"use client";

import React, { useState } from "react";
import {
    DollarSign,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Info,
    Layers,
    Zap,
    Loader2,
    Lock
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { investmentService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface InvestmentWidgetProps {
    propertyId: string;
    price: number;
    minInvestment: number;
    availableShares: number;
    totalShares: number;
}

export function InvestmentWidget({ propertyId, price, minInvestment, availableShares, totalShares }: InvestmentWidgetProps) {
    const { user } = useAuth();
    const [shares, setShares] = useState(1);
    const sharePrice = price / totalShares;
    const totalCost = shares * sharePrice;
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInvest = async () => {
        if (!user) return toast.error("Institutional access required. Please login.");
        if (availableShares === 0) return toast.error("Registry filled. Sold out!");

        setIsProcessing(true);
        try {
            const response = await investmentService.checkout(propertyId, shares);
            const { checkoutUrl } = response.data;

            toast.success("Synchronizing with Secure Payment Protocol...");
            window.location.href = checkoutUrl;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Protocol transmission failure.");
        } finally {
            setIsProcessing(false);
        }
    };

    const percentFunded = Math.round(((totalShares - availableShares) / totalShares) * 100);

    return (
        <div className="bg-[#151c2e] rounded-3xl border border-white/5 shadow-2xll p-6 md:p-10 space-y-10 relative overflow-hidden group/main">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                <div className="space-y-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                        Institutional Valuation
                        <Info size={14} className="text-blue-500/40" />
                    </p>
                    <h2 className="text-3xl font-bold text-white leading-none tracking-tighter">
                        {formatCurrency(price)}
                    </h2>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-2xl flex items-center gap-2.5 border border-emerald-500/20 shadow-lg">
                    <TrendingUp size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]">12.4% Yield Target</span>
                </div>
            </div>

            <div className="space-y-7 relative z-10">
                <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">
                    <span className="flex items-center gap-2">Registry occupancy status <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" /></span>
                    <span className="text-blue-400">{percentFunded}% Secured</span>
                </div>
                <div className="h-4.5 w-full bg-[#0a0f1d] rounded-full overflow-hidden flex gap-1 p-1 border border-white/5 shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentFunded}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-linear-to-r from-blue-700 to-blue-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    />
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600 px-1">
                    <span>{totalShares - availableShares} Shares held</span>
                    <span>{availableShares} Fractional remaining</span>
                </div>
            </div>

            <div className="space-y-10 pt-4 relative z-10">
                <div className="space-y-5">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Asset units selection</label>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest shadow-lg px-3 py-1 bg-white/5 rounded-xl border border-white/5">
                            {formatCurrency(sharePrice)} per share unit
                        </p>
                    </div>
                    <div className="flex items-center bg-[#0a0f1d] border border-white/5 rounded-2xl p-2.5 group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all shadow-inner">
                        <button
                            onClick={() => setShares(Math.max(1, shares - 1))}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-white/10 hover:text-white transition-all font-bold text-2xl active:scale-90"
                        >-</button>
                        <div className="grow text-center">
                            <span className="font-bold text-4xl text-white tracking-tighter">{shares}</span>
                        </div>
                        <button
                            onClick={() => setShares(Math.min(availableShares, shares + 1))}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-white/10 hover:text-white transition-all font-bold text-2xl active:scale-90"
                        >+</button>
                    </div>
                </div>

                <div className="bg-linear-to-br from-[#1c263d] to-[#0a0f1d] rounded-3xl p-6 space-y-6 relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="flex justify-between items-end relative z-10">
                        <div className="space-y-1">
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] mb-1">Position capital</p>
                            <h3 className="text-2xl font-bold text-white tracking-tighter">{formatCurrency(totalCost)}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 text-[9px] text-blue-400 font-bold uppercase tracking-widest cursor-help hover:text-white transition-colors">
                                Allocation Details <Info size={10} />
                            </div>
                            <p className="text-[9px] text-slate-600 font-medium italic">Incl. 1.25% protocol fee</p>
                        </div>
                    </div>

                    <button
                        disabled={isProcessing || availableShares === 0}
                        onClick={handleInvest}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded-2xl py-4 font-bold text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/40 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                Initialize Acquisition <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                            </>
                        )}
                    </button>

                    <div className="pt-2 flex items-center gap-3 justify-center text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
                        <Lock size={14} className="text-emerald-500" />
                        End-to-end encrypted protocol
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white/2 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/5 hover:border-blue-500/30 transition-all shadow-lg">
                        <div className="w-12 h-12 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                            <Layers size={22} />
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-0.5">Min Entry</p>
                            <p className="font-bold text-sm text-white">{formatCurrency(minInvestment)}</p>
                        </div>
                    </div>
                    <div className="bg-white/2 p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/5 hover:border-emerald-500/30 transition-all shadow-lg">
                        <div className="w-12 h-12 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                            <Zap size={22} />
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-0.5">Inventory</p>
                            <p className="font-bold text-sm text-white">{availableShares} Units</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add shimmer animation to globals if needed - but tailwind 4 should handle basic logic.
import { motion } from "framer-motion";
