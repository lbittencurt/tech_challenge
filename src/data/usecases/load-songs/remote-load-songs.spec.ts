import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-client'
import { AccessDeniedError } from '@/domain/errors/access-denied-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { SongModel } from '@/domain/usecases/loadSongs'
import faker from 'faker'
import { RemoteLoadSongs } from './remote-load-songs'

class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}

type SutTypes = {
  sut: RemoteLoadSongs
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadSongs(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

type MockLoadSongsResponse = {
  songs: SongModel[]
}

const fakeSong = {
  song: faker.random.word(),
  artist: faker.random.word(),
  songReleaseDate: faker.random.word(),
  playCount: faker.random.number(),
  metricA: faker.random.number(),
  metricB: faker.random.number(),
  metricC: faker.random.number(),
  metricD: faker.random.number(),
  metricE: faker.random.number(),
  metricF: faker.random.number(),
  metricG: faker.random.number(),
  metricH: faker.random.number(),
  metricI: faker.random.number(),
  metricJ: faker.random.number(),
  metricK: faker.random.number(),
  metricL: faker.random.number(),
  metricM: faker.random.number(),
  metricN: faker.random.number(),
  metricO: faker.random.number(),
  metricP: faker.random.number()
}
const mockRemoteLoadSongsModel = (): MockLoadSongsResponse => {
  return {
    songs: [fakeSong]
  }
}

describe('Load Songs', () => {
  test('should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: { songs: [] }
    }

    await sut.loadAll()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a Songs on 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteLoadSongsModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.loadAll()

    expect(httpResponse).toEqual([fakeSong])
  })
})
