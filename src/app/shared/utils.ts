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
