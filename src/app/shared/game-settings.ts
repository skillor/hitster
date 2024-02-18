export interface GameSettings {
  seed: string;
  keepWrongGuesses: boolean,
  limit: number,
  handleTimes: 'remove-tags' | 'fix-tags' | 'fix-all' | 'keep-all',
};
