export interface GameSettings {
  seed: string;
  keepWrongGuesses: boolean,
  handleTimes: 'remove-tags' | 'fix-tags' | 'fix-all' | 'keep-all',
};
