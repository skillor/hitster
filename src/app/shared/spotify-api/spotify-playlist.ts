// items(track(is_playable,id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total,limit,offset

export interface SpotifyTrack {
  album: {
    album_type: string,
    name: string,
    release_date: string,
    release_date_precision: string,
    images: [{
      height: number,
      width: number,
      url: string,
    }],
    // total_tracks: number,
  },
  fixed_remaster?: boolean,
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
