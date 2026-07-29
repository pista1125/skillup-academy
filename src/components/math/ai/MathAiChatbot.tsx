import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Image as ImageIcon,
  X,
  Sparkles,
  RotateCcw,
  User,
  Loader2,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { invokeAiFunction } from '../../../lib/aiService';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: string;
}

export interface MathAiChatbotProps {
  examType: 'graduation' | 'admission';
  topicTitle: string;
  subtopicTitle: string;
  levelOrGrade: string;
}

/**
 * Preprocesses AI responses to convert non-standard math delimiters
 * (such as \[...\], \(...\), [ \cdot ... ], (\cdot ...)) into standard KaTeX delimiters ($...$ and $$...$$).
 */
function preprocessMathContent(content: string): string {
  if (!content) return '';

  let text = content;

  // 1. Replace explicit LaTeX block delimiters \[ ... \] with $$ ... $$
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$\n${math.trim()}\n$$\n`);

  // 2. Replace explicit LaTeX inline delimiters \( ... \) with $ ... $
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`);

  // 3. Convert square brackets containing LaTeX commands (e.g. [ 3 \cdot 2a = 6a ]) into $$ ... $$
  text = text.replace(/\[\s*([^\]\n]*?\\[a-zA-Z]+[^\]\n]*?)\s*\]/g, (_, math) => `$$${math.trim()}$$`);

  // 4. Convert parenthesized LaTeX expressions (e.g. (3 \cdot (2a + 3b)) or (5 \cdot (x + 4))) into $ ... $
  text = text.replace(/\(([^()\n]*?\\[a-zA-Z]+[^()\n]*?)\)/g, (_, math) => `$${math.trim()}$`);

  // 5. Catch remaining un-delimited lines/fragments containing commands like \cdot, \frac, \sqrt, \pm, \cdot
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g);
  text = parts
    .map((part) => {
      if (part.startsWith('$')) return part;
      return part.replace(/([a-zA-Z0-9\(\)\[\]\s\+\-\*\/\=\,\.\<\:\>]*(?:\\[a-zA-Z]+)+[a-zA-Z0-9\(\)\[\]\s\+\-\*\/\=\,\.\<\:\>]*)/g, (match) => {
        const trimmed = match.trim();
        if (/\\[a-zA-Z]+/.test(trimmed) && !trimmed.includes('\n')) {
          return `$${trimmed}$`;
        }
        return match;
      });
    })
    .join('');

  return text;
}

