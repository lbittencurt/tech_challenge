import axios from 'axios'
import faker from 'faker'

import { HttpRequest } from '@/data/protocols/http/http-client'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockHttpRequest()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.request(mockHttpRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
