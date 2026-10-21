'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  PhoneCall, 
  HelpCircle, 
  CheckCircle2, 
  CreditCard, 
  Clock 
} from 'lucide-react';

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hi OneSkills team! I would like details regarding the upcoming course batches and enrollment.');

  const handleSend = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-105 group"
          aria-label="Contact OneSkills on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white" />
          <MessageCircle className="w-7 h-7 fill-current" />
        </button>
      </div>

      {/* WhatsApp Quick Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">OneSkills Admissions Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Typically replies in under 10 minutes</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-emerald-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Topics */}
          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Quick Question Starters:
            </p>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setMessage('Hi! Can I pay the course fee via JazzCash / EasyPaisa? Please share account details.')}
                className="text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>How to pay via JazzCash / EasyPaisa?</span>
              </button>

              <button
                onClick={() => setMessage('Hi! What are the exact batch timings for the Full-Stack Web Development Bootcamp?')}
                className="text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>What are the live batch timings?</span>
              </button>

              <button
                onClick={() => setMessage('Hi! Do you provide installment options for Pakistani students?')}
                className="text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Are fee installments available?</span>
              </button>
            </div>
          </div>

          {/* Message Input & Send */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-emerald-500"
            />
            <button
              onClick={handleSend}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
            >
              <span>Chat</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
