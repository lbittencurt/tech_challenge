import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { LoadSongs, SongModel } from '@/domain/usecases/loadSongs'
import { Container, TableWraper } from './styles'

type Props = {
  loadSongs: LoadSongs
}

const Details: React.FC<Props> = ({ loadSongs }: Props) => {
  const [state, setState] = useState({
    isLoading: true,
    songs: [] as SongModel[],
    errorMessage: ''
  })

  useEffect(() => {
    loadSongs.loadAll()
      .then(response => {
        setState({
          ...state,
          isLoading: false,
          songs: response
        })
      })
      .catch(() => {
        setState({
          isLoading: false,
          songs: [],
          errorMessage: 'Failed to load songs'
        })
      })
  }, [])

  return (
    <Container data-testid="container">
      <h2 data-testid="title">Songs details</h2>
      <Link data-testid="home-link" to="/">return</Link>
      { state.isLoading && <span className="loading">Loading...</span>}
      {
        (!state.isLoading && state.songs.length > 0) &&
        <TableWraper>
          <table>
            <thead>
              <tr>
                {
                  Object.keys(state.songs[0]).map(key => <th key={key}>{key}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                state.songs.map((song: SongModel) => {
                  return <tr key={song.song + song.artist}>
                    {Object.keys(song).map((key: string) => <td key={key}>{song[key]}</td>)}
                  </tr>
                })
              }
            </tbody>
          </table>
        </TableWraper>
      }
      { state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
    </Container>
  )
}

export default Details
