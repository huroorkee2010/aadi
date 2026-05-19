import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voice AI Admission Assistant',
  description:
    'Premium AI-powered voice assistant for university admissions, counseling, scholarships, placements, and career guidance.',
  keywords: [
    'AI Voice Assistant',
    'University Admission',
    'OpenAI',
    'Next.js',
    'Voice AI',
    'AI Counselor',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#1e293b,#020617)]" />

        {/* Enhanced Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />

        {/* Glow Effects */}
        <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-pink-500/30 blur-3xl rounded-full -z-10" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/30 blur-3xl rounded-full -z-10" />

        {children}
      </body>
    </html>
  );
}