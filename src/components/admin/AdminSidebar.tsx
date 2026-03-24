"use client";

import React from "react";
import {
    TrendingUp,
    ShieldCheck,
    Users,
    XCircle,
    Menu,
    Tag,
    Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    pendingCount: number;
}

export default function AdminSidebar({ activeTab, setActiveTab, pendingCount }: SidebarProps) {
    return (
        <aside className="w-80 bg-[#0a0f1d] min-h-screen pt-32 pb-12 hidden lg:flex flex-col border-r border-white/5 relative z-50">
            <div className="px-8 mb-14">
                <div className="flex items-center gap-4 bg-white/2 p-6 rounded-[28px] border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="w-12 h-12 bg-blue-600 rounded-[18px] flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-blue-500/30 transform rotate-3 group-hover:rotate-0 transition-transform">
                        A
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg tracking-tight">Main Terminal</p>
                        <p className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.25em]">Access: Level 4</p>
                    </div>
                </div>
            </div>

            <nav className="grow px-4 space-y-2">
                {[
                    { id: "stats", label: "Master Metrics", icon: TrendingUp, badge: 0 },
                    { id: "review", label: "Asset Validation", icon: ShieldCheck, badge: pendingCount },
                    { id: "users", label: "Registry Control", icon: Users, badge: 0 },
                    { id: "categories", label: "Sector Mapping", icon: Tag, badge: 0 }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={cn(
                            "w-full flex items-center justify-between px-6 py-4.5 rounded-[22px] font-bold text-[10px] uppercase tracking-[0.2em] transition-all group relative overflow-hidden",
                            activeTab === item.id
                                ? "bg-blue-600 text-white shadow-2xl shadow-blue-500/20"
                                : "text-slate-500 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        {activeTab === item.id && (
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" />
                        )}
                        <div className="flex items-center gap-4 relative z-10">
                            <item.icon size={20} className={activeTab === item.id ? "text-white" : "text-slate-600 group-hover:text-blue-500 transition-colors"} />
                            {item.label}
                        </div>
                        {item.badge > 0 && (
                            <span className={cn(
                                "px-3 py-1 rounded-lg text-[9px] font-bold shadow-lg relative z-10",
                                activeTab === item.id ? "bg-white text-blue-600" : "bg-blue-600 text-white"
                            )}>
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            <div className="px-8 pt-8 border-t border-white/5">
                <button className="flex items-center gap-4 text-slate-600 hover:text-red-500 font-bold px-6 py-4.5 uppercase text-[10px] tracking-[0.2em] transition-all w-full bg-white/2 hover:bg-red-500/5 rounded-2xl border border-white/5 hover:border-red-500/20 group">
                    <Lock size={18} className="group-hover:scale-110 transition-transform" />
                    Lock Protocol
                </button>
            </div>
        </aside>
    );
}
