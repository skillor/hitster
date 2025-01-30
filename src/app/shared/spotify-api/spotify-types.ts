// items(track(is_playable,id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total,limit,offset

export interface SpotifyTrack {
  album: {
    album_type: string,
    name: string,
    release_date: string,
    release_date_precision: SpotifyReleaseDatePrecision,
    images: [{
      height: number,
      width: number,
      url: string,
    }],
    // total_tracks: number,
  },
  fixed_release_time?: boolean,
  is_playable: boolean,
  id: string,
  uri: string
  name: string,
  duration_ms: string,
  artists: [
    {
      name: string,
    },
  ],
};

export type SpotifyReleaseDatePrecision = "year" | "month" | "day";

export function betterSpotifyReleaseDatePrecision(t1: SpotifyReleaseDatePrecision, t2: SpotifyReleaseDatePrecision) {
  return ['day', 'month', 'year'].indexOf(t1) < ['day', 'month', 'year'].indexOf(t2);
}

export interface SpotifyPagination {
  offset: number,
  limit: number,
  total: number,
}

export interface SpotifyTracks extends SpotifyPagination {
  items: SpotifyTrack[],
}

export interface SpotifyPlaylistItem {
  track: SpotifyTrack,
}

export interface SpotifyPlaylist extends SpotifyPagination {
  items: SpotifyPlaylistItem[],
};

export interface SpotifyPlaylistWithLink extends SpotifyPlaylist {
  link: string,
}
