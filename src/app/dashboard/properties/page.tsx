"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, BarChart3, Edit, Trash2, Send, Building2, MoreVertical } from "lucide-react";

const statusStyles: Record<string, string> = {
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    under_review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    draft: "bg-white/5 text-white/40 border-white/10",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const properties = [
    { id: "1", title: "Rooftop Café Space", category: "Commercial", status: "approved", views: 1240, votes: 89, date: "Mar 10, 2026", shares: 150 },
    { id: "2", title: "Tech Co-working Hub", category: "Co-working", status: "under_review", views: 320, votes: 12, date: "Mar 18, 2026", shares: 200 },
    { id: "3", title: "Student Housing Complex", category: "Residential", status: "draft", views: 0, votes: 0, date: "Mar 22, 2026", shares: 100 },
    { id: "4", title: "Riverside Restaurant", category: "Commercial", status: "rejected", views: 560, votes: 34, date: "Feb 15, 2026", shares: 80 },
];

export default function MyPropertiesPage() {
    const [filter, setFilter] = useState("all");
    const filtered = filter === "all" ? properties : properties.filter((p) => p.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">My Properties</h1>
                    <p className="text-sm text-white/40 mt-1">Manage your listed properties and track their performance.</p>
                </div>
                <Link href="/dashboard/properties/create">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm"><PlusCircle className="w-4 h-4 mr-2" /> Create New</Button>
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { key: "all", label: "All" },
                    { key: "approved", label: "Approved" },
                    { key: "under_review", label: "Under Review" },
                    { key: "draft", label: "Draft" },
                    { key: "rejected", label: "Rejected" },
                ].map((f) => (
                    <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === f.key ? "bg-blue-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Properties List */}
            <div className="space-y-3">
                {filtered.map((p) => (
                    <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                                        <Badge className={`text-[10px] ${statusStyles[p.status]}`}>
                                            {p.status === "under_review" ? "Under Review" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-white/30">
                                        <span>{p.category}</span>
                                        <span>{p.date}</span>
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views}</span>
                                        <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" />{p.votes} votes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {p.status === "draft" && (
                                    <Button variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10 rounded-xl text-xs h-9 px-3">
                                        <Send className="w-3 h-3 mr-1" /> Submit
                                    </Button>
                                )}
                                <Link href={`/dashboard/properties/${p.id}/edit`}>
                                    <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl h-9 w-9 p-0"><Edit className="w-4 h-4" /></Button>
                                </Link>
                                <Button variant="ghost" className="text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl h-9 w-9 p-0"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
