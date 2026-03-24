"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Building2,
    MapPin,
    Users,
    ArrowRight,
    ShieldCheck,
    FileText,
    TrendingUp,
    Loader2,
    AlertCircle
} from "lucide-react";
import { IdeaDetailHeader } from "@/components/ideas/IdeaDetailHeader";
import { IdeaImageGallery } from "@/components/ideas/IdeaImageGallery";
import { InvestmentWidget } from "@/components/ideas/InvestmentWidget";
import CommentSection from "@/components/ideas/CommentSection";
import VoteButtons from "@/components/ideas/VoteButtons";
import { propertyService } from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function IdeaDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperty = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await propertyService.getById(id);
            setProperty(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Asset not found or connection lost.");
            toast.error("Error loading asset details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1d] gap-6">
                <Loader2 size={48} className="text-blue-500 animate-spin" />
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Decrypting Asset Ledger...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-6">
                <div className="max-w-xl w-full bg-[#151c2e] rounded-3xl border border-white/5 shadow-2xl p-20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px]" />
                    <AlertCircle size={80} className="text-red-500 mx-auto" />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">System Registry Error</h2>
                        <p className="text-slate-400 font-medium text-base leading-relaxed">{error || "The requested asset record does not exist in the vault."}</p>
                    </div>
                    <button onClick={() => window.history.back()} className="bg-red-600 text-white px-12 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-red-900/40 active:scale-95 transition-all">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f1d] pb-32 pt-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-16">
                    <IdeaDetailHeader
                        title={property.title}
                        category={property.category?.name || property.category}
                        location={property.location}
                    />

                    <IdeaImageGallery images={property.images && property.images.length > 0 ? property.images : [property.image]} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-[#151c2e] p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[50px]" />
                            <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                                <Building2 size={18} /> Asset Profile
                            </div>
                            <p className="text-slate-400 text-sm leading-[1.8] font-medium opacity-90">
                                {property.description}
                            </p>
                        </div>

                        <div className="bg-[#151c2e] p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px]" />
                            <div className="flex items-center gap-3 text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                                <TrendingUp size={18} /> Growth Projections
                            </div>
                            <div className="space-y-4">
                                {(property.highlights || ["Verified Title", "Prime Location", "Professional Management"]).map((h: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-default">
                                        <div className="w-6 h-6 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                            <ArrowRight size={14} />
                                        </div>
                                        <p className="text-white text-xs font-bold tracking-tight">{h}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Voting Logic Integrated */}
                    <div className="bg-[#151c2e] rounded-3xl p-14 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden border border-white/5 shadow-2xl group">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="grow space-y-4 relative z-10 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
                                <div className="w-10 h-px bg-blue-500" /> Sentiment Analysis
                            </div>
                            <h3 className="text-4xl font-bold font-heading tracking-tight leading-tight">Consensus Signal</h3>
                            <p className="text-slate-400 text-base font-medium max-w-sm leading-relaxed">Real-time institutional sentiment tracking. Join the collective decision matrix.</p>
                        </div>
                        <div className="relative z-10 scale-110 md:scale-125">
                            <VoteButtons
                                propertyId={property.id}
                                initialUpvotes={property.upvotes || 0}
                                initialDownvotes={property.downvotes || 0}
                                userVote={property.userVote}
                            />
                        </div>
                    </div>

                    <div className="bg-[#151c2e] p-14 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600/20 via-transparent to-emerald-500/20" />
                        <CommentSection propertyId={property.id} comments={property.comments || []} />
                    </div>

                    <div className="bg-[#151c2e] p-12 rounded-3xl border border-white/5 shadow-2xl space-y-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/2 pointer-events-none" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold font-heading text-white flex items-center gap-4 tracking-tight">
                                    <FileText size={24} className="text-blue-500" /> Restricted Documentation
                                </h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5 ml-10">Access restricted to verified participants</p>
                            </div>
                            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border border-white/10 transition-all active:scale-95 shadow-2xl">
                                Extract Archive
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {["Certification of Title", "Institutional Audit 2024", "Spatial Floor Plans", "Tax Clearance Protocol"].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden shadow-lg">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 group-hover:bg-blue-600/10 rounded-full blur-2xl transition-all" />
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="w-12 h-12 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-500 shadow-inner border border-white/5 group-hover:scale-110 transition-all">
                                            <FileText size={20} />
                                        </div>
                                        <p className="font-bold text-white text-sm tracking-tight">{doc}</p>
                                    </div>
                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest relative z-10 bg-[#0a0f1d] px-2 py-1 rounded-lg">PDF • 4MB</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="lg:col-span-4 lg:pt-32 relative z-10">
                    <div className="sticky top-32 space-y-10">
                        <InvestmentWidget
                            propertyId={property.id}
                            price={property.price}
                            minInvestment={property.minInvestment}
                            availableShares={property.availableShares}
                            totalShares={property.totalShares}
                        />

                        <div className="bg-blue-600/5 p-10 rounded-3xl border border-blue-500/10 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
                            <div className="w-18 h-18 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-xl group-hover:scale-110 transition-transform">
                                <Users size={32} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">Institutional Volume</p>
                                <p className="text-white text-sm font-bold leading-relaxed tracking-tight">
                                    Join <span className="text-blue-500">850+ Verified</span> Participants currently analyzing this asset position.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl border border-white/5 bg-white/2 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-[9px] uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-emerald-500" /> Escrow Protected
                            </div>
                            <p className="text-[9px] text-slate-600 leading-relaxed font-bold uppercase tracking-widest">
                                All transactions are secured via audited smart contracts and managed by tier-1 institutional custodians.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
