export type ChatRole = 'system' | 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string; // Changed from number to string to match the usage in VoiceAssistant.tsx
};
