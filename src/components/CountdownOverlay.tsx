import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { McQueenHeroArt } from './McQueenArt';

interface CountdownOverlayProps {
  playerName: string;
  onComplete: () => void;
}

const STEPS = [
  { label: '3', subtitle: 'Preparar motores...' },
  { label: '2', subtitle: 'Ajustando o turbo...' },
  { label: '1', subtitle: 'Atenção na largada!' },
  { label: 'VRUM!', subtitle: 'LARGADA AUTORIZADA!' },
];

export function CountdownOverlay({ playerName, onComplete }: CountdownOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) {
      const doneTimer = window.setTimeout(onComplete, 480);
      return () => window.clearTimeout(doneTimer);
    }

    const nextTimer = window.setTimeout(() => {
      setStepIndex((prev) => prev + 1);
    }, 450);

    return () => window.clearTimeout(nextTimer);
  }, [stepIndex, onComplete]);

  const current = STEPS[stepIndex];
  const isGo = stepIndex === STEPS.length - 1;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-[#11111a] p-6 text-center shadow-2xl shadow-black/70 sm:p-10"
    >
      <p className="text-xs font-bold tracking-wide text-amber-400">
        Grid de Largada · Piloto {playerName}
      </p>

      {/* Semáforo de Largada */}
      <div
        className="mt-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-zinc-950 px-5 py-3.5"
        aria-label="Semáforo de largada"
      >
        <span
          className={`h-7 w-7 rounded-full border border-white/10 transition-all duration-150 ${
            stepIndex >= 0 && !isGo
              ? 'bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.85)]'
              : 'bg-zinc-800'
          }`}
        />
        <span
          className={`h-7 w-7 rounded-full border border-white/10 transition-all duration-150 ${
            stepIndex >= 1 && !isGo
              ? 'bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.85)]'
              : 'bg-zinc-800'
          }`}
        />
        <span
          className={`h-7 w-7 rounded-full border border-white/10 transition-all duration-150 ${
            stepIndex >= 2 && !isGo
              ? 'bg-amber-400 shadow-[0_0_18px_rgba(250,204,21,0.85)]'
              : 'bg-zinc-800'
          }`}
        />
        <span
          className={`h-7 w-7 rounded-full border border-white/10 transition-all duration-150 ${
            isGo
              ? 'bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.95)]'
              : 'bg-zinc-800'
          }`}
        />
      </div>

      <motion.div
        key={current.label}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.16 }}
        className="mt-5"
      >
        <p
          className={`font-display text-5xl font-extrabold tracking-tight sm:text-6xl ${
            isGo ? 'text-emerald-400' : 'text-white'
          }`}
        >
          {current.label}
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-300">{current.subtitle}</p>
      </motion.div>

      <div className="mt-4 w-full max-w-xs">
        <McQueenHeroArt className="h-auto w-full" />
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="mt-2 cursor-pointer text-xs font-semibold text-zinc-400 underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-2 py-1"
      >
        Pular contagem
      </button>
    </motion.section>
  );
}
