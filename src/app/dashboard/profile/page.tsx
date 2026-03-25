"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Key } from "lucide-react";

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        firstName: "John", lastName: "Doe", email: "john@example.com",
        phone: "+880 1XXXXXXXXX", address: "Gulshan, Dhaka", bio: "Real estate investor focused on commercial properties.",
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold font-heading">Profile Settings</h1>
                <p className="text-sm text-white/40 mt-1">Manage your personal information and preferences.</p>
            </div>

            {/* Avatar Section */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white">JD</div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center border-2 border-[#0a0f1d]">
                            <Camera className="w-3 h-3 text-white" />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{profile.firstName} {profile.lastName}</h3>
                        <p className="text-sm text-white/40">Member since January 2024</p>
                        <div className="flex items-center gap-1 mt-1"><Shield className="w-3 h-3 text-emerald-400" /><span className="text-xs text-emerald-400">Verified Investor</span></div>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { label: "First Name", key: "firstName", icon: User },
                        { label: "Last Name", key: "lastName", icon: User },
                        { label: "Email", key: "email", icon: Mail, type: "email" },
                        { label: "Phone", key: "phone", icon: Phone },
                        { label: "Address", key: "address", icon: MapPin },
                    ].map((f) => {
                        const Icon = f.icon;
                        return (
                            <div key={f.key} className={`space-y-2 ${f.key === "address" ? "md:col-span-2" : ""}`}>
                                <label className="text-xs text-white/40 uppercase tracking-wider font-medium">{f.label}</label>
                                <div className="relative">
                                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <Input value={profile[f.key as keyof typeof profile]} onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })} className="bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white focus-visible:ring-blue-500/30" />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Bio</label>
                    <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500/30 outline-none resize-none" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 text-sm">Save Changes</Button>
            </div>

            {/* Security */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold">Security</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                    <div className="flex items-center gap-3"><Key className="w-4 h-4 text-white/30" /><div><p className="text-sm text-white">Change Password</p><p className="text-xs text-white/30">Last changed 3 months ago</p></div></div>
                    <Button variant="outline" className="border-white/10 text-white text-xs rounded-xl">Update</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
                    <div className="flex items-center gap-3"><Bell className="w-4 h-4 text-white/30" /><div><p className="text-sm text-white">Email Notifications</p><p className="text-xs text-white/30">Receive updates about your investments</p></div></div>
                    <Button variant="outline" className="border-white/10 text-white text-xs rounded-xl">Configure</Button>
                </div>
            </div>
        </div>
    );
}
