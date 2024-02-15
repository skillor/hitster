// items(track(is_playable,id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total,limit,offset

export interface SpotifyTrack {
  track: {
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
  },
};

export interface SpotifyPlaylist {
  items: SpotifyTrack[],
  offset: number,
  limit: number,
  total: number,
};
