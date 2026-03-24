"use client";

import React from "react";
import {
    Building2,
    Info,
    Tag,
    MapPin,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetBasicsProps {
    formData: any;
    setFormData: (data: any) => void;
    categories: any[];
}

export function AssetBasics({ formData, setFormData, categories }: AssetBasicsProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <div className="w-11 h-11 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-lg">
                    <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-[0.2em]">Asset Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                        Asset Title
                        <Info size={12} className="text-slate-700" />
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Modern Tech Hub Plaza"
                        className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl py-4.5 px-6 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-sm shadow-inner"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                        Classification Registry
                        <Tag size={12} className="text-slate-700" />
                    </label>
                    <div className="relative">
                        <select
                            required
                            className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl py-4.5 px-6 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer appearance-none text-sm shadow-inner"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#151c2e]">Select Class</option>
                            {categories.map(c => <option key={c.id} value={c.id} className="bg-[#151c2e]">{c.icon} {c.name}</option>)}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                            <Tag size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                    Geo-Spatial Location
                    <MapPin size={12} className="text-slate-700" />
                </label>
                <input
                    required
                    type="text"
                    placeholder="Physical coordinate string or address..."
                    className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl py-4.5 px-6 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-sm shadow-inner"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
            </div>
        </div>
    );
}

export function FinancialBlueprint({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) {
    return (
        <div className="space-y-8 pt-8">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <div className="w-11 h-11 bg-emerald-600/10 text-emerald-500 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-lg">
                    <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-[0.2em]">Financial Blueprint</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Acquisition Valuation (USD)</label>
                    <div className="relative group/input">
                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" size={20} />
                        <input
                            required
                            type="number"
                            placeholder="0.00"
                            className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl py-5 shadow-inner pl-14 pr-6 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-sm"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block px-1">Minimal Unit Threshold (USD)</label>
                    <div className="relative group/input">
                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-emerald-500 transition-colors" size={20} />
                        <input
                            required
                            type="number"
                            placeholder="e.g. 500"
                            className="w-full bg-[#0a0f1d] border border-white/5 rounded-2xl py-5 shadow-inner pl-14 pr-6 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-sm"
                            value={formData.minInvestment}
                            onChange={e => setFormData({ ...formData, minInvestment: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
