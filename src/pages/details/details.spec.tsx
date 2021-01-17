import React from 'react'
import { render, waitFor, screen, cleanup, RenderResult } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Details from '.'
import { LoadSongs } from '@/domain/usecases/loadSongs'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

const history = createMemoryHistory({ initialEntries: ['/details'] })

class LoadSongsSpy implements LoadSongs {
  async loadAll (): Promise<any> {
    return [
      {
        song: 'xmbrexa x',
        artist: 'RIHANNA',
        songReleaseDate: '01/03/2013',
        playCount: 8165,
        metricA: 81,
        metricB: 67,
        metricC: 66,
        metricD: 55,
        metricE: 92,
        metricF: 44,
        metricG: 58,
        metricH: 53,
        metricI: 65,
        metricJ: 77,
        metricK: 36,
        metricL: 59,
        metricM: 20,
        metricN: 42,
        metricO: 1,
        metricP: 58
      }
    ]
  }
}

type SutType = {
  sut: RenderResult
  loadSongsSpy: LoadSongsSpy
}

const makeSut = (loadSongsSpy: LoadSongsSpy = new LoadSongsSpy()): SutType => {
  const sut = render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Details loadSongs={ loadSongsSpy } />
      </ThemeProvider>
    </Router>
  )
  return {
    sut,
    loadSongsSpy
  }
}

describe('Details Page', () => {
  afterEach(cleanup)

  test('should start with initial state ', async () => {
    const { sut } = makeSut()
    const container = screen.getByTestId('container')
    const titleElement = sut.getByTestId('title')
    const homelinkElement = sut.getByTestId('home-link')

    expect(titleElement).toBeTruthy()
    expect(homelinkElement).toBeTruthy()
    expect(container.querySelector('.loading')).toBeTruthy()

    await waitFor(() => screen.getByTestId('container'))
  })

  test('should load table when loaded songs', async () => {
    makeSut()
    const container = screen.getByTestId('container')

    await waitFor(() => container)
    expect(container.querySelector('table')).toBeTruthy()
    expect(container.querySelector('.loading')).toBeFalsy()
    // expect(container.querySelector('tbody').querySelectorAll('tr')).toHaveLength(1)
    expect(container.querySelectorAll('th')).toHaveLength(20)
    expect(container.querySelectorAll('td')).toHaveLength(20)
  })

  test('should load empty table when failed to load songs', async () => {
    const loadSongsSpy = new LoadSongsSpy()
    jest.spyOn(loadSongsSpy, 'loadAll').mockRejectedValueOnce(new Error())

    makeSut(loadSongsSpy)
    const container = screen.getByTestId('container')

    await waitFor(() => container)
    expect(container.querySelector('table')).toBeFalsy()
    expect(container.querySelector('.loading')).toBeFalsy()
    expect(container.querySelector('.error-message')).toBeTruthy()
  })
})
