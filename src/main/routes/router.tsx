import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from '@/pages/landing-page'

type Props = {
  makeDetails: React.FC
}

const Router: React.FC<Props> = ({ makeDetails }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path= "/" exact component={ LandingPage } />
        <Route path= "/details" exact component={ makeDetails } />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
