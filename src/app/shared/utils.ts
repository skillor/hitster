export function isMobile(): boolean {
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

export function getMarket(): string {
  return Intl.DateTimeFormat().resolvedOptions().locale.split('-').at(-1)!.toUpperCase();
}
