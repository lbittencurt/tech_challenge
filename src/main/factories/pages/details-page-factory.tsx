import React from 'react'
import DetailsPage from '../../../pages/details'
import { makeRemoteLoadSongs } from '../usecases/remote-load-songs-factory'

export const makeDetailsPage: React.FC = () => {
  return (
    <DetailsPage loadSongs={makeRemoteLoadSongs()} />
  )
}
