import React from 'react'
import { makeDetailsPage } from './factories/pages/details-page-factory'
import Router from './routes/router'

const Main: React.FC = () => {
  return (
    <Router makeDetails={ makeDetailsPage } />
  )
}

export default Main
