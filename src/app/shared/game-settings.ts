export interface GameSettings {
  seed: string;
  keepWrongGuesses: boolean,
  handleRemasters: 'remove' | 'fix' | 'keep',
};
