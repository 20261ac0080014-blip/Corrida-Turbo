import { useState } from 'react';
import { Flame, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CountdownOverlay } from './components/CountdownOverlay';
import { QuizScreen } from './components/QuizScreen';
import { AnswerRecord, ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import { POINTS_PER_QUESTION, QUIZ_QUESTIONS } from './data/questions';
import { playCorrectSound, playFinishSound, playStartSound, playWrongSound } from './utils/sound';

type GameState = 'START' | 'COUNTDOWN' | 'PLAYING' | 'RESULT';

const BEST_SCORE_STORAGE_KEY = 'desafio_programacao_best_score';
const PLAYER_NAME_STORAGE_KEY = 'desafio_programacao_player_name';

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors
  }
}

function readBestScore(): number | null {
  const raw = readStorage(BEST_SCORE_STORAGE_KEY);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [playerName, setPlayerName] = useState<string>(() => readStorage(PLAYER_NAME_STORAGE_KEY) ?? '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bestScore, setBestScore] = useState<number | null>(() => readBestScore());

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const resolvedPlayerName = playerName.trim() || 'Piloto #95';
  const correctCount = answers.filter((a) => a.isCorrect).length;

  function handlePlayerNameChange(name: string) {
    setPlayerName(name);
    writeStorage(PLAYER_NAME_STORAGE_KEY, name);
  }

  function startNewGame() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setAnswers([]);
    setGameState('COUNTDOWN');
    playStartSound(soundEnabled);
  }

  function handleSelectOption(optionIndex: number) {
    if (selectedOption !== null) return;

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setSelectedOption(optionIndex);

    if (isCorrect) {
      setScore((prev) => prev + POINTS_PER_QUESTION);
      setStreak((prev) => prev + 1);
      playCorrectSound(soundEnabled);
    } else {
      setStreak(0);
      playWrongSound(soundEnabled);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: optionIndex,
        isCorrect,
      },
    ]);
  }

  function handleNextQuestion() {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const updatedBest = bestScore === null ? score : Math.max(bestScore, score);
      setBestScore(updatedBest);
      writeStorage(BEST_SCORE_STORAGE_KEY, String(updatedBest));
      playFinishSound(soundEnabled);
      setGameState('RESULT');
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#07070b] text-white">
      {/* Iluminação de estádio noturno */}
      <div
        aria-hidden="true"
        className="no-print pointer-events-none fixed inset-x-0 top-0 -z-0 h-[420px] bg-gradient-to-b from-red-950/25 via-zinc-950/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="no-print pointer-events-none fixed -top-32 -right-24 -z-0 h-80 w-80 rounded-full bg-red-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="no-print pointer-events-none fixed -bottom-32 -left-24 -z-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
      />

      {/* Cabeçalho preto carbono */}
      <header className="no-print relative z-10 border-b border-white/10 bg-[#0b0b12]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => setGameState('START')}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] whitespace-nowrap shrink-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30">
              <Flame className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-extrabold tracking-tight text-white sm:text-lg">
              Desafio da Programação
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros'}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] whitespace-nowrap shrink-0"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-amber-400" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{soundEnabled ? 'Som ligado' : 'Som desligado'}</span>
            </button>

            {(gameState === 'PLAYING' || gameState === 'COUNTDOWN') && (
              <button
                type="button"
                onClick={startNewGame}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Área principal */}
      <main className="relative z-10 flex flex-1 items-center px-4 py-6 sm:px-6 sm:py-10">
        {gameState === 'START' && (
          <StartScreen
            playerName={playerName}
            onPlayerNameChange={handlePlayerNameChange}
            bestScore={bestScore}
            onStart={startNewGame}
          />
        )}

        {gameState === 'COUNTDOWN' && (
          <CountdownOverlay
            playerName={resolvedPlayerName}
            onComplete={() => setGameState('PLAYING')}
          />
        )}

        {gameState === 'PLAYING' && (
          <QuizScreen
            playerName={resolvedPlayerName}
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            score={score}
            correctCount={correctCount}
            streak={streak}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
          />
        )}

        {gameState === 'RESULT' && (
          <ResultScreen
            playerName={resolvedPlayerName}
            questions={QUIZ_QUESTIONS}
            answers={answers}
            score={score}
            bestScore={bestScore ?? score}
            onPlayAgain={startNewGame}
          />
        )}
      </main>
    </div>
  );
}
