"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Menu,
    Building2,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import gsap from "gsap";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Animate navbar entrance
        gsap.fromTo(
            ".navbar",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? "bg-[#0a0f1d]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0f1d] animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight font-heading">
                                Prop<span className="text-blue-500">Share</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-muted -mt-1">
                                Protocol
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/auth/login">
                            <Button
                                variant="ghost"
                                className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-sm"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 text-sm group">
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10 rounded-xl"
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-[#0a0f1d] border-l border-white/5 w-80 p-0"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/5">
                                    <Link href="/" className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-lg font-bold font-heading text-white">
                                            Prop<span className="text-blue-500">Share</span>
                                        </span>
                                    </Link>
                                </div>

                                {/* Mobile Links */}
                                <div className="flex-1 p-6 space-y-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
                                        >
                                            <span className="text-sm font-medium">{link.name}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile CTA */}
                                <div className="p-6 border-t border-white/5 space-y-3">
                                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-xl border-white/10 text-white hover:bg-white/5 h-12"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 shadow-lg shadow-blue-500/20">
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