export function MathAiChatbot({
  examType,
  topicTitle,
  subtopicTitle,
  levelOrGrade
}: MathAiChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Szia! 👋 A **SkillUp AI Korrepetitor** vagyok. 
      
Jelenleg a **${topicTitle}** témakör **${subtopicTitle}** fejezetében tudok segíteni (${levelOrGrade}).

Tegyél fel egy kérdést, kérjezz elméletet, kérj feladatot, vagy **másold be közvetlenül a képernyőfotót (Ctrl+V)** / küldj egy képet!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Clipboard Paste (Ctrl+V / Cmd+V screenshot paste)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) continue;

        if (file.size > 10 * 1024 * 1024) {
          setErrorMsg('A beillesztett kép mérete maximum 10 MB lehet!');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result as string);
          setErrorMsg(null);
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  // Handle image file selection via file picker button
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('A kép mérete maximum 10 MB lehet!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  // Clear selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent && !selectedImage) return;

    setErrorMsg(null);
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create user message object for local state UI
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      imageUrl: selectedImage || undefined,
      timestamp: userTimestamp
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setIsLoading(true);

    try {
      // Build API messages payload for OpenAI GPT-4o multimodal input
      const apiMessages = updatedMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => {
          if (m.imageUrl) {
            return {
              role: m.role,
              content: [
                { type: 'text', text: m.content || 'Kérem a képen látható feladat elemzését/segítését.' },
                { type: 'image_url', image_url: { url: m.imageUrl } }
              ]
            };
          }
          return {
            role: m.role,
            content: m.content
          };
        });

      // Call Native AI Assistant
      const { data, error } = await invokeAiFunction('math-ai-assistant', {
        messages: apiMessages,
        context: {
          examType,
          topicTitle,
          subtopicTitle,
          levelOrGrade
        }
      });

      if (error) {
        throw new Error(error.message || 'Hiba történt az AI válasz elérésekor.');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const botReplyText = data?.reply || 'Sajnálom, nem érkezett válasz.';

      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err.message || 'Nem sikerült csatlakozni az AI korrepetitorhoz.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset conversation
  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Új beszélgetést indítottunk! 🚀
        
Készen állok a **${topicTitle} > ${subtopicTitle}** témakör feladataira. Miben segíthetek?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMsg(null);
  };

  // Quick prompt chips
  const quickPrompts = [
    { label: 'Magyarázd el egyszerűbben!', icon: HelpCircle, text: 'Magyarázd el kérlek ezt az alfejezetet (vagy tételt) nagyon egyszerűen és közérthetően!' },
    { label: 'Adj egy gyakorló feladatot!', icon: BookOpen, text: 'Adj egy típusfeladatot ehhez az alfejezethez, de a megoldást még ne lődd le rögtön!' },
    { label: 'Ellenőrizd a megoldásomat!', icon: CheckCircle2, text: 'Szeretném ha leellenőriznéd a feladatmegoldásomat! Leírom vagy beillesztem (Ctrl+V) képen.' }
  ];

  return (
    <div
      onPaste={handlePaste}
      className="flex flex-col w-full bg-slate-50/80 rounded-2xl border border-slate-200/80 shadow-md overflow-hidden my-2 relative"
    >
      {/* 1. Header Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white px-5 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
            <Bot className="w-5 h-5 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm tracking-wide">SkillUp AI Korrepetitor</h3>
              <span className="px-2 py-0.5 bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-[10px] font-bold rounded-full uppercase tracking-wider">
                GPT-4o Vision
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 truncate max-w-md">
              {topicTitle} &bull; <span className="font-semibold text-white">{subtopicTitle}</span> ({levelOrGrade})
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="Beszélgetés törlése / Új indítás"
          className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold rounded-lg transition-all border border-white/15"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Új chat</span>
        </button>
      </div>

      {/* 2. Messages List */}
      <div className="p-4 sm:p-6 space-y-4 min-h-[250px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar Badge */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
              }`}
            >
              {/* Image Thumbnail inside User Message */}
              {msg.imageUrl && (
                <div className="mb-3 overflow-hidden rounded-xl border border-white/20 max-w-sm">
                  <img src={msg.imageUrl} alt="Csatolt kép" className="w-full object-cover max-h-60" />
                </div>
              )}

              {/* Message Markdown Content with Preprocessed Math */}
              <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-inherit prose-p:my-1 prose-ul:my-1 text-inherit">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {preprocessMathContent(msg.content)}
                </ReactMarkdown>
              </div>

              <div
                className={`text-[10px] mt-2 font-medium flex items-center gap-1 ${
                  msg.role === 'user' ? 'text-indigo-200 justify-end' : 'text-slate-400 justify-start'
                }`}
              >
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 flex-row">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none p-4 shadow-sm text-sm flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="text-slate-600 font-medium text-xs">Az AI Korrepetitor gondolkodik a feladaton...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* 3. Sticky Bottom Section (Quick Prompts + Image Preview + Input Bar) */}
      <div className="sticky bottom-0 z-10 bg-white border-t border-slate-200/80 shadow-lg">
        {/* Error Banner */}
        {errorMsg && (
          <div className="mx-4 mt-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="flex-1 font-medium">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Starter Prompts Chips */}
        {messages.length < 3 && !isLoading && (
          <div className="px-4 pt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, idx) => {
              const IconComponent = qp.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.text)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                >
                  <IconComponent className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{qp.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Image Attachment Preview */}
        {selectedImage && (
          <div className="px-4 pt-2 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <img src={selectedImage} alt="Előnézet" className="w-14 h-14 object-cover rounded-lg border-2 border-emerald-500 shadow-sm" />
                <button
                  onClick={removeSelectedImage}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 block">Kép csatolva (vágólapról vagy fájlból)!</span>
                <span className="text-[11px] text-slate-500">Küldd el a kérdéseddel együtt.</span>
              </div>
            </div>
            <button
              onClick={removeSelectedImage}
              className="text-xs text-red-600 hover:underline font-semibold px-2 py-1"
            >
              Törlés
            </button>
          </div>
        )}

        {/* Input Control Bar */}
        <div className="p-3 sm:p-4 flex items-center gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Kép csatolása gombbal vagy Ctrl+V beillesztéssel"
            disabled={isLoading}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              selectedImage
                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 font-bold'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Kérdezz a feladatról (beilleszthetsz képernyőfotót Ctrl+V-vel is)..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 disabled:opacity-50 disabled:scale-100 text-white rounded-xl font-bold text-sm flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Küldés</span>
          </button>
        </div>
      </div>
    </div>
  );
}
