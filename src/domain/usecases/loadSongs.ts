export interface LoadSongs {
  loadAll: () => Promise<SongModel[]>
}

interface IObjectKeys {
  [key: string]: string | number
}

export interface SongModel extends IObjectKeys {
  song: string
  artist: string
  songReleaseDate: string
  playCount: number
  metricA: number
  metricB: number
  metricC: number
  metricD: number
  metricE: number
  metricF: number
  metricG: number
  metricH: number
  metricI: number
  metricJ: number
  metricK: number
  metricL: number
  metricM: number
  metricN: number
  metricO: number
  metricP: number
}
