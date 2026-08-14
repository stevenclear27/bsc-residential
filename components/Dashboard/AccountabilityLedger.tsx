"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface MessagePayload {
  id: string;
  text_payload: string;
  sender_id: string;
  created_at: string;
}

interface LedgerProps {
  project: any;
}

export default function AccountabilityLedger({ project }: LedgerProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const feedEndRef = useRef<HTMLDivElement>(null);
  const status = project?.id ? "active" : "no_project";

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    initializeUser();
  }, [supabase]);

  useEffect(() => {
    if (project?.id) {
      fetchMessages(project.id);
    }
  }, [project?.id, supabase]);

  const fetchMessages = async (targetProjectId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("project_id", targetProjectId)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data || []);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !project?.id || !userId || status !== "active")
      return;

    setIsTransmitting(true);

    const { error } = await supabase.from("messages").insert({
      project_id: project.id,
      sender_id: userId,
      text_payload: inputValue.trim(),
    });

    if (!error) {
      setInputValue("");
      await fetchMessages(project.id);
    } else {
      console.error("Transmission Fault:", error);
    }

    setIsTransmitting(false);
  };

  return (
    <div className="bg-brand-surface border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px]">
      <header className="bg-zinc-900/80 border-b border-zinc-800 p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary">
          Direct Communications Link
        </h2>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
          Master Carpenter & Client Feed
        </p>
      </header>

      {/* THE FEED */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative bg-brand-canvas/30">
        {status === "no_project" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-sm text-center px-6">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
              No Active Blueprint Detected
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Your identity is verified, but no active construction parameters
              exist. The ledger will unlock once the server finishes
              synthesizing your dossier.
            </p>
          </div>
        )}

        {status === "active" && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-zinc-600 uppercase tracking-widest text-xs font-bold">
            Ledger initialized. Awaiting transmission.
          </div>
        ) : (
          messages.map((msg) => {
            const isClient = msg.sender_id === userId;
            return (
              <div
                key={msg.id}
                className={`flex ${isClient ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-sm ${
                    isClient
                      ? "bg-brand-primary/10 border border-brand-primary/30 text-white"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-300"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {msg.text_payload}
                  </p>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-2 block">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={feedEndRef} />
      </div>

      {/* THE INPUT MANIFOLD */}
      <form
        onSubmit={handleTransmit}
        className="flex gap-2 items-end p-4 bg-zinc-900/80 border-t border-zinc-800"
      >
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status !== "active"}
          placeholder={
            status === "active"
              ? "Message your Master Carpenter..."
              : "Ledger locked."
          }
          className="flex-1 bg-zinc-900/50 border border-zinc-700 rounded-sm p-4 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none h-14 min-h-[56px] max-h-32 custom-scrollbar disabled:opacity-50 disabled:cursor-not-allowed"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleTransmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={isTransmitting || !inputValue.trim() || status !== "active"}
          className="px-6 py-4 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest rounded-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-14"
        >
          {isTransmitting ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
