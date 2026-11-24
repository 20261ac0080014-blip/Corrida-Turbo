import { ArrowRight, Flag, Trophy, User, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { POINTS_PER_QUESTION, QUIZ_QUESTIONS } from '../data/questions';
import { McQueenHeroArt } from './McQueenArt';
import { COMPANION_RACERS, RacerImage } from './RacerVisuals';

interface StartScreenProps {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  bestScore: number | null;
  onStart: () => void;
}

export function StartScreen({
  playerName,
  onPlayerNameChange,
  bestScore,
  onStart,
}: StartScreenProps) {
  const maxPoints = QUIZ_QUESTIONS.length * POINTS_PER_QUESTION;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onStart();
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Coluna Principal: Formulário do Piloto + McQueen + Botão Começar */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#11111a] p-6 shadow-2xl shadow-black/60 sm:p-9 lg:col-span-7"
        >
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-amber-400">
              <span>Grande Prêmio do Código</span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="text-zinc-300">{QUIZ_QUESTIONS.length} voltas</span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="text-rose-400">Até {maxPoints} pontos</span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white [text-wrap:balance] sm:text-5xl sm:leading-[1.08]">
              Desafio da{' '}
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-pink-500 bg-clip-text text-transparent">
                Programação
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Entre na pista com o <strong className="text-white">Relâmpago McQueen #95</strong>!
              Responda às 10 perguntas de Lógica, HTML, CSS e JavaScript, ultrapasse os rivais e
              conquiste seu certificado e uma figurinha especial no final.
            </p>

            {/* Campo para o usuário colocar o nome */}
            <div className="mt-6">
              <label
                htmlFor="pilot-name"
                className="flex items-center gap-2 text-sm font-bold text-white"
              >
                <User className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span>Digite seu nome de piloto</span>
              </label>
              <input
                id="pilot-name"
                type="text"
                maxLength={28}
                value={playerName}
                onChange={(e) => onPlayerNameChange(e.target.value)}
                placeholder="Ex.: Lucas, Mariana, João..."
                className="mt-2 min-h-[48px] w-full rounded-2xl border border-white/15 bg-[#09090e] px-4 py-3 text-base font-medium text-white placeholder:text-zinc-500 transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                Seu nome aparecerá no carro da pista e no certificado final.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 px-8 py-3.5 text-base font-extrabold text-white shadow-lg shadow-red-600/30 transition-all duration-150 hover:brightness-110 hover:shadow-xl hover:shadow-amber-500/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111a] whitespace-nowrap shrink-0"
              >
                <Flag className="h-5 w-5" aria-hidden="true" />
                <span>Começar Corrida</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>

              {bestScore !== null && (
                <div className="flex items-center gap-2 px-1 text-sm font-semibold text-zinc-200">
                  <Trophy className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">
                    Recorde: <strong className="font-bold text-amber-400">{bestScore}</strong> pts
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs font-medium text-zinc-400">Circuito</p>
              <p className="font-display mt-0.5 text-lg font-bold text-white tabular-nums sm:text-xl">
                {QUIZ_QUESTIONS.length} voltas
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Por acerto</p>
              <p className="font-display mt-0.5 text-lg font-bold text-amber-400 tabular-nums sm:text-xl">
                +{POINTS_PER_QUESTION} pts
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Prêmio Final</p>
              <p className="font-display mt-0.5 text-lg font-bold text-rose-400 sm:text-xl">
                Certificado
              </p>
            </div>
          </div>
        </form>

        {/* Coluna Secundária: McQueen Principal + Outros Personagens */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/10 bg-[#11111a] p-6 shadow-2xl shadow-black/60 sm:p-7 lg:col-span-5">
          {/* Card Destaque do McQueen */}
          <div className="overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-b from-[#1d1016] to-[#12121b] p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-400">Personagem Principal</span>
                <h2 className="font-display text-lg font-extrabold text-white">
                  Relâmpago McQueen #95
                </h2>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-red-400">
                <Zap className="h-4 w-4" aria-hidden="true" />
                <span>Katchau!</span>
              </span>
            </div>

            <div className="mt-2">
              <McQueenHeroArt className="h-auto w-full" />
            </div>

            <div className="racing-curbs mt-1 h-2 w-full rounded-full opacity-90" aria-hidden="true" />
          </div>

          {/* Outros Personagens na Pista */}
          <div>
            <h3 className="font-display text-sm font-bold text-zinc-200">
              Outros pilotos e equipe na pista
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {COMPANION_RACERS.map((racer) => (
                <div
                  key={racer.id}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#171724] p-2"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                    <RacerImage
                      src={racer.image}
                      alt={`${racer.name} número ${racer.number}`}
                      fallbackLabel={racer.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-xs font-bold text-white">
                      {racer.name} #{racer.number}
                    </p>
                    <p className={`truncate text-[11px] font-medium ${racer.accentText}`}>
                      {racer.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
