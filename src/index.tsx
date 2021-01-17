import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Main from './main/main'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
