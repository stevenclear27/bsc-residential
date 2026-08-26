"use client"; // Required for state management and user interactivity

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";

// STRICT DATA CONTRACTS[cite: 1, 2]
interface ConsultationFeedProps {
  zipCode: string;
  onIntakeComplete: (dossierData: any) => void;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string | any[];
}

interface PendingImage {
  mimeType: string;
  data: string;
}

export default function ConsultationFeed({
  zipCode,
  onIntakeComplete,
}: ConsultationFeedProps) {
  // STATE MANAGEMENT: The Conversational Array
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome. I am the architectural design consultant for BSC Residential. To get started, could you describe your vision for this space? Feel free to upload any photos of the current area or inspiration images you've saved.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // UTILITY: Auto-scroll to the newest message
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // UTILITY: Client-side Base64 Image Compression
  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // Protect operational bandwidth: max 3 images per transmission
    const files = Array.from(e.target.files).slice(0, 3);

    const base64Promises = files.map((file) => {
      return new Promise<PendingImage>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          resolve({ mimeType: file.type, data: result.split(",")[1] });
        };
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const processed = await Promise.all(base64Promises);
      // Array Mutability Best Practice: Spread previous state, do not push directly.
      setPendingImages((prev) => [...prev, ...processed].slice(0, 3));
    } catch (error) {
      console.error("Image processing error", error);
    }
  };

  // EXECUTION: Construct payload and transmit to OpenAI backend
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && pendingImages.length === 0) return;

    setIsProcessing(true);

    // Assemble OpenAI multimodal structure
    const userContent: any[] = [];
    if (inputValue.trim()) {
      userContent.push({ type: "text", text: inputValue });
    }
    pendingImages.forEach((img) => {
      userContent.push({
        type: "image_url",
        image_url: { url: `data:${img.mimeType};base64,${img.data}` },
      });
    });

    const newUserMessage: Message = { role: "user", content: userContent };
    const updatedMessages = [...messages, newUserMessage];

    // Optimistic UI Update: Render client message immediately
    setMessages(updatedMessages);
    setInputValue("");
    setPendingImages([]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error("API Fault");

      const data = await response.json();

      // THE STATE SHIFT: Evaluate the AI's response type
      // CONDITION 1: The AI is acting as the Designer (Chatting)
      if (data.type === "chat_response") {
        // You must append the AI's response to your local React state so the chat bubble renders
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.message },
        ]);
      }
      // CONDITION 2: The AI is acting as the Project Manager (Dossier Built)
      else if (data.type === "dossier_generated") {
        // 1. Acknowledge the payload locally in the chat feed
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.message },
        ]);

        // 2. Transmit the structured payload up to the parent to trigger Step 2
        onIntakeComplete(data.data);
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "System connection interrupted. Please try transmitting again.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Sub-renderer for multimodal chat bubbles
  const renderContent = (content: string | any[]) => {
    if (typeof content === "string") return <p>{content}</p>;
    return (
      <div className="flex flex-col gap-3">
        {content.map((item, idx) => {
          if (item.type === "text") return <p key={idx}>{item.text}</p>;
          if (item.type === "image_url")
            return (
              <img
                key={idx}
                src={item.image_url.url}
                alt="upload"
                className="w-48 h-48 object-cover rounded border border-brand-primary/30 shadow-md"
              />
            );
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="bg-white border border-brand-primary/20 p-6 rounded-lg shadow-xl flex flex-col h-175 max-w-4xl mx-auto">
      <header className="border-b border-zinc-800 pb-4 mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-brand-primary uppercase tracking-widest">
            Design Consultation
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            AI Assisting BSC Residential
          </p>
        </div>
        <div className="text-xs text-brand-accent uppercase tracking-wider text-right">
          Zone Verified: {zipCode}
        </div>
      </header>

      {/* CHAT LOG */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-lg ${msg.role === "assistant" ? "bg-zinc-900/80 border border-zinc-800 text-zinc-300" : "bg-brand-primary/10 border border-brand-primary/30 text-brand-primary shadow-inner"}`}
            >
              {renderContent(msg.content)}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-zinc-900/80 border border-zinc-800 text-zinc-500 p-4 rounded-lg animate-pulse uppercase tracking-widest text-xs font-bold">
              Synthesizing...
            </div>
          </div>
        )}
        <div ref={feedEndRef} />
      </div>

      {/* INPUT MANIFOLD */}
      <form
        onSubmit={handleSendMessage}
        className="mt-4 pt-4 border-t border-zinc-800"
      >
        {pendingImages.length > 0 && (
          <div className="flex gap-3 mb-3 p-2 bg-zinc-900/50 rounded border border-zinc-800">
            {pendingImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-16 h-16 rounded overflow-hidden border border-brand-primary/50 shadow"
              >
                <img
                  src={`data:${img.mimeType};base64,${img.data}`}
                  alt="Queued"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-end">
          <label className="cursor-pointer p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded transition-colors text-brand-primary shadow-sm flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">
              + Photo
            </span>
          </label>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your reply here..."
            className="flex-1 bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none h-12.5 min-h-12.5 max-h-37.5 overflow-y-auto"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />

          <button
            type="submit"
            disabled={
              isProcessing || (!inputValue.trim() && pendingImages.length === 0)
            }
            className="px-6 py-4 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest rounded hover:bg-white disabled:opacity-50 transition-colors"
          >
            Transmit
          </button>
        </div>
      </form>
    </div>
  );
}
