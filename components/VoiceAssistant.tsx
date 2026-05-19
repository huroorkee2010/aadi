"use client";

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Mic, MicOff, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types/chat';
import ChatBubble from './ChatBubble';

const DEFAULT_WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'नमस्ते! I am your voice admission counselor. Ask me about courses, fees, scholarships, hostel life, placement support, or career guidance. Just press the microphone and speak naturally.',
  timestamp: '2024-01-01T00:00:00.000Z',
};

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME]);
  const [inputText, setInputText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setInputText(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (e: any) => {
      const errorType = e?.error ?? '';
      if (errorType !== 'aborted' && errorType !== 'no-speech') {
        console.warn('Speech recognition warning:', errorType || e);
      }
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const sendMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `${Date.now()}-bot`,
        role: 'assistant',
        content: data.response?.content || 'I am here to help. Please ask another question.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      speakText(botMessage.content);
    } catch (error) {
      console.warn('Voice assistant request failed.', error);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (e) {
        console.warn('Unable to start voice recognition', e);
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-5 py-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-cyan-200/80">AI Voice Assistant</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Ask in your voice, get answers instantly.</h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300/90">Speak in English or Hindi, ask about admissions, scholarships, courses, hostel life, placements, or career guidance.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 shadow-inner shadow-black/10">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-5 w-5" />
              Smart responses
            </div>
            <p className="mt-2 text-slate-400">AI-guided answers that sound human and helpful.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 shadow-inner shadow-black/10">
            <div className="flex items-center gap-2 text-emerald-300">
              <MessageCircle className="h-5 w-5" />
              Voice-first chat
            </div>
            <p className="mt-2 text-slate-400">Press Speak and let the assistant listen to your question.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-cyan-500/10 bg-slate-900/90 p-4 shadow-xl shadow-cyan-500/10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-inner shadow-black/10">
          <span className="flex items-center gap-2 text-cyan-300"><MessageCircle className="h-4 w-4" /> Conversation {messages.length}</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">{listening ? 'Listening...' : 'Ready for your question'}</span>
        </div>

        <div className="mb-5 max-h-[420px] space-y-4 overflow-y-auto pr-2">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>

        <div className="grid gap-3 rounded-3xl bg-slate-950/90 p-4 sm:grid-cols-[1fr_auto_auto]">
          <label className="flex h-14 items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/90 px-4 text-slate-200 shadow-inner shadow-black/20">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message or speak..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>
          <button
            onClick={handleSend}
            className="flex items-center justify-center gap-2 rounded-3xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <Send className="h-4 w-4" /> Send
          </button>
          <button
            onClick={listening ? stopListening : startListening}
            className={`flex items-center justify-center gap-2 rounded-3xl px-5 text-sm font-semibold text-white transition ${listening ? 'bg-red-500 hover:bg-red-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}
          >
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? 'Stop' : 'Speak'}
          </button>
        </div>
      </div>
    </div>
  );
}
