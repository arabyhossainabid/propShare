"use client";

import React, { useState } from "react";
import {
    MessageSquare,
    Send,
    User,
    CornerDownRight
} from "lucide-react";
import { toast } from "react-hot-toast";
import { interactionService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    content: string;
    user: {
        name: string;
    };
    createdAt: string;
    replies?: Comment[];
}

interface CommentSectionProps {
    propertyId: string;
    comments: Comment[];
}

export default function CommentSection({ propertyId, comments: initialComments }: CommentSectionProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return toast.error("Institutional identification required.");
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const response = await interactionService.comment({
                propertyId,
                content: newComment,
                parentId: replyTo || undefined
            });

            setComments([...comments, response.data]);
            setNewComment("");
            setReplyTo(null);
            toast.success("Protocol communication dispatched.");
        } catch (error) {
            toast.error("Transmission failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-heading text-white tracking-tight leading-tight flex items-center gap-3">
                            Discussion Terminal
                            <span className="bg-white/5 text-slate-500 text-[9px] px-3 py-1 rounded-lg font-bold border border-white/5">
                                {comments.length} RECORDS
                            </span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Post Comment */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
                <form onSubmit={handleComment} className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#0a0f1d] rounded-xl flex items-center justify-center text-blue-500 border border-white/5 shadow-xl">
                            <User size={18} />
                        </div>
                        <span className="text-xs font-bold text-white uppercase tracking-[0.15em]">
                            {user ? user.name : "Unidentified Participant"}
                        </span>
                        {replyTo && (
                            <span className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                Target: Reply <button onClick={() => setReplyTo(null)} className="hover:text-red-200 transition-colors bg-white/10 rounded-full w-4 h-4 flex items-center justify-center pb-0.5">×</button>
                            </span>
                        )}
                    </div>
                    <textarea
                        placeholder={user ? "Share your professional perspective on this asset..." : "Please sign in to join the active protocol discussion."}
                        disabled={!user || loading}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-[#0a0f1d] border border-white/5 rounded-3xl p-4 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all min-h-[100px] disabled:opacity-30 shadow-inner"
                    />
                    <div className="flex justify-end">
                        <button
                            disabled={!user || loading}
                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-700 text-white px-10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-3"
                        >
                            {loading ? "..." : "Sync Message"}
                            <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-10">
                {comments.map((comment) => (
                    <div key={comment.id} className="group relative">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-white/5 shrink-0 group-hover:scale-110 transition-transform">
                                <User size={24} />
                            </div>
                            <div className="grow space-y-3">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-bold text-white tracking-tight">{comment.user.name}</span>
                                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">{comment.createdAt}</span>
                                </div>
                                <p className="text-slate-400 text-sm leading-[1.7] font-medium opacity-90">
                                    {comment.content}
                                </p>
                                <div className="flex items-center gap-6 pt-2">
                                    <button
                                        onClick={() => setReplyTo(comment.id)}
                                        className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                        Respond
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-14 mt-8 space-y-6 border-l border-white/5 pl-8 relative">
                                <div className="absolute top-0 left-0 w-px h-8 bg-linear-to-b from-blue-500/50 to-transparent -translate-x-px" />
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-5">
                                        <div className="w-10 h-10 bg-white/2 rounded-xl flex items-center justify-center text-slate-600 border border-white/5 shrink-0">
                                            <CornerDownRight size={18} />
                                        </div>
                                        <div className="grow space-y-1.5 pt-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-white tracking-tight">{reply.user.name}</span>
                                                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{reply.createdAt}</span>
                                            </div>
                                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                                {reply.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {comments.length === 0 && (
                    <div className="text-center py-12 px-10 bg-white/2 rounded-3xl border border-dashed border-white/5 space-y-6">
                        <div className="w-20 h-20 bg-[#0a0f1d] rounded-2xl flex items-center justify-center text-slate-700 mx-auto shadow-2xl border border-white/5">
                            <MessageSquare size={36} />
                        </div>
                        <div className="space-y-2">
                            <p className="text-white font-bold text-lg">No Active Discussion</p>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Initiate communication to share perspectives</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
