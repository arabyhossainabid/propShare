"use client";

import React from "react";
import Link from "next/link";
import {
    Building2,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

const footerLinks = {
    platform: {
        title: "Platform",
        links: [
            { name: "Browse Properties", href: "/properties" },
            { name: "How It Works", href: "/about" },
            { name: "Categories", href: "/categories" },
            { name: "Dashboard", href: "/dashboard" },
        ],
    },
    company: {
        title: "Company",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
    legal: {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/privacy" },
            { name: "Disclaimer", href: "/contact" },
        ],
    },
    support: {
        title: "Support",
        links: [
            { name: "Help Center", href: "/contact" },
            { name: "Contact Us", href: "/contact" },
            { name: "FAQs", href: "/about" },
            { name: "Community", href: "/contact" },
        ],
    },
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-[#0a0f1d]" />

            <div className="container-custom relative z-10">
                {/* Main Footer */}
                <div className="py-16 md:py-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Building2 className="w-5 h-5 text-white" />
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

                            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
                                The premier platform for fractional real estate
                                investment. Own shares in premium properties and earn
                                monthly rental income.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-white/40">
                                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>Road 11, Banani, Dhaka 1213</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/40">
                                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>hello@propshare.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/40">
                                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>+880 1XXXXXXXXX</span>
                                </div>
                            </div>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([key, section]) => (
                            <div key={key}>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-5">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-white/30 hover:text-white transition-colors duration-300 group flex items-center gap-1"
                                            >
                                                {link.name}
                                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/20">
                        © {new Date().getFullYear()} PropShare Protocol. All rights
                        reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4 text-white/40" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
