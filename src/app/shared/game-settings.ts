export type HandleTimesType =
'remove-tags' | 'fix-tags' | 'fix-all-spotify' | 'fix-all-wiki' | 'fix-all' | 'keep-all'
;

export interface GameSettings {
  seed: string;
  keepWrongGuesses: boolean,
  limit: number,
  handleTimes: HandleTimesType,
};
