import { motion, MotionProps } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';
import { ChatMessage } from '../types/chat';

interface Props extends MotionProps {
  message: ChatMessage;
  className?: string;
}

export default function ChatBubble({ message, className, ...rest }: Props) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} ${className || ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        {...rest}
      >
        <div className={`max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
              {isUser ? <User className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            </div>
            <div className={`rounded-3xl border p-4 text-sm leading-7 shadow-lg ${isUser ? 'border-cyan-500/20 bg-cyan-500/90 text-slate-950 rounded-br-none' : 'border-white/10 bg-slate-900/95 text-white rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/50">{time}</div>
        </div>
      </motion.div>
    </div>
  );
}
