import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'
import { AccessDeniedError } from '../../../domain/errors/access-denied-error'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { LoadSongs, SongModel } from '../../../domain/usecases/loadSongs'

export class RemoteLoadSongs implements LoadSongs {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<any>
  ) {}

  async loadAll (): Promise<SongModel[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body.body.songs
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
