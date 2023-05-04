import { createContext } from "react";

type GameStateCtxType = {
  changeGameState: string;
  setChangeGameState: (changeGameState: string) => void;
};

type QuestionCtxType = {
  category: string;
  setCategory: (category: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  region: string;
  setRegion: (region: string) => void;
};
type ScoreCtxType = {
  score: number;
  setScore: (score: number) => void;
  round: number;
  setRound: (round: number) => void;
  correctAnswers: number;
  setCorrectAnswers: (correctAnswers: number) => void;
  consecutiveCorrectAnswers: number;
  setConsecutiveCorrectAnswers: (consecutiveCorrectAnswers: number) => void;
  consecutiveBonus: number;
  setConsecutiveBonus: (consecutiveBonus: number) => void;
  totalRemainingTime: number;
  setTotalRemainingTime: (totalRemainingTime: number) => void;
  difficultyMultiplier: number;
  setDifficultyMultiplier: (difficultyMultiplier: number) => void;
  playerName: string;
  setPlayerName: (playerName: string) => void;
};
export const GameStateCtx = createContext(null as unknown as GameStateCtxType);

export const QuestionCtx = createContext(null as unknown as QuestionCtxType);

export const ScoreCtx = createContext(null as unknown as ScoreCtxType);
