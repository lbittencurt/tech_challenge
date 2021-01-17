import { AxiosHttpClient } from '../../../infra/http-adapter/axios-http-client'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
