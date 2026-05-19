import { Award, Globe2, ShieldCheck } from 'lucide-react';
import VoiceAssistant from '../components/VoiceAssistant';

const features = [
  {
    icon: Globe2,
    title: 'Global admission guidance',
    description: 'Get clear advice on courses, fees, scholarships, and campus life with one voice assistant.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted support',
    description: 'A friendly AI counselor for students seeking career and admission guidance.',
  },
  {
    icon: Award,
    title: 'Smart course recommendations',
    description: 'Discover the right programs and paths for your goals and strengths.',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-500/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.20),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.14),transparent_30%)]" />
          <div className="relative px-6 py-8 lg:px-12 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] items-start">
              <div className="space-y-6 lg:pr-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
                  AI Voice Admission Assistant
                </span>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Chat with your voice in English & Hindi.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Speak naturally and get instant eligibility help, scholarship guidance, course suggestions, hostel insights, and placement advice from a modern voice assistant.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-200">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-white">{feature.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl min-h-[640px]">
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/95 p-4 text-slate-200 shadow-inner shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Live voice chat</p>
                    <p className="mt-2 text-xl font-semibold text-white">Talk naturally, get instant replies.</p>
                  </div>
                  <div className="rounded-3xl bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">Ready in seconds</div>
                </div>
                <div className="mt-6">
                  <VoiceAssistant />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}