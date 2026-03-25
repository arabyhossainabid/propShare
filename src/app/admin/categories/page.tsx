"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    PlusCircle, 
    Edit, 
    Trash2, 
    Building2, 
    ShoppingBag, 
    Home, 
    Warehouse, 
    Hotel,
    Search
} from "lucide-react";

const allCategories = [
    { id: 1, name: "Residential", slug: "residential", icon: Home, count: 42, color: "blue" },
    { id: 2, name: "Commercial", slug: "commercial", icon: Building2, count: 28, color: "emerald" },
    { id: 3, name: "Industrial", slug: "industrial", icon: Warehouse, count: 12, color: "purple" },
    { id: 4, name: "Retail", slug: "retail", icon: ShoppingBag, count: 18, color: "amber" },
    { id: 5, name: "Co-working", slug: "co-working", icon: Hotel, count: 15, color: "rose" },
    { id: 6, name: "Vacation", slug: "vacation", icon: Hotel, count: 9, color: "cyan" },
];

const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function AdminCategoriesPage() {
    const [search, setSearch] = useState("");
    const filtered = allCategories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">Category Management</h1>
                    <p className="text-sm text-white/40 mt-1">Organize and manage property categories.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm group">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Category
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search categories..." 
                    className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30" 
                />
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((c) => {
                    const Icon = c.icon;
                    return (
                        <div key={c.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[c.color]}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-white/20 hover:text-white/60 rounded-lg"><Edit className="w-4 h-4" /></Button>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-white/20 hover:text-red-400 rounded-lg"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-heading text-white">{c.name}</h3>
                                <p className="text-xs text-white/30 font-mono mt-1">/{c.slug}</p>
                            </div>
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                                <span className="text-xs text-white/30">Total Properties</span>
                                <Badge className="bg-white/5 text-white/60 border border-white/10 text-[10px]">{c.count}</Badge>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {filtered.length === 0 && (
                <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
                    <p className="text-white/20 text-sm">No categories found matching your search.</p>
                </div>
            )}
        </div>
    );
}
