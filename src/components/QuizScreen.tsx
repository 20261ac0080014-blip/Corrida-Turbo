import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Flag, Flame, Gauge, Trophy, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { POINTS_PER_QUESTION, QuizQuestion } from '../data/questions';
import { McQueenHeroArt, TrackCarSvg } from './McQueenArt';
import { COMPANION_RACERS, RacerImage } from './RacerVisuals';

interface QuizScreenProps {
  playerName: string;
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  correctCount: number;
  streak: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizScreen({
  playerName,
  question,
  currentIndex,
  totalQuestions,
  score,
  correctCount,
  streak,
  selectedOption,
  onSelectOption,
  onNext,
}: QuizScreenProps) {
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;
  const completedSteps = currentIndex + (isAnswered ? 1 : 0);
  const isLastQuestion = currentIndex + 1 === totalQuestions;

  // Posição dos carros na pista:
  // McQueen avança bastante com acertos e um pouco ao completar voltas
  const mcQueenProgress = Math.min(
    94,
    8 + (completedSteps / totalQuestions) * 42 + (correctCount / totalQuestions) * 44
  );
  const voltProgress = Math.min(88, 10 + (completedSteps / totalQuestions) * 70);
  const cyanProgress = Math.min(84, 6 + (completedSteps / totalQuestions) * 62);

  // Classificação ao vivo baseada na posição na pista
  const place =
    mcQueenProgress >= voltProgress
      ? '1º Lugar'
      : mcQueenProgress >= cyanProgress
        ? '2º Lugar'
        : '3º Lugar';

  // Velocidade divertida que sobe com o Turbo
  const speedKmh = 180 + streak * 35 + (isAnswered && isCorrect ? 25 : 0);

  // Alterna personagens da equipe nos comentários de pit-stop
  const activeCompanion = COMPANION_RACERS[currentIndex % COMPANION_RACERS.length];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!isAnswered) {
        const keyMap: Record<string, number> = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3,
          a: 0,
          b: 1,
          c: 2,
          d: 3,
        };
        const mapped = keyMap[event.key.toLowerCase()];
        if (mapped !== undefined) {
          event.preventDefault();
          onSelectOption(mapped);
        }
      } else if (event.key === 'Enter' || event.key === ' ') {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== 'BUTTON') {
          event.preventDefault();
          onNext();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, onNext, onSelectOption]);

  const coachHeadline = isCorrect
    ? streak >= 2
      ? `KATCHAU! Turbo x${streak} do McQueen! +${POINTS_PER_QUESTION} pontos`
      : `Ultrapassagem perfeita, ${playerName}! +${POINTS_PER_QUESTION} pts`
    : `Pit-stop com ${activeCompanion.name}! A certa era a ${OPTION_LETTERS[question.correctIndex]}.`;

  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-4xl"
    >
      {/* Telemetria da corrida */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-300">
          <span className="text-white">Piloto: {playerName}</span>
          <span aria-hidden="true" className="text-zinc-600">
            ·
          </span>
          <span className="tabular-nums text-zinc-200">
            Volta {String(currentIndex + 1).padStart(2, '0')} de {totalQuestions}
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            ·
          </span>
          <span className="text-amber-400">{question.category}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold tabular-nums sm:text-sm">
          <span className="flex items-center gap-1 text-emerald-400">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            <span>{place}</span>
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <span>{speedKmh} km/h</span>
          </span>
          {streak >= 2 && (
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span>Turbo x{streak}</span>
            </span>
          )}
          <span className="text-zinc-300">
            Pontos: <span className="text-white">{score}</span>
          </span>
        </div>
      </div>

      {/* Pista de corrida multi-faixas com McQueen e rivais */}
      <div
        className="mb-6 overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d14] shadow-lg"
        role="progressbar"
        aria-valuenow={completedSteps}
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-label="Posição do Relâmpago McQueen e dos rivais na pista"
      >
        <div className="racing-curbs h-1.5 w-full opacity-90" aria-hidden="true" />

        <div className="relative space-y-1.5 px-3 py-2.5 sm:px-4">
          {/* Linha de chegada à direita */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-4 bottom-0 flex flex-col items-center justify-center border-l-2 border-dashed border-amber-400/50 pl-1.5"
          >
            <Flag className="h-4 w-4 text-amber-400" />
          </div>

          {/* Faixa 1: Relâmpago McQueen (Jogador) */}
          <div className="relative flex h-8 items-center rounded-lg bg-white/[0.04] pr-10">
            <span className="ml-2 text-[11px] font-bold text-red-400 z-10">
              McQueen #95
            </span>
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-20"
              style={{ left: `clamp(38px, ${mcQueenProgress}%, calc(100% - 44px))` }}
            >
              <TrackCarSvg
                bodyColor="#EF4444"
                stripeColor="#FACC15"
                numberLabel="95"
                className="h-7 w-14 drop-shadow-[0_2px_8px_rgba(239,68,68,0.7)]"
              />
            </div>
          </div>

          {/* Faixa 2: Volt #07 */}
          <div className="relative flex h-7 items-center rounded-lg border-t border-dashed border-white/10 pr-10">
            <span className="ml-2 text-[10px] font-semibold text-pink-400/80 z-10">
              Volt #07
            </span>
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-10 opacity-90"
              style={{ left: `clamp(34px, ${voltProgress}%, calc(100% - 46px))` }}
            >
              <TrackCarSvg
                bodyColor="#9333EA"
                stripeColor="#EC4899"
                numberLabel="07"
                className="h-6 w-12"
              />
            </div>
          </div>

          {/* Faixa 3: Cyan #11 */}
          <div className="relative flex h-7 items-center rounded-lg border-t border-dashed border-white/10 pr-10">
            <span className="ml-2 text-[10px] font-semibold text-cyan-400/80 z-10">
              Cyan #11
            </span>
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-10 opacity-90"
              style={{ left: `clamp(34px, ${cyanProgress}%, calc(100% - 46px))` }}
            >
              <TrackCarSvg
                bodyColor="#06B6D4"
                stripeColor="#E2E8F0"
                numberLabel="11"
                className="h-6 w-12"
              />
            </div>
          </div>
        </div>

        <div className="racing-curbs h-1.5 w-full opacity-90" aria-hidden="true" />
      </div>

      {/* Cartão da pergunta */}
      <div className="rounded-3xl border border-white/10 bg-[#11111a] p-5 shadow-2xl shadow-black/60 sm:p-8">
        <h2 className="font-display text-xl font-bold leading-snug text-white [text-wrap:balance] sm:text-2xl">
          {question.question}
        </h2>

        {question.codeSnippet && (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#08080c] p-4 font-mono text-xs leading-relaxed text-amber-200 sm:text-sm">
            <code>{question.codeSnippet}</code>
          </pre>
        )}

        {/* Lista de 4 alternativas */}
        <div className="mt-6 grid grid-cols-1 gap-3" role="radiogroup" aria-label="Alternativas">
          {question.options.map((optionText, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === question.correctIndex;

            let buttonStyle =
              'border-white/10 bg-[#171724] text-zinc-100 hover:border-amber-400/70 hover:bg-[#1e1e2f]';
            let badgeStyle = 'bg-zinc-800 text-amber-400 border border-white/10';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'border-emerald-500/80 bg-emerald-950/50 text-emerald-50';
                badgeStyle = 'bg-emerald-500 text-zinc-950';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'border-rose-500/80 bg-rose-950/50 text-rose-50';
                badgeStyle = 'bg-rose-500 text-white';
              } else {
                buttonStyle = 'border-white/5 bg-[#12121b] text-zinc-500 opacity-60';
                badgeStyle = 'bg-zinc-900 text-zinc-600';
              }
            }

            return (
              <button
                key={OPTION_LETTERS[index]}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(index)}
                className={`group flex min-h-[56px] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111a] ${
                  !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                } ${buttonStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold transition-colors ${badgeStyle}`}
                  >
                    {OPTION_LETTERS[index]}
                  </span>
                  <span className="text-sm font-medium leading-snug sm:text-base">
                    {optionText}
                  </span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-label="Alternativa correta"
                  />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle
                    className="h-5 w-5 shrink-0 text-rose-400"
                    aria-label="Alternativa incorreta"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback com McQueen (acerto) ou Equipe dos Boxes (erro) */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className={`mt-6 rounded-2xl border p-4 sm:p-5 ${
              isCorrect
                ? 'border-emerald-500/40 bg-emerald-950/35 text-emerald-50'
                : 'border-rose-500/40 bg-rose-950/35 text-rose-50'
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {isCorrect ? (
                <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-400/30 bg-zinc-950/80 p-1">
                  <McQueenHeroArt className="h-full w-full" />
                </div>
              ) : (
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-zinc-900">
                  <RacerImage
                    src={activeCompanion.image}
                    alt={`${activeCompanion.name} dando uma dica nos boxes`}
                    fallbackLabel={activeCompanion.name}
                    className="h-full w-full"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" aria-hidden="true" />
                  )}
                  <p className="text-sm font-bold sm:text-base">{coachHeadline}</p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-200/90">
                  {question.explanation}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-md shadow-red-600/25 transition-all duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111a] sm:w-auto whitespace-nowrap shrink-0"
              >
                <span>{isLastQuestion ? 'Cruzar Linha de Chegada' : 'Próxima Volta'}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
