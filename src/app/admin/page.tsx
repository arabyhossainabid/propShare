"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import PropertyReview from "@/components/admin/PropertyReview";
import UserManagement from "@/components/admin/UserManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import { propertyService } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"stats" | "review" | "users" | "categories">("stats");
    const [pendingProperties, setPendingProperties] = useState(0);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== "ADMIN")) {
            toast.error("Restricted access. Institutional clearance required.");
            router.push("/");
        }
    }, [user, authLoading]);

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const res = await propertyService.getAll({ status: "PENDING" });
                setPendingProperties(res.data.length);
            } catch (err) { }
        };
        fetchMeta();
    }, []);

    if (authLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1d] gap-6">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Synchronizing Master Terminal...</p>
        </div>
    );

    if (!user || user.role !== "ADMIN") return null;

    return (
        <div className="min-h-screen bg-[#0a0f1d] flex relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingCount={pendingProperties}
            />

            <main className="grow p-6 md:p-10 lg:p-14 overflow-x-hidden pt-32 lg:pt-40 relative z-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {activeTab === "stats" && <AdminStats />}
                    {activeTab === "review" && (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <PropertyReview />
                        </div>
                    )}
                    {activeTab === "users" && (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <UserManagement />
                        </div>
                    )}
                    {activeTab === "categories" && (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <CategoryManagement />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
