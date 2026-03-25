"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, MapPin, DollarSign, Layers, FileText, ArrowRight, Save, Eye } from "lucide-react";

const categories = ["Residential", "Commercial", "Industrial", "Retail", "Co-working", "Vacation"];

export default function CreatePropertyPage() {
    const [form, setForm] = useState({
        title: "", description: "", location: "", category: "",
        pricePerShare: "", totalShares: "", expectedReturn: "", duration: "",
        minInvestment: "", features: "",
    });

    const updateForm = (key: string, value: string) => setForm({ ...form, [key]: value });

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold font-heading">Create Property</h1>
                <p className="text-sm text-white/40 mt-1">List a new property for investment on PropShare.</p>
            </div>

            {/* Basic Info */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-blue-400" /></div>
                    Basic Information
                </h3>
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Property Title *</label>
                    <Input value={form.title} onChange={(e) => updateForm("title", e.target.value)} placeholder="e.g. Aurora Waterfront Residences" className="bg-white/5 border-white/10 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Description *</label>
                    <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} rows={5} placeholder="Describe the property, its features, and investment opportunity..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/20 focus:ring-2 focus:ring-blue-500/30 outline-none resize-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Location *</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <Input value={form.location} onChange={(e) => updateForm("location", e.target.value)} placeholder="Gulshan, Dhaka" className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Category *</label>
                        <select value={form.category} onChange={(e) => updateForm("category", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500/30 outline-none appearance-none cursor-pointer">
                            <option value="" className="bg-[#151c2e]">Select category</option>
                            {categories.map((cat) => (<option key={cat} value={cat} className="bg-[#151c2e]">{cat}</option>))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /></div>
                    Financial Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { label: "Price Per Share (৳)", key: "pricePerShare", placeholder: "50000" },
                        { label: "Total Shares", key: "totalShares", placeholder: "300" },
                        { label: "Expected Return (%)", key: "expectedReturn", placeholder: "22" },
                        { label: "Duration (months)", key: "duration", placeholder: "36" },
                    ].map((f) => (
                        <div key={f.key} className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider font-medium">{f.label} *</label>
                            <Input type="number" value={form[f.key as keyof typeof form]} onChange={(e) => updateForm(f.key, e.target.value)} placeholder={f.placeholder} className="bg-white/5 border-white/10 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center"><ImagePlus className="w-3.5 h-3.5 text-purple-400" /></div>
                    Property Images
                </h3>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-blue-500/30 transition-colors cursor-pointer">
                    <ImagePlus className="w-10 h-10 text-white/10 mx-auto mb-3" />
                    <p className="text-sm text-white/40">Click or drag to upload images</p>
                    <p className="text-xs text-white/20 mt-1">PNG, JPG up to 10MB. Recommended: 1200x800px</p>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center"><Layers className="w-3.5 h-3.5 text-amber-400" /></div>
                    Property Features
                </h3>
                <textarea value={form.features} onChange={(e) => updateForm("features", e.target.value)} rows={3} placeholder="Enter features separated by commas (e.g. Parking, Pool, Security)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/20 focus:ring-2 focus:ring-blue-500/30 outline-none resize-none" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-5"><Save className="w-4 h-4 mr-2" /> Save as Draft</Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-5"><Eye className="w-4 h-4 mr-2" /> Preview</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-5 text-sm font-semibold group">
                    Submit for Review <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}
