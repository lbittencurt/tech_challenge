import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main/main'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/global'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Main />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
