import React from 'react'
import { Link } from 'react-router-dom'

import { Title, Container } from './styles'

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Title data-testid="title">Songs Informations</Title>
      <Link data-testid="link" to="/details">Song details</Link>
    </Container>
  )
}

export default LandingPage
