export interface PlaylistLink {
  type: 'spotify-playlist' | 'json',
  payload: string,
  raw: string,
}

export function validatePlaylistLink(raw: string | null): PlaylistLink | null {
  if (!raw) return null;
  let t = raw;
  let i = t.indexOf('spotify.com/playlist/');
  if (i >= 0) {
    t = t.substring(i + 21);
    i = t.indexOf('?');
    if (i >= 0) t = t.substring(0, t.indexOf('?'))
    return { type: 'spotify-playlist', payload: t, raw: raw };
  }

  if (t.endsWith('.json')) {
    return { type: 'json', payload: t, raw: raw };
  }

  return null;
}
