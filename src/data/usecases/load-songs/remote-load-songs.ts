import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { AccessDeniedError } from '@/domain/errors/access-denied-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { LoadSongs } from '@/domain/usecases/loadSongs'

export class RemoteLoadSongs implements LoadSongs {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<any>
  ) {}

  async loadAll (): Promise<LoadSongs.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    console.log(httpResponse)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body.songs
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
