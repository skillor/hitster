import Rand from "rand-seed";

function stringEditDistance(s1: string, s2: string): number {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export function stringSimilarity(s1: string, s2: string): number {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - stringEditDistance(longer, shorter)) / longerLength;
}

export function stringSimilarityCropStart(s1: string, s2: string): number {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  longer = longer.substring(0, shorter.length);
  return stringSimilarity(longer, shorter);
}

export function randomNumber(rng: Rand | undefined = undefined): number {
  return rng ? rng.next() : Math.random();
}

export function randomInRange(min: number, max: number, rng: Rand | undefined = undefined): number {
  return randomNumber(rng) * (max - min) + min;
}

export type MedianMode = 'low' | 'high' | 'avg';

export type NumberExtractMode = MedianMode | 'first';

export function numberExtract(values: number[], mode: NumberExtractMode = 'avg'): number {
  if (mode == 'first') return values[0];
  return median(values, mode);
}

export function median(values: number[], mode: MedianMode = 'avg'): number {
  if (values.length === 0) {
    throw new Error('Input array is empty');
  }

  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2 || mode == 'high') return values[half];

  if (mode == 'low') return values[half - 1];

  return (values[half - 1] + values[half]) / 2;
}

export function extractTextContent(s: string | null | undefined, removeQuery = ''): string {
  if (!s) return '';
  const span = document.implementation.createHTMLDocument('virtual').createElement('span');
  span.innerHTML = s;
  if (removeQuery) span.querySelectorAll(removeQuery).forEach(v => v.remove());
  return span.textContent || span.innerText;
}

export function escapeString(s: string): string {
  return JSON.stringify(s).replace(/((^")|("$))/g, "").trim();
}

export function generateSeed(length: number | undefined = undefined, rng: Rand | undefined = undefined, pool = '01234567890abcdefghijklmnopqrstuvwxyz'): string {
  if (length === undefined) length = 16;
  return [...new Array(length)].map((v) => pool[Math.floor(randomNumber(rng) * pool.length)]).join('');
}

export function isEmulationDesktop(): boolean {
  return window.innerWidth > screen.availWidth;
}

export function isScreenPortrait(): boolean {
  return screen.orientation.type.includes('portrait');
}

export function isMobile(): boolean {
  return hasMobileUserAgent() || isEmulationDesktop();
}

export function hasMobileUserAgent(): boolean {
  return [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ].some((item) => navigator.userAgent.match(item));
}

export function hasBeenActive(): boolean {
  return navigator && navigator.userActivation && navigator.userActivation.hasBeenActive;
}

export function getMarket(): string {
  return Intl.DateTimeFormat().resolvedOptions().locale.split('-').at(-1)!.toUpperCase();
}

export function getLanguage(): string {
  return Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0].toLowerCase();
}
