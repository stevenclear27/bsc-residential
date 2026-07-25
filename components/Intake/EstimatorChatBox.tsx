/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "model";
  text: string;
  images?: string[];
}

interface EstimatorChatBoxProps {
  onIntakeComplete?: (projectData: any) => void;
}

export default function EstimatorChatBox({
  onIntakeComplete,
}: EstimatorChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "I have your property zone anchored. Let's discuss your architectural vision—are we looking at upgrading exterior cladding to premium materials, establishing a custom timber frame, or building out a specialized space like a recording studio? Detail your structural goals and attach up to 3 site photos.",
    },
  ]);

  const [input, setInput] = useState("");
  const [imagePayloads, setImagePayloads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readyToCompile, setReadyToCompile] = useState(false);
  const [compiledData, setCompiledData] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest transmission
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, readyToCompile]);

  // Handle Multi-Image Selection and Base64 Conversion
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = 3 - imagePayloads.length;
    const filesToProcess = files.slice(0, availableSlots);

    if (filesToProcess.length < files.length) {
      alert("Maximum limit of 3 site photos reached.");
    }

    const base64Promises = filesToProcess.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    const newBase64Images = await Promise.all(base64Promises);
    setImagePayloads((prev) => [...prev, ...newBase64Images]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeStagedImage = (indexToRemove: number) => {
    setImagePayloads((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && imagePayloads.length === 0) || isLoading) return;

    const userMessage = input.trim();
    const currentImages = [...imagePayloads];

    setInput("");
    setImagePayloads([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    const newHistory: Message[] = [
      ...messages,
      {
        role: "user",
        text: userMessage,
        images: currentImages.length > 0 ? currentImages : undefined,
      },
    ];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory, message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.chatResponse || "Transmission received.",
        },
      ]);

      if (data.isComplete && onIntakeComplete) {
        setCompiledData(data.projectData);
        setReadyToCompile(true);
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "System Error: Connection disrupted. Please attempt transmission again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-primary/20 flex flex-col h-[700px]">
      <h3 className="text-xl font-bold text-brand-primary uppercase tracking-wide mb-4 shrink-0">
        Structural Consultation
      </h3>

      {/* Chat History Window */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-brand-primary/30"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-brand-primary text-brand-canvas rounded-br-none font-medium"
                  : "bg-brand-canvas border border-brand-primary/30 text-brand-primary rounded-bl-none"
              }`}
            >
              {msg.images && msg.images.length > 0 && (
                <div className="flex flex-col gap-2 mb-3">
                  {msg.images.map((imgSrc, i) => (
                    <img
                      key={i}
                      src={imgSrc}
                      alt={`Site Upload ${i + 1}`}
                      className="w-full max-w-sm rounded border border-brand-canvas/20"
                    />
                  ))}
                </div>
              )}
              {msg.text && <span>{msg.text}</span>}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 rounded text-sm bg-brand-canvas border border-brand-primary/30 text-brand-primary/50 rounded-bl-none animate-pulse">
              Analyzing structural parameters...
            </div>
          </div>
        )}
      </div>

      {/* Input Deck */}
      <div className="shrink-0 flex flex-col gap-4">
        {/* Enlarged Multi-Image Preview Stage */}
        {imagePayloads.length > 0 && (
          <div className="flex flex-col gap-3 px-4 py-4 bg-brand-primary/10 border border-brand-primary/30 rounded">
            <div className="flex justify-between items-center text-brand-primary">
              <span className="text-sm font-bold uppercase tracking-wider">
                Site Photos Staged ({imagePayloads.length}/3)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {imagePayloads.map((imgSrc, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={imgSrc}
                    alt={`Staged upload ${idx + 1}`}
                    className="w-full h-40 object-cover rounded border border-brand-primary/50 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeStagedImage(idx)}
                    className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-500 text-white font-bold px-2 py-1 uppercase text-xs rounded transition-colors shadow"
                    title="Remove Image"
                  >
                    [X]
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {readyToCompile ? (
          <div className="flex flex-col gap-3 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded animate-in fade-in duration-300">
            <button
              onClick={() => onIntakeComplete && onIntakeComplete(compiledData)}
              className="w-full py-4 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest rounded hover:bg-brand-primary/90 transition-colors shadow-sm"
            >
              Compile Project Dossier
            </button>
            <button
              onClick={() => {
                setReadyToCompile(false);
                setCompiledData(null);
              }}
              className="text-xs font-bold text-brand-primary/70 uppercase tracking-wide hover:text-brand-primary transition-colors text-center py-2"
            >
              Wait, I need to add more details
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransmit} className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || imagePayloads.length >= 3}
              className="px-4 py-3 border border-brand-primary/30 text-brand-primary rounded hover:bg-brand-primary/10 disabled:opacity-50 transition-colors flex items-center justify-center"
              title={
                imagePayloads.length >= 3
                  ? "Maximum photos attached"
                  : "Attach Site Photos"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Detail your material preferences and scope..."
              disabled={isLoading}
              className="flex-1 bg-brand-canvas border border-brand-primary/30 rounded px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={
                isLoading || (!input.trim() && imagePayloads.length === 0)
              }
              className="px-6 py-3 bg-brand-accent text-brand-primary font-bold uppercase tracking-widest rounded hover:bg-brand-accent/90 disabled:opacity-50 transition-colors"
            >
              Transmit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
