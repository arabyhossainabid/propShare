"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    PlusCircle,
    ShieldCheck,
    FileText,
    Loader2,
    Database,
    Zap
} from "lucide-react";
import { AssetBasics, FinancialBlueprint } from "@/components/dashboard/AddPropertyForm";
import { toast } from "react-hot-toast";
import { propertyService, interactionService } from "@/lib/api";

export default function AddPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        categoryId: "",
        location: "",
        minInvestment: "",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop" // Default mock
    });

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await interactionService.getCategories();
                setCategories(res.data);
            } catch (err) {
                toast.error("Registry connection failure.");
            }
        };
        fetchCats();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await propertyService.create({
                ...formData,
                price: Number(formData.price),
                minInvestment: Number(formData.minInvestment)
            });
            toast.success("Asset protocol initiated. Under institutional review.");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Transmission rejected. Validate your data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] pb-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="bg-[#151c2e] pt-40 pb-56 px-6 md:px-12 text-white relative border-b border-white/5">
                <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                    <button onClick={() => router.back()} className="flex items-center gap-3 text-slate-500 hover:text-white font-bold text-[10px] uppercase tracking-[0.25em] transition-all mb-6 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                        Master Registry
                    </button>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">
                            <Database size={14} className="animate-pulse" /> Protocol Initialization
                        </div>
                        <h1 className="text-5xl font-bold font-heading leading-[1.1] tracking-tighter">
                            Establish New <span className="text-blue-500">Asset Record</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium opacity-80">
                            Initiate a formal institutional review for your property inclusion. Provide precise financial and operational data for registry assessment.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 -translate-y-32 relative z-20">
                <form onSubmit={handleSubmit} className="bg-[#151c2e] rounded-[64px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] p-12 md:p-16 space-y-16 animate-in slide-in-from-bottom-10 duration-1000">

                    <AssetBasics formData={formData} setFormData={setFormData} categories={categories} />
                    <FinancialBlueprint formData={formData} setFormData={setFormData} />

                    {/* Media & Details */}
                    <div className="space-y-10 pt-10 border-t border-white/5">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-purple-600/10 text-purple-500 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-lg">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-[0.2em]">Operational Narrative</h3>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] mt-1">Registry Documentation & Media</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Functional Pitch / Executive Summary</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="Detail the value proposition, local market trends, and risk-mitigation strategies for institutional review..."
                                className="w-full bg-[#0a0f1d] border border-white/5 rounded-[28px] py-7 px-8 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-800 resize-none text-base leading-relaxed shadow-inner"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="border-2 border-dashed border-white/5 rounded-[40px] p-16 text-center hover:border-blue-500/50 hover:bg-white/2 transition-all cursor-pointer group bg-[#0a0f1d] shadow-inner relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 bg-[#151c2e] rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform relative z-10 border border-white/5">
                                <Upload size={32} />
                            </div>
                            <p className="text-xl font-bold text-white mb-2 tracking-tight relative z-10 uppercase">Registry Visual Repository</p>
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] relative z-10">Institutional Grade PNG/JPG (Up to 15MB)</p>
                        </div>
                    </div>

                    <div className="pt-12 flex flex-col md:flex-row gap-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="grow bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-800 text-white py-6 rounded-[28px] font-bold text-[12px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-4 active:scale-95 group relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                            {loading ? <Loader2 className="animate-spin text-white" size={24} /> : (
                                <>
                                    Establish Protocol <PlusCircle size={24} />
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-12 py-6 bg-white/2 text-slate-600 hover:text-white border border-white/5 rounded-[28px] font-bold text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl hover:bg-white/5"
                        >
                            Abort Session
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <p className="inline-flex items-center gap-3 px-8 py-3 bg-[#151c2e] border border-white/5 rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] shadow-2xl">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Compliant with Global Real Estate Exchange Protocols (GREP-24)
                    </p>
                </div>
            </div>
        </div>
    );
}
