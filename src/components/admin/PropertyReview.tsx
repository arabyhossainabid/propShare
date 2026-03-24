"use client";

import React from "react";
import {
    Building2,
    Eye,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    ClipboardCheck,
    ArrowRight
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const pendingProperties = [
    {
        id: "prop-id-1",
        title: "Eco-Industrial Complex",
        user: "Md. Karim",
        category: "Industrial",
        price: 850000,
        requestedAt: "2024-03-22T10:30:00Z"
    },
    {
        id: "prop-id-2",
        title: "City Center Co-working",
        user: "Sarah Khan",
        category: "Commercial",
        price: 320000,
        requestedAt: "2024-03-23T14:15:00Z"
    }
];

export default function PropertyReview() {
    const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: "Synchronizing with protocol...",
                success: `Asset ${status.toLowerCase()} and registry updated.`,
                error: "Synchronization failure."
            }
        );
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">
                        <ClipboardCheck size={14} /> Validation Queue
                    </div>
                    <h2 className="text-4xl font-bold font-heading text-white tracking-tight leading-tight">Asset <span className="text-blue-500">Validation</span></h2>
                    <p className="text-slate-500 text-base font-medium max-w-lg leading-relaxed">Review pending property submissions for institutional registry inclusion.</p>
                </div>
                <div className="bg-white/2 px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">{pendingProperties.length} Pending Actions</span>
                </div>
            </div>

            <div className="space-y-8">
                {pendingProperties.map((prop, i) => (
                    <div key={prop.id} className="bg-[#151c2e] p-10 rounded-3xl border border-white/5 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group relative overflow-hidden hover:shadow-blue-900/30 transition-all duration-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="lg:col-span-1 w-20 h-20 bg-[#0a0f1d] text-blue-500 rounded-3xl flex items-center justify-center border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                            <Building2 size={36} />
                        </div>

                        <div className="lg:col-span-5 space-y-3">
                            <div className="flex items-center gap-4 mb-1">
                                <span className="bg-white/5 text-slate-500 px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] border border-white/5">{prop.category}</span>
                                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">{formatDate(prop.requestedAt)}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors uppercase">{prop.title}</h3>
                            <p className="text-sm text-slate-500 font-medium">Initiated by <span className="text-blue-500 font-bold underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500 transition-all">{prop.user}</span></p>
                        </div>

                        <div className="lg:col-span-2 text-right lg:text-center space-y-1">
                            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">Acquisition Target</p>
                            <p className="text-3xl font-bold text-white tracking-tighter">{formatCurrency(prop.price)}</p>
                        </div>

                        <div className="lg:col-span-4 flex items-center justify-end gap-6 relative z-10">
                            <button
                                onClick={() => handleReview(prop.id, "REJECTED")}
                                className="w-16 h-16 bg-white/2 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:rotate-12 border border-white/5 group-hover:border-red-500/30 shadow-2xl"
                            >
                                <XCircle size={24} />
                            </button>
                            <button className="px-10 py-5 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-[0.25em] text-[10px] flex items-center gap-3 hover:bg-blue-50 transition-all shadow-2xl active:scale-95 group/btn">
                                Inspect Registry <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => handleReview(prop.id, "APPROVED")}
                                className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-500 transition-all transform hover:-rotate-12 shadow-2xl shadow-blue-500/20"
                            >
                                <CheckCircle2 size={24} />
                            </button>
                        </div>
                    </div>
                ))}

                {pendingProperties.length === 0 && (
                    <div className="text-center py-24 px-10 bg-white/2 border border-dashed border-white/5 rounded-3xl animate-in zoom-in-95 duration-700 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ShieldCheck size={80} className="mx-auto text-slate-800 mb-8 blur-[1px] group-hover:scale-110 group-hover:blur-0 transition-all duration-1000" />
                        <div className="space-y-3">
                            <p className="text-2xl font-bold text-white tracking-tight uppercase">Registry Synchronized</p>
                            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">No validation requests remaining in queue.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
