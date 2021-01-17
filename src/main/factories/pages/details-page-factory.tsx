import React from 'react'
import DetailsPage from '@/pages/details'
import { makeRemoteLoadSongs } from '@/main/factories/usecases/remote-load-songs-factory'

export const makeDetailsPage: React.FC = () => {
  return (
    <DetailsPage loadSongs={makeRemoteLoadSongs()} />
  )
}
