export function shuffle<T>(array: T[]): T[] {
  const from = [...array];
  const to: T[] = [];
  while (from.length) {
    const element = from.splice(Math.floor(Math.random() * from.length), 1);
    to.push(...element);
  }
  return to;
}
export function answerShuffle<T>(array1: T[], string: T): T[] {
  const from = [...array1, string];
  const to: T[] = [];
  while (from.length) {
    const element = from.splice(Math.floor(Math.random() * from.length), 1);
    to.push(...element);
  }
  return to;
}

export function calculateScore(
  totalRemainingTime: number,
  difficultyMultiplier: number,
  increaseDifficultyMultiplier: number,
  correctAnswers: number,
  consecutiveBonus: number
) {
  return (
    Math.floor(
      totalRemainingTime *
        (difficultyMultiplier + increaseDifficultyMultiplier) +
        correctAnswers
    ) * consecutiveBonus
  );
}
