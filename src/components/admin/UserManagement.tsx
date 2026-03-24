"use client";

import React from "react";
import {
    Users,
    Search,
    Lock,
    Unlock,
    MessageSquare,
    ShieldCheck,
    Building2,
    ShieldAlert
} from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const userList = [
    { id: "usr-1", name: "Abid Hossain", email: "abid@example.com", role: "ADMIN", status: "ACTIVE", joined: "2024-01-10" },
    { id: "usr-2", name: "Rahim Ahmed", email: "rahim@example.com", role: "USER", status: "ACTIVE", joined: "2024-02-15" },
    { id: "usr-3", name: "Jasmine Akter", email: "jasmine@example.com", role: "USER", status: "BLOCKED", joined: "2024-03-01" }
];

export default function UserManagement() {
    const handleUserStatus = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        toast.success(`Identity access set to ${newStatus}`);
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">
                        <ShieldAlert size={14} /> Security Protocol
                    </div>
                    <h2 className="text-4xl font-bold font-heading text-white tracking-tight leading-tight">Registry <span className="text-blue-500">Security</span></h2>
                    <p className="text-slate-500 text-base font-medium max-w-lg leading-relaxed">Manage institutional access level and participant verification status.</p>
                </div>
                <div className="flex bg-[#151c2e] p-2 border border-white/5 rounded-2xl shadow-2xl group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    <input type="text" placeholder="Filter registry..." className="px-6 py-3 bg-transparent focus:outline-none font-bold text-xs text-white placeholder:text-slate-700 w-72" />
                    <button className="bg-blue-600 text-white p-3.5 rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95"><Search size={20} /></button>
                </div>
            </div>

            <div className="bg-[#151c2e] rounded-3xl border border-white/5 shadow-2xll overflow-hidden relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-white/2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                <th className="py-8 px-12 border-b border-white/5">Participant Identity</th>
                                <th className="py-8 px-12 text-center border-b border-white/5">Protocol Role</th>
                                <th className="py-8 px-12 text-right border-b border-white/5">Registry Entry</th>
                                <th className="py-8 px-12 text-center border-b border-white/5">Status Index</th>
                                <th className="py-8 px-12 text-right border-b border-white/5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {userList.map((user) => (
                                <tr key={user.id} className="group hover:bg-white/5 transition-all duration-500">
                                    <td className="py-8 px-12">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-[#0a0f1d] rounded-2xl flex items-center justify-center font-bold text-xl text-slate-600 border border-white/5 shadow-inner group-hover:text-blue-500 group-hover:scale-110 transition-all">
                                                {user.name[0]}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-bold text-lg text-white tracking-tight">{user.name}</p>
                                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-12 text-center">
                                        <span className={cn(
                                            "px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] border shadow-lg",
                                            user.role === "ADMIN"
                                                ? "bg-purple-600/10 text-purple-400 border-purple-500/20 shadow-purple-900/10"
                                                : "bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-blue-900/10"
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-8 px-12 text-right text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">{formatDate(user.joined)}</td>
                                    <td className="py-8 px-12 text-center">
                                        <span className={cn(
                                            "px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] border shadow-lg",
                                            user.status === "ACTIVE"
                                                ? "bg-emerald-600/10 text-emerald-400 border-emerald-500/20 shadow-emerald-900/10"
                                                : "bg-red-600/10 text-red-400 border-red-500/20 shadow-red-900/10"
                                        )}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-8 px-12 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleUserStatus(user.id, user.status)}
                                                className="w-12 h-12 bg-[#0a0f1d] border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all shadow-xl active:scale-90"
                                            >
                                                {user.status === "ACTIVE" ? <Lock size={20} /> : <Unlock size={20} />}
                                            </button>
                                            <button className="w-12 h-12 bg-[#0a0f1d] border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all shadow-xl active:scale-90">
                                                <MessageSquare size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
