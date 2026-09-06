'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { mockAirQuality } from '@/lib/mock-data';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  Info,
  Wind,
  Shield,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

import { aiApi } from '@/lib/api/ai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  hasAqiCard?: boolean;
  suggestedAction?: {
    title: string;
    xp: number;
    href: string;
  };
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-[#202124]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-[#5F6368]">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded-md bg-[#E8EAED] text-[#202124] font-mono text-[11px]">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function FormattedMessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{content}</p>;
  }

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul_${elements.length}`} className="space-y-2 my-2 pl-1">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={idx} className="font-bold text-sm text-[#202124] mt-3 mb-1">
          {parseInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="font-black text-sm text-[#202124] mt-3.5 mb-1.5">
          {parseInlineMarkdown(trimmed.replace(/^#+\s/, ''))}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      const bulletText = trimmed.replace(/^[-*•]\s+/, '');
      currentList.push(
        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#3C4043]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] mt-2 shrink-0" />
          <span className="flex-1">{parseInlineMarkdown(bulletText)}</span>
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (match) {
        currentList.push(
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#3C4043]">
            <span className="font-bold text-[#4285F4] text-xs shrink-0 mt-0.5">{match[1]}.</span>
            <span className="flex-1">{parseInlineMarkdown(match[2])}</span>
          </li>
        );
      }
    } else {
      flushList();
      elements.push(
        <p key={idx} className="text-xs sm:text-sm leading-relaxed text-[#3C4043] my-1">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-1.5">{elements}</div>;
}

export default function AIAssistantPage() {
  const { player, addToast } = useGamification();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${player.name}! I am **AirGuard AI** powered by Google Gemini. How can I assist your local climate actions, AQI analytics, or mission roadmap today?`,
      time: 'Just now',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const threadIdRef = useRef<string>(`session_${Date.now()}`);

  const suggestedPrompts = [
    'Explain today\'s AQI & health risks',
    'What clean air mission can I do today?',
    'Suggest a mission near Zone 04',
    'How can my company improve CSR impact?',
    'Why is pollution rising during evenings?',
    'Which zone needs the most help right now?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await aiApi.chat(prompt, historyPayload, threadIdRef.current);
      const lower = prompt.toLowerCase();
      const hasCard = lower.includes('aqi') || lower.includes('zone 04') || lower.includes('pm2.5');
      let action = undefined;

      if (lower.includes('mission') || lower.includes('quest') || lower.includes('task')) {
        action = {
          title: 'Start Suggested Clean Air Mission',
          xp: 250,
          href: '/missions',
        };
      } else if (lower.includes('csr') || lower.includes('fund') || lower.includes('company')) {
        action = {
          title: 'Explore CSR Project Matching',
          xp: 500,
          href: '/company/funds',
        };
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasAqiCard: hasCard,
        suggestedAction: action,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      addToast({
        title: 'AI Network Error',
        description: 'Using local environmental decision intelligence.',
        type: 'info',
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col space-y-4">
      {/* AI Header */}
      <div className="gdg-card p-4 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-[#34A853] flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-[#202124]">AirGuard AI Assistant</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-[#5F6368]">
              Environmental decision support model • Assistive advice mode
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#5F6368]">
          <Info className="w-4 h-4 text-[#80868B]" />
          <span>Trained on sensor feeds & verified climate models</span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto gdg-card p-4 sm:p-6 bg-white space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#34A853] flex items-center justify-center shrink-0 border border-[#CEEAD6] mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-xl space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-[#4285F4] text-white p-4 rounded-3xl rounded-tr-sm shadow-md'
                  : 'bg-[#F8FAFD] border border-[#E8EAED] text-[#202124] p-4 rounded-3xl rounded-tl-sm'
              }`}
            >
              <FormattedMessageContent content={msg.text} isUser={msg.sender === 'user'} />

              {/* Embedded AQI Card inside AI response */}
              {msg.hasAqiCard && (
                <div className="p-3 bg-white rounded-2xl border border-[#E8EAED] text-xs">
                  <div className="flex items-center justify-between font-bold mb-2">
                    <span className="text-[#202124]">Current Zone 04 Metrics</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FEF7E0] text-[#B06000] text-[10px]">
                      AQI 72 Moderate
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-1.5 bg-[#F8FAFD] rounded-lg">
                      <span className="text-[#80868B] block">PM2.5</span>
                      <strong className="text-[#202124]">32 μg/m³</strong>
                    </div>
                    <div className="p-1.5 bg-[#F8FAFD] rounded-lg">
                      <span className="text-[#80868B] block">Temp</span>
                      <strong className="text-[#202124]">31°C</strong>
                    </div>
                    <div className="p-1.5 bg-[#F8FAFD] rounded-lg">
                      <span className="text-[#80868B] block">Wind</span>
                      <strong className="text-[#202124]">12 km/h</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Action CTA */}
              {msg.suggestedAction && (
                <a
                  href={msg.suggestedAction.href}
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#D2E3FC] hover:border-[#4285F4] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-[#4285F4] text-[#4285F4]" />
                    <span className="text-xs font-bold text-[#1967D2]">
                      {msg.suggestedAction.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-black text-[10px]">
                    +{msg.suggestedAction.xp} XP
                  </span>
                </a>
              )}

              <span
                className={`text-[9px] block text-right ${
                  msg.sender === 'user' ? 'text-white/75' : 'text-[#80868B]'
                }`}
              >
                {msg.time}
              </span>
            </div>

            {msg.sender === 'user' && (
              <img
                src={player.avatar}
                alt={player.name}
                className="w-8 h-8 rounded-full object-cover border border-[#E8EAED] mt-0.5"
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#34A853] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8F0FE] border border-[#E8EAED] hover:border-[#D2E3FC] text-xs font-semibold text-[#3C4043] whitespace-nowrap transition-colors shadow-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 shrink-0"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask AirGuard AI anything about air quality, missions, or environmental advice..."
            className="w-full h-12 pl-4 pr-12 text-xs font-medium bg-white border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none shadow-sm transition-colors"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white disabled:opacity-40 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
