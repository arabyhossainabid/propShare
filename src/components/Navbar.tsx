"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    PlusCircle,
    Search,
    LayoutDashboard,
    User,
    LogOut,
    Menu,
    X,
    Building2,
    ShieldCheck,
    CreditCard,
    Zap,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Terminal", href: "/ideas", icon: Search },
        { name: "Portfolio", href: "/dashboard", icon: LayoutDashboard },
        { name: "Control", href: "/admin", icon: ShieldCheck, adminOnly: true },
    ].filter(link => !link.adminOnly || (user && user.role === "ADMIN"));

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        router.push("/");
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-100 transition-all duration-700 px-6 md:px-12",
                isScrolled
                    ? "py-4 bg-[#0a0f1d]/90 backdrop-blur-3xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] mt-0 rounded-none h-24"
                    : "bg-transparent py-10 h-32"
            )}
        >
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-4 group relative z-10"
                >
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-3xl shadow-blue-500/30 transition-all group-hover:rotate-6 group-hover:scale-110 active:scale-95">
                        <Building2 size={28} />
                    </div>
                    <span className="text-3xl font-bold font-heading text-white tracking-tighter flex items-center gap-1 transition-colors">
                        Prop<span className="text-blue-500">Share</span>
                    </span>
                    {isScrolled && (
                        <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 bg-white/2 rounded-lg border border-white/5 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                            <Globe size={10} className="animate-spin-slow" /> Registry Online
                        </div>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group",
                                pathname === link.href
                                    ? "bg-blue-600 text-white shadow-2xl shadow-blue-500/20"
                                    : "text-slate-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <link.icon size={18} className={cn("transition-colors", pathname === link.href ? "text-white" : "group-hover:text-blue-500")} />
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-8">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <div className="hidden xl:block text-right space-y-0.5">
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">Validated ID</p>
                                <p className="text-sm font-bold text-white tracking-tight">{user.name}</p>
                            </div>

                            <div className="relative group/user">
                                <button className="w-12 h-12 rounded-2xl bg-[#151c2e] flex items-center justify-center text-blue-500 shadow-xl border border-white/5 overflow-hidden hover:border-blue-500 transition-all hover:scale-105 active:scale-95">
                                    <div className="w-full h-full bg-linear-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-lg shadow-inner">
                                        {user.name.charAt(0)}
                                    </div>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute top-[calc(100%+12px)] right-0 w-64 bg-[#151c2e] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] p-3 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-500 translate-y-4 group-hover/user:translate-y-0 backdrop-blur-3xl z-110">
                                    <div className="px-5 py-4 border-b border-white/5 mb-2">
                                        <p className="text-sm font-bold text-white tracking-tight">{user.name}</p>
                                        <p className="text-[10px] text-slate-600 font-bold uppercase truncate mt-0.5 tracking-wider">{user.email}</p>
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-4 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:bg-white/2 hover:text-white rounded-2xl transition-all group/item">
                                        <LayoutDashboard size={18} className="group-hover/item:text-blue-500" /> My Assets
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-4 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group/item mt-1"
                                    >
                                        <LogOut size={18} className="group-hover/item:translate-x-1 transition-transform" /> Kill Session
                                    </button>
                                </div>
                            </div>

                            <button
                                className="lg:hidden text-white bg-white/2 p-3 rounded-2xl border border-white/5 active:scale-90 transition-all"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <Link href="/auth/login" className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4.5 text-slate-500 hover:text-white transition-colors">
                                Authenticate
                            </Link>
                            <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] shadow-3xl shadow-blue-500/20 active:scale-95 transition-all relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10">Access Registry</span>
                            </Link>
                            <button
                                className="lg:hidden text-slate-500 p-3 active:scale-90 transition-all"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-[calc(100%+12px)] left-6 right-6 bg-[#151c2e] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-3xl z-100 backdrop-blur-3xl"
                    >
                        <div className="p-8 space-y-5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-5 text-slate-500 px-6 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/2 hover:text-white border border-transparent hover:border-white/5"
                                >
                                    <link.icon size={20} className="text-blue-500" />
                                    {link.name}
                                </Link>
                            ))}
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-5 text-red-500 px-6 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                                >
                                    <LogOut size={20} /> Abort Session
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="text-center bg-white/2 border border-white/5 text-slate-400 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all">Sign In</Link>
                                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="text-center bg-blue-600 text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
