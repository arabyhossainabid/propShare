"use client";

import React, { useState } from "react";
import {
    ArrowBigUp,
    ArrowBigDown,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import { toast } from "react-hot-toast";
import { interactionService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface VoteProps {
    propertyId: string;
    initialUpvotes: number;
    initialDownvotes: number;
    userVote?: "UPVOTE" | "DOWNVOTE" | null;
}

export default function VoteButtons({ propertyId, initialUpvotes, initialDownvotes, userVote: initialUserVote }: VoteProps) {
    const { user } = useAuth();
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const [userVote, setUserVote] = useState(initialUserVote);
    const [loading, setLoading] = useState(false);

    const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE") => {
        if (!user) return toast.error("Institutional identification required.");
        if (loading) return;

        setLoading(true);
        try {
            await interactionService.vote({ propertyId, voteType });

            // Update local state (optimistic)
            if (userVote === voteType) {
                setUserVote(null);
                voteType === "UPVOTE" ? setUpvotes(upvotes - 1) : setDownvotes(downvotes - 1);
            } else {
                if (userVote) {
                    userVote === "UPVOTE" ? setUpvotes(upvotes - 1) : setDownvotes(downvotes - 1);
                }
                setUserVote(voteType);
                voteType === "UPVOTE" ? setUpvotes(upvotes + 1) : setDownvotes(downvotes + 1);
            }
            toast.success(voteType === "UPVOTE" ? "Asset sentiment increased." : "Asset sentiment decreased.");
        } catch (error) {
            toast.error("Transmission error.");
        } finally {
            setLoading(false);
        }
    };

    const netVotes = upvotes - downvotes;

    return (
        <div className="flex flex-col items-center gap-3 bg-[#0a0f1d] p-5 rounded-[28px] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <button
                disabled={loading}
                onClick={() => handleVote("UPVOTE")}
                className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-xl border",
                    userVote === "UPVOTE"
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
                        : "bg-white/5 text-slate-500 hover:text-emerald-500 border-white/5 hover:bg-white/10"
                )}
            >
                <ArrowBigUp className={cn(userVote === "UPVOTE" ? "fill-white" : "fill-slate-800")} size={32} />
            </button>

            <div className="text-center py-2 relative z-10">
                <p className={cn(
                    "text-xl font-bold font-heading tracking-tight",
                    netVotes > 0 ? "text-emerald-400" : netVotes < 0 ? "text-red-400" : "text-slate-500"
                )}>
                    {netVotes > 0 ? `+${netVotes}` : netVotes}
                </p>
                <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-0.5">Velo-Index</p>
            </div>

            <button
                disabled={loading}
                onClick={() => handleVote("DOWNVOTE")}
                className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-xl border",
                    userVote === "DOWNVOTE"
                        ? "bg-red-600 text-white border-red-500 shadow-red-500/20"
                        : "bg-white/5 text-slate-500 hover:text-red-500 border-white/5 hover:bg-white/10"
                )}
            >
                <ArrowBigDown className={cn(userVote === "DOWNVOTE" ? "fill-white" : "fill-slate-800")} size={32} />
            </button>
        </div>
    );
}
