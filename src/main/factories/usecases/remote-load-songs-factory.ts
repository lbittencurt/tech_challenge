import { RemoteLoadSongs } from '../../../data/usecases/load-songs/remote-load-songs'
import { LoadSongs } from '@/domain/usecases/loadSongs'
import { makeApiUrl } from '../http/api-url-factory'
import { makeAxiosHttpClient } from '../http/axios-http-client-factory'

export const makeRemoteLoadSongs = (): LoadSongs => new RemoteLoadSongs(makeApiUrl('/songs'), makeAxiosHttpClient())
