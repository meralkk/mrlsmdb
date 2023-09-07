import React from 'react'
import AllMovies from '../components/all-movies/all-movies'
import Menubar from '../components/header/menubar/menubar'

const MoviesPage = () => {
  return (
    <div>
            <Menubar />

        <AllMovies/>
    </div>
  )
}

export default MoviesPage