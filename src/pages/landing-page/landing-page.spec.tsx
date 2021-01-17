import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import theme from '../../styles/theme'

import LandingPage from '.'
import { ThemeProvider } from 'styled-components'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('Landing Page', () => {
  afterEach(cleanup)

  test('should start with loading state and load songs', () => {
    const sut = render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <LandingPage />
        </ThemeProvider>
      </Router>
    )

    const titleElement = sut.getByTestId('title')
    expect(titleElement).toBeTruthy()

    const linkElement = sut.getByTestId('link')
    expect(linkElement).toBeTruthy()
  })

  test('should go to details page', () => {
    const sut = render(
      <Router history={history}>
        <LandingPage />
      </Router>
    )

    const linkElement = sut.getByTestId('link')
    fireEvent.click(linkElement)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/details')
  })
})
