"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, ArrowUpRight, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const allInvestments = [
    { id: "INV-001", user: "Rahim Khan", property: "Aurora Waterfront Residences", amount: "৳5,00,000", shares: 10, date: "Mar 15, 2026", status: "confirmed", return: "+22%" },
    { id: "INV-002", user: "Fatima Akter", property: "Skyline Business Hub", amount: "৳3,75,000", shares: 5, date: "Feb 28, 2026", status: "confirmed", return: "+18%" },
    { id: "INV-003", user: "Karim Uddin", property: "Green Valley Homes", amount: "৳2,00,000", shares: 8, date: "Jan 10, 2026", status: "pending", return: "—" },
    { id: "INV-004", user: "Nadia Islam", property: "Metro Tech Park", amount: "৳6,00,000", shares: 15, date: "Dec 5, 2025", status: "confirmed", return: "+24%" },
    { id: "INV-005", user: "Sakib Ahmed", property: "Riverside Restaurant", amount: "৳50,000", shares: 1, date: "Mar 20, 2026", status: "failed", return: "—" },
];

const statusStyles: Record<string, string> = {
    confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminInvestmentsPage() {
    const [search, setSearch] = useState("");
    const filtered = allInvestments.filter(i => i.user.toLowerCase().includes(search.toLowerCase()) || i.property.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">Investment Monitoring</h1>
                    <p className="text-sm text-white/40 mt-1">Track all platform-wide investments and transactions.</p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] py-1">৳4.2Cr Total Volume</Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Pending Payouts", value: "৳2.4L", icon: ClockIcon, color: "amber" },
                    { label: "Successful Rounds", value: "48", icon: TrendingUp, color: "emerald" },
                    { label: "Average Return", value: "21.4%", icon: ArrowUpRight, color: "blue" },
                ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`w-4 h-4 ${s.color === "emerald" ? "text-emerald-400" : s.color === "amber" ? "text-amber-400" : "text-blue-400"}`} />
                                <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold font-heading">{s.label}</span>
                            </div>
                            <p className="text-2xl font-bold font-heading">{s.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Search + Filter */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search by user or property..." 
                    className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white focus-visible:ring-blue-500/30" 
                />
            </div>

            {/* Investments List */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Investor</th>
                                <th className="text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Property</th>
                                <th className="text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Amount</th>
                                <th className="text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Status</th>
                                <th className="text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Date</th>
                                <th className="text-right text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((inv) => (
                                <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-400">U</div>
                                            <p className="text-sm font-medium text-white">{inv.user}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm text-white/60 max-w-[200px] truncate">{inv.property}</p>
                                        <p className="text-[10px] text-white/20 mt-0.5">{inv.shares} shares</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-white">{inv.amount}</p>
                                        <p className="text-[10px] text-emerald-400/60 mt-0.5">{inv.return}</p>
                                    </td>
                                    <td className="px-6 py-5"><Badge className={`text-[10px] ${statusStyles[inv.status]}`}>{inv.status}</Badge></td>
                                    <td className="px-6 py-5 text-xs text-white/30">{inv.date}</td>
                                    <td className="px-6 py-5 text-right">
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-white/20 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {filtered.length === 0 && (
                <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
                    <p className="text-white/20 text-sm">No investment records found.</p>
                </div>
            )}
        </div>
    );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
