import { useState } from 'react';
import { CarFront } from 'lucide-react';

export const RACER_VOLT_IMAGE = '/src/assets/images/racer_coach_purple_1795517376540.jpg';
export const RACER_SPIKE_IMAGE = '/src/assets/images/racer_victory_gold_1795517402853.jpg';
export const RACER_CYAN_IMAGE = '/src/assets/images/racer_cyan_drift_1795517973592.jpg';
export const RACER_VELOX_IMAGE = '/src/assets/images/racer_emerald_rally_1795517974109.jpg';

export interface CompanionRacer {
  id: string;
  name: string;
  number: string;
  role: string;
  image: string;
  bodyColor: string;
  stripeColor: string;
  accentText: string;
}

export const COMPANION_RACERS: CompanionRacer[] = [
  {
    id: 'volt',
    name: 'Volt',
    number: '07',
    role: 'Engenheiro Neon',
    image: RACER_VOLT_IMAGE,
    bodyColor: '#9333EA',
    stripeColor: '#EC4899',
    accentText: 'text-pink-400',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    number: '11',
    role: 'Mestre do Drift',
    image: RACER_CYAN_IMAGE,
    bodyColor: '#06B6D4',
    stripeColor: '#E2E8F0',
    accentText: 'text-cyan-400',
  },
  {
    id: 'velox',
    name: 'Velox',
    number: '42',
    role: 'Piloto de Rally',
    image: RACER_VELOX_IMAGE,
    bodyColor: '#10B981',
    stripeColor: '#A3E635',
    accentText: 'text-emerald-400',
  },
  {
    id: 'spike',
    name: 'Spike',
    number: '07',
    role: 'Veterano da Pista',
    image: RACER_SPIKE_IMAGE,
    bodyColor: '#F59E0B',
    stripeColor: '#EF4444',
    accentText: 'text-amber-400',
  },
];

interface RacerImageProps {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
}

export function RacerImage({ src, alt, fallbackLabel, className = '' }: RacerImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-red-950/50 to-zinc-900 p-4 text-center ${className}`}
      >
        <CarFront className="h-10 w-10 text-amber-400" aria-hidden="true" />
        <span className="mt-2 text-xs font-bold text-white">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
