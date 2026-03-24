"use client";

import React, { useState, useEffect } from "react";
import {
    PlusCircle,
    MapPin,
    ArrowRight,
    ShieldCheck,
    Edit,
    Trash2,
    Loader2,
    LayoutDashboard,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MyInvestmentsTable } from "@/components/dashboard/MyInvestmentsTable";
import { formatCurrency, cn } from "@/lib/utils";
import { propertyService, investmentService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"investments" | "listings">("investments");
    const [myProperties, setMyProperties] = useState<any[]>([]);
    const [myInvestments, setMyInvestments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [propRes, invRes] = await Promise.all([
                propertyService.getMyProperties(),
                investmentService.getMyInvestments()
            ]);
            setMyProperties(propRes.data);
            setMyInvestments(invRes.data);
        } catch (err) {
            toast.error("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/auth/login");
        } else if (user) {
            fetchData();
        }
    }, [user, authLoading]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;
        try {
            await propertyService.delete(id);
            toast.success("Listing removed from exchange.");
            fetchData();
        } catch (err) {
            toast.error("Deletion failed. Asset might be active.");
        }
    };

    if (authLoading || (user && loading)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1d] gap-6">
                <Loader2 size={48} className="text-blue-500 animate-spin" />
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Synching Secure Portfolio...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0a0f1d] pb-24 px-4 md:px-8 lg:px-16 pt-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 py-8 border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 font-bold text-2xl transform -rotate-3 hover:rotate-0 transition-transform">
                            {user.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold font-heading text-white tracking-tight">{user.name}</h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center gap-1.5 border border-emerald-500/20 shadow-lg">
                                    <ShieldCheck size={14} /> Identity Verified
                                </span>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                    Auth Hash: {user.id.substring(0, 12)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex bg-white/5 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl min-w-fit self-start lg:self-center">
                        <button
                            onClick={() => setActiveTab("investments")}
                            className={cn(
                                "px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.15em] transition-all min-w-[140px]",
                                activeTab === "investments" ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-slate-500 hover:text-white"
                            )}
                        >
                            Global Portfolio
                        </button>
                        <button
                            onClick={() => setActiveTab("listings")}
                            className={cn(
                                "px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.15em] transition-all min-w-[140px]",
                                activeTab === "listings" ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-slate-500 hover:text-white"
                            )}
                        >
                            Digital Assets
                        </button>
                    </div>
                </div>

                <DashboardStats investments={myInvestments} />

                {activeTab === "investments" ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-white tracking-tight">Active Holdings</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Real-time asset performance metrics</p>
                            </div>
                        </div>
                        <MyInvestmentsTable investments={myInvestments} />
                    </div>
                ) : (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                    <PlusCircle size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-white tracking-tight">Institutional Listings</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Asset record management</p>
                                </div>
                            </div>
                            <Link href="/dashboard/add-property" className="bg-white text-slate-900 hover:bg-blue-50 text-[10px] py-4 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group shadow-2xl transition-all active:scale-95">
                                List New Idea <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {myProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                                {myProperties.map((prop) => (
                                    <div key={prop.id} className="bg-[#151c2e] rounded-2xl border border-white/5 shadow-2xl overflow-hidden group hover:shadow-blue-900/30 hover:-translate-y-2 transition-all duration-700 flex flex-col h-full relative">
                                        <div className="relative aspect-4/3 overflow-hidden">
                                            <img src={prop.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-2000" />
                                            <div className="absolute top-5 right-5 z-10 flex gap-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <Link href={`/dashboard/edit-property/${prop.id}`} className="w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all shadow-2xl"><Edit size={18} /></Link>
                                                <button onClick={() => handleDelete(prop.id)} className="w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-2xl"><Trash2 size={18} /></button>
                                            </div>
                                            <div className="absolute bottom-5 left-5 z-10">
                                                <span className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 backdrop-blur-xl text-white shadow-2xl shadow-black/50",
                                                    prop.status === "APPROVED" ? "bg-emerald-500/60" : prop.status === "PENDING" ? "bg-orange-500/60" : "bg-red-500/60"
                                                )}>
                                                    {prop.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 grow space-y-4 flex flex-col">
                                            <h4 className="font-bold text-white text-base leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 tracking-tight">{prop.title}</h4>

                                            <div className="space-y-4">
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> {prop.location}</p>
                                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-1.5">Asset Target</p>
                                                        <p className="text-white font-bold text-lg tracking-tight">{formatCurrency(prop.price)}</p>
                                                    </div>
                                                    <Link href={`/ideas/${prop.id}`} className="w-10 h-10 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                                                        <ArrowRight size={18} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#151c2e] border border-white/5 rounded-3xl p-16 text-center space-y-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]" />
                                <div className="w-28 h-28 bg-white/5 rounded-2xl flex items-center justify-center text-slate-700 mx-auto border border-white/5 group-hover:scale-110 transition-transform">
                                    <LayoutDashboard size={64} />
                                </div>
                                <div className="space-y-3 relative z-10">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Terminal Awaiting Data</h3>
                                    <p className="text-slate-400 max-w-sm mx-auto font-medium text-sm leading-relaxed">You haven't established any property records yet. Initiate your first asset listing to start yield generation.</p>
                                </div>
                                <Link href="/dashboard/add-property" className="inline-flex bg-blue-600 text-white px-14 py-5 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 active:scale-95">
                                    Initialize Listing
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
