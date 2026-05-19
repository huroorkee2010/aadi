import { Mic, StopCircle } from 'lucide-react';

interface Props {
  listening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export default function MicButton({ listening, onStart, onStop, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={listening ? onStop : onStart}
      disabled={disabled}
      aria-label={listening ? 'Stop listening' : 'Start listening'}
      className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all ${listening ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30' : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30'} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {listening ? <StopCircle className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      {listening && (
        <span className="absolute -bottom-1 flex h-7 w-16 items-end justify-between">
          <span className="wave-bar" />
          <span className="wave-bar delay-150" />
          <span className="wave-bar delay-300" />
        </span>
      )}
    </button>
  );
}
