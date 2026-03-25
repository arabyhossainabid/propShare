"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, PlusCircle, Trash2, GripVertical, AlertTriangle } from "lucide-react";

const allProperties = [
    { id: "1", title: "Aurora Waterfront Residences", owner: "Rahim Khan", category: "Residential", isFeatured: true, order: 1, views: "3.4K", returns: "22%" },
    { id: "2", title: "Tech Co-working Hub", owner: "Fatima Akter", category: "Co-working", isFeatured: false, order: 0, views: "1.2K", returns: "18%" },
    { id: "4", title: "Downtown Office Space", owner: "Nadia Islam", category: "Commercial", isFeatured: true, order: 2, views: "2.8K", returns: "20%" },
    { id: "6", title: "Metro Tech Park", owner: "Tasnim Rahman", category: "Co-working", isFeatured: false, order: 0, views: "4.1K", returns: "24%" },
];

export default function AdminFeaturedPage() {
    const featured = allProperties.filter(p => p.isFeatured).sort((a, b) => a.order - b.order);
    const available = allProperties.filter(p => !p.isFeatured);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">Featured Properties</h1>
                    <p className="text-sm text-white/40 mt-1">Manage the properties displayed on the homepage featured section.</p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] py-1">{featured.length} / 6 Max</Badge>
                </div>
            </div>

            {/* Featured Management */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Currently Featured */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        Active Featured (Ordering)
                    </h3>
                    <div className="space-y-3">
                        {featured.map((p, index) => (
                            <div key={p.id} className="bg-white/[0.03] border border-blue-500/20 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/[0.05] transition-all">
                                <GripVertical className="w-5 h-5 text-white/10 group-hover:text-white/30 cursor-grab" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-white truncate">{p.title}</p>
                                        <Badge className="bg-blue-500/10 text-blue-400 border-none text-[8px] py-0 px-1.5 h-4">#{index+1}</Badge>
                                    </div>
                                    <p className="text-[10px] text-white/30 mt-0.5">{p.category} · {p.owner}</p>
                                </div>
                                <Button variant="ghost" className="h-9 w-9 p-0 text-white/20 hover:text-red-400 rounded-xl hover:bg-red-500/5 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        {featured.length === 0 && (
                            <div className="bg-white/[0.01] border border-dashed border-white/5 rounded-2xl p-8 text-center">
                                <p className="text-xs text-white/20">No properties featured on homepage.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Available for Selection */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/30">Available Approved Listings</h3>
                    <div className="space-y-3">
                        {available.map((p) => (
                            <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-all">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{p.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-[10px] text-white/30">{p.category}</p>
                                        <p className="text-[10px] text-emerald-400/60 font-medium">{p.returns} return</p>
                                    </div>
                                </div>
                                <Button className="bg-white/5 hover:bg-blue-600 text-white border border-white/10 rounded-xl text-[10px] h-8 px-3 transition-all group">
                                    Add <PlusCircle className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex items-start gap-3 mt-4">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs text-amber-500/90 font-bold">Heads Up!</p>
                            <p className="text-[10px] text-amber-500/70 leading-relaxed">Featured properties appear in the hero slider and featured section. Recommendation: Keep only 3-5 active at a time for performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
