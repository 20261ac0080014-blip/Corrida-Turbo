import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Printer,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { POINTS_PER_QUESTION, QuizQuestion, TopicCategory } from '../data/questions';
import { McQueenStickerBadge } from './McQueenArt';

export interface AnswerRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

interface ResultScreenProps {
  playerName: string;
  questions: QuizQuestion[];
  answers: AnswerRecord[];
  score: number;
  bestScore: number;
  onPlayAgain: () => void;
}

const CATEGORIES: TopicCategory[] = ['Lógica', 'HTML', 'CSS', 'JavaScript'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function getPerformanceRank(correctCount: number, total: number) {
  const ratio = correctCount / total;
  if (ratio === 1) {
    return {
      rank: 'Campeão Absoluto da Copa Pistão',
      message: 'Largada perfeita e 100% de precisão! Você gabaritou todas as curvas do código.',
    };
  }
  if (ratio >= 0.7) {
    return {
      rank: 'Piloto Profissional de Elite',
      message: 'Velocidade impressionante em Lógica, HTML, CSS e JavaScript!',
    };
  }
  if (ratio >= 0.5) {
    return {
      rank: 'Piloto Veloz da Pista',
      message: 'Você cruzou a linha de chegada com uma ótima base. Continue acelerando!',
    };
  }
  return {
    rank: 'Piloto Revelação em Treinamento',
    message: 'Todo grande piloto treina nos boxes! Revise as dicas abaixo e corra outra volta.',
  };
}

export function ResultScreen({
  playerName,
  questions,
  answers,
  score,
  bestScore,
  onPlayAgain,
}: ResultScreenProps) {
  const [showReview, setShowReview] = useState(false);
  const [stickerPopped, setStickerPopped] = useState(false);

  const totalQuestions = questions.length;
  const maxScore = totalQuestions * POINTS_PER_QUESTION;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);
  const rankInfo = getPerformanceRank(correctCount, totalQuestions);
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-5xl space-y-6"
    >
      {/* Certificado Oficial + Figurinha Colecionável do McQueen */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Certificado */}
        <div className="print-certificate relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-[#14121d] via-[#101018] to-[#1a1118] p-6 shadow-2xl shadow-black/70 sm:p-9 lg:col-span-8">
          {/* Faixas quadriculadas superior e inferior do certificado */}
          <div className="racing-curbs absolute inset-x-0 top-0 h-2 opacity-90" aria-hidden="true" />
          <div className="racing-curbs absolute inset-x-0 bottom-0 h-2 opacity-90" aria-hidden="true" />

          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400">
                <Award className="h-5 w-5" aria-hidden="true" />
                <span>CERTIFICADO DE CONQUISTA</span>
              </div>
              <span className="text-xs font-medium text-zinc-400">{todayFormatted}</span>
            </div>

            <h1 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Parabéns,{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-400 bg-clip-text text-transparent">
                {playerName}
              </span>
              !
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Certificamos que <strong className="text-white">{playerName}</strong> concluiu com
              sucesso as {totalQuestions} voltas do{' '}
              <strong className="text-amber-300">Desafio da Programação</strong>, superando os
              desafios de Lógica de Programação, HTML, CSS e JavaScript com o título de{' '}
              <strong className="text-white">{rankInfo.rank}</strong>.
            </p>

            <p className="mt-2 text-xs text-zinc-400 sm:text-sm">{rankInfo.message}</p>

            {/* Métricas do Certificado */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
              <div>
                <p className="text-xs text-zinc-400">Pontuação Final</p>
                <p className="font-display mt-0.5 text-2xl font-extrabold text-amber-400 tabular-nums sm:text-3xl">
                  {score}
                </p>
                <p className="text-[11px] text-zinc-400 tabular-nums">de {maxScore} pontos</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Acertos</p>
                <p className="font-display mt-0.5 text-2xl font-extrabold text-white tabular-nums sm:text-3xl">
                  {correctCount}/{totalQuestions}
                </p>
                <p className="text-[11px] text-zinc-400 tabular-nums">{accuracyPercent}% de precisão</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Recorde</p>
                <p className="font-display mt-0.5 text-2xl font-extrabold text-rose-400 tabular-nums sm:text-3xl">
                  {bestScore}
                </p>
                <p className="text-[11px] text-zinc-400">melhor marca</p>
              </div>
            </div>
          </div>

          {/* Rodapé de assinaturas + ações */}
          <div className="mt-7 border-t border-white/10 pt-5 pb-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-sm font-bold italic text-amber-300">
                  Relâmpago McQueen #95
                </p>
                <p className="text-[11px] text-zinc-400">
                  Piloto Principal · Grande Prêmio do Código
                </p>
              </div>

              <div className="no-print flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 transition-colors hover:bg-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap shrink-0"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  <span>Imprimir Certificado</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Figurinha Legal do McQueen */}
        <div className="no-print flex flex-col items-center justify-between rounded-3xl border border-white/10 bg-[#11111a] p-6 text-center shadow-2xl shadow-black/70 lg:col-span-4">
          <div className="w-full">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Figurinha Desbloqueada!</span>
            </div>
            <h2 className="font-display mt-1 text-xl font-extrabold text-white">
              Adesivo Katchau #95
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Toque na figurinha para dar um brilho especial!
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStickerPopped((prev) => !prev)}
            className={`my-4 cursor-pointer rounded-full p-1 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              stickerPopped
                ? 'scale-105 rotate-3 drop-shadow-[0_0_24px_rgba(250,204,21,0.5)]'
                : '-rotate-3 hover:rotate-0 hover:scale-105'
            }`}
            aria-label="Figurinha colecionável do Relâmpago McQueen número 95"
          >
            <McQueenStickerBadge className="h-48 w-48 sm:h-52 sm:w-52" />
          </button>

          <div className="flex w-full flex-col gap-2.5">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-red-600/25 transition-all duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Jogar Novamente</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReview((prev) => !prev)}
              className="inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap shrink-0"
            >
              <span>{showReview ? 'Ocultar Revisão' : 'Revisar Respostas'}</span>
              {showReview ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desempenho por trecho */}
      <div className="no-print rounded-3xl border border-white/10 bg-[#11111a] p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" aria-hidden="true" />
          <h2 className="font-display text-base font-bold text-white">
            Desempenho por trecho da pista
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const categoryQuestions = questions.filter((q) => q.category === category);
            const categoryCorrect = categoryQuestions.filter((q) => {
              const record = answers.find((a) => a.questionId === q.id);
              return record?.isCorrect;
            }).length;
            const pct =
              categoryQuestions.length > 0
                ? Math.round((categoryCorrect / categoryQuestions.length) * 100)
                : 0;

            return (
              <div
                key={category}
                className="rounded-2xl border border-white/10 bg-[#181826] p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-white">{category}</span>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {categoryCorrect}/{categoryQuestions.length}
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-pink-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revisão detalhada */}
      {showReview && (
        <div className="no-print space-y-4">
          {questions.map((q, index) => {
            const record = answers.find((a) => a.questionId === q.id);
            const isCorrect = record?.isCorrect ?? false;
            const userOption = record?.selectedIndex ?? -1;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-white/10 bg-[#11111a] p-5 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs font-semibold text-zinc-400">
                    <span className="text-white">Volta {String(index + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true" className="mx-1.5 text-zinc-600">
                      ·
                    </span>
                    <span className="text-amber-400">{q.category}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>Correta</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Incorreta</span>
                      </>
                    )}
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-white sm:text-base">
                  {q.question}
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  {!isCorrect && userOption >= 0 && (
                    <p className="text-rose-400">
                      Sua resposta:{' '}
                      <span className="font-semibold">
                        {OPTION_LETTERS[userOption]}) {q.options[userOption]}
                      </span>
                    </p>
                  )}
                  <p className="text-emerald-400">
                    Resposta correta:{' '}
                    <span className="font-semibold">
                      {OPTION_LETTERS[q.correctIndex]}) {q.options[q.correctIndex]}
                    </span>
                  </p>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
