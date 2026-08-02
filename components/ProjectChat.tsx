"use client";

import { useState, useEffect } from "react";
import { Message } from "@/lib/types/database";
import { createClient } from "@/utils/supabase/client";

interface ProjectChatProps {
  projectId: string;
  currentUserId: string;
  initialMessages: Message[];
}

export default function ProjectChat({
  projectId,
  currentUserId,
  initialMessages,
}: ProjectChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const supabase = createClient();

  useEffect(() => {
    // 1. Establish the Realtime Subscription
    // We filter strictly by the project_id to prevent data bleed from other active builds.
    const channel = supabase
      .channel(`project_chat_${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          // Cast the incoming payload to our verified TypeScript contract
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        },
      )
      .subscribe();

    // 2. Controlled Demolition (Cleanup)
    // Severs the websocket connection when the component unmounts to prevent memory leaks.
    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, supabase]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const payloadText = inputText.trim();
    setInputText(""); // Optimistic UI clear to maintain a responsive feel

    // 3. Database Insertion
    // RLS policies will automatically block this if the currentUserId is not in the stakeholders junction table.
    const { error } = await supabase.from("messages").insert({
      project_id: projectId,
      sender_id: currentUserId,
      text_payload: payloadText,
    });

    if (error) {
      console.error("Transmission Error:", error.message);
      // In production, we will map this to a visible error toast for the Operator
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-brand-primary/20 rounded bg-brand-surface">
      {/* Header */}
      <div className="p-4 border-b border-brand-primary/20 bg-brand-canvas/50">
        <h3 className="text-sm font-bold text-brand-primary uppercase tracking-widest">
          Project Comm Ledger
        </h3>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-canvas">
        {messages.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center mt-4">
            No communications logged. The ledger is clear.
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded text-sm ${
                    isMe
                      ? "bg-brand-primary/10 border border-brand-primary/30 text-zinc-100"
                      : "bg-brand-surface border border-brand-primary/10 text-zinc-300"
                  }`}
                >
                  <p>{msg.text_payload}</p>
                  <span className="text-[10px] text-zinc-500 mt-2 block uppercase">
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
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-brand-primary/20 bg-brand-surface"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Log an update or ask a question..."
            className="flex-1 bg-brand-canvas border border-brand-primary/20 rounded p-2 text-sm text-zinc-100 focus:outline-none focus:border-brand-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider rounded border border-brand-primary/30 hover:bg-brand-primary/20 disabled:opacity-50 transition-colors"
          >
            Transmit
          </button>
        </div>
      </form>
    </div>
  );
}
