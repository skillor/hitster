function stringEditDistance(s1: string, s2: string): number {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs: number[] = [];
  for (var i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
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

export function isEmulationDesktop(): boolean {
  return window.innerWidth > screen.availWidth;
}

export function isScreenPortrait(): boolean {
  return screen.orientation.type.includes('portrait');
}

export function isMobile(): boolean {
  return hasMobileUserAgent() || (isEmulationDesktop() && isScreenPortrait());
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
