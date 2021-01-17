import React from 'react'
import { render, screen } from '@testing-library/react'
import Main from './main'

test('renders learn react link', () => {
  render(<Main />)
  const linkElement = screen.getByText(/code challenge/i)
  expect(linkElement).toBeInTheDocument()
})
