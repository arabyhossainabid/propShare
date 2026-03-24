"use client";

import React, { useState, useEffect } from "react";
import {
    FolderPlus,
    Trash2,
    Tag,
    Plus,
    Loader2,
    AlertCircle,
    ArrowRight,
    Search,
    Edit2
} from "lucide-react";
import { adminService, interactionService } from "@/lib/api";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function CategoryManagement() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", icon: "", description: "" });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await interactionService.getCategories();
            setCategories(res.data);
        } catch (err) {
            toast.error("Failed to sync category registry.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm category decommissioning? This may destabilize associated asset records.")) return;
        try {
            await adminService.deleteCategory(id);
            toast.success("Category record purged.");
            fetchCategories();
        } catch (err) {
            toast.error("Process aborted. Category contains active assets.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminService.createCategory(formData);
            toast.success("New asset classification protocol established.");
            setShowAddForm(false);
            setFormData({ name: "", icon: "", description: "" });
            fetchCategories();
        } catch (err) {
            toast.error("Protocol establishment failure.");
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">
                        <Tag size={14} /> Sector Mapping Console
                    </div>
                    <h2 className="text-4xl font-bold font-heading text-white tracking-tight leading-tight">Registry <span className="text-blue-500">Taxonomy</span></h2>
                    <p className="text-slate-500 text-base font-medium max-w-lg leading-relaxed">Systematic management of global asset classification protocols.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center gap-3 transition-all relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative z-10">{showAddForm ? "CLOSE CONSOLE" : "INITIALIZE CLASS"}</span>
                    <Plus size={20} className="relative z-10" />
                </button>
            </div>

            {showAddForm && (
                <div className="bg-[#151c2e] border border-white/5 rounded-3xl p-12 shadow-2xl space-y-10 animate-in zoom-in-95 duration-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Protocol Name</label>
                            <input
                                required
                                className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl p-5 font-bold text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                                placeholder="e.g. Hyperscale Data Centers"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Visual Token (Emoji)</label>
                            <input
                                required
                                className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl p-5 font-bold text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                                placeholder="e.g. 🏢"
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Functional Documentation</label>
                            <textarea
                                className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl p-6 font-bold text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner min-h-[140px] placeholder:text-slate-700"
                                placeholder="Define the operational boundaries of this classification protocol..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <button className="md:col-span-2 bg-white text-slate-900 py-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-blue-50 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
                            Establish Classification <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6">
                    <Loader2 className="animate-spin text-blue-500" size={48} />
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Synchronizing Taxonomy Registry...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-[#151c2e] border border-white/5 rounded-3xl p-10 shadow-2xl group hover:shadow-blue-900/30 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex items-center justify-between mb-8 relative z-10 transition-transform group-hover:scale-[1.02]">
                                <span className="text-5xl group-hover:scale-125 transition-transform duration-1000 rotate-0 group-hover:-rotate-12">{cat.icon}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="w-11 h-11 bg-white/2 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white border border-white/5 transition-all shadow-xl active:scale-90"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors tracking-tight uppercase">{cat.name}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-80 h-10 line-clamp-2">{cat.description || "Verified institutional real estate asset classification protocol."}</p>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.25em]">Registered Units</span>
                                <div className="flex items-center gap-2">
                                    <span className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-xl text-[10px] font-bold border border-blue-500/20 shadow-lg">
                                        {cat._count?.properties || 0} ASSETS
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-white/2 border border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-700 hover:border-blue-500 group transition-all h-full min-h-[320px] shadow-inner"
                    >
                        <div className="w-20 h-20 bg-[#0a0f1d] rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform shadow-2xl">
                            <Plus size={40} className="text-slate-800 group-hover:text-blue-500" />
                        </div>
                        <p className="font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors">Establish Protocol</p>
                    </button>
                </div>
            )}
        </div>
    );
}
