"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, MapPin, DollarSign, Layers, FileText, ArrowRight, Save, Eye, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

const categories = ["Residential", "Commercial", "Industrial", "Retail", "Co-working", "Vacation"];

export default function EditPropertyPage() {
    const params = useParams();
    const [form, setForm] = useState({
        title: "Rooftop Café Space", description: "A trendy rooftop café space in the heart of Gulshan with panoramic city views. Perfect for food & beverage investment with high foot traffic.",
        location: "Gulshan Circle-1, Dhaka", category: "Commercial",
        pricePerShare: "35000", totalShares: "150", expectedReturn: "18", duration: "24",
        minInvestment: "35000", features: "Rooftop View, Fully Furnished, High Foot Traffic, AC System",
    });

    const updateForm = (key: string, value: string) => setForm({ ...form, [key]: value });

    return (
        <div className="space-y-8 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/dashboard/properties" className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1 mb-2"><ArrowLeft className="w-3 h-3" /> Back to Properties</Link>
                    <h1 className="text-2xl font-bold font-heading">Edit Property</h1>
                    <p className="text-sm text-white/40 mt-1">Update property ID: {params.id}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Approved</Badge>
            </div>

            {/* Basic Info */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-blue-400" /></div>
                    Basic Information
                </h3>
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Property Title *</label>
                    <Input value={form.title} onChange={(e) => updateForm("title", e.target.value)} className="bg-white/5 border-white/10 rounded-xl py-5 text-white focus-visible:ring-blue-500/30" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Description *</label>
                    <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500/30 outline-none resize-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Location *</label>
                        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><Input value={form.location} onChange={(e) => updateForm("location", e.target.value)} className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white focus-visible:ring-blue-500/30" /></div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Category *</label>
                        <select value={form.category} onChange={(e) => updateForm("category", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500/30 outline-none appearance-none">
                            {categories.map((c) => (<option key={c} value={c} className="bg-[#151c2e]">{c}</option>))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Financial */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /></div>Financial Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {[{ l: "Price Per Share (৳)", k: "pricePerShare" }, { l: "Total Shares", k: "totalShares" }, { l: "Expected Return (%)", k: "expectedReturn" }, { l: "Duration (months)", k: "duration" }].map((f) => (
                        <div key={f.k} className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider font-medium">{f.l}</label>
                            <Input type="number" value={form[f.k as keyof typeof form]} onChange={(e) => updateForm(f.k, e.target.value)} className="bg-white/5 border-white/10 rounded-xl py-5 text-white focus-visible:ring-blue-500/30" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Images */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center"><ImagePlus className="w-3.5 h-3.5 text-purple-400" /></div>Property Images</h3>
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (<div key={i} className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><ImagePlus className="w-6 h-6 text-white/10" /></div>))}
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center text-xs text-white/30 cursor-pointer hover:border-blue-500/30 transition-colors">Click to add more images</div>
            </div>

            {/* Features */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center"><Layers className="w-3.5 h-3.5 text-amber-400" /></div>Features</h3>
                <textarea value={form.features} onChange={(e) => updateForm("features", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500/30 outline-none resize-none" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-5"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-5 text-sm font-semibold group">
                    Update & Re-Submit <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}
