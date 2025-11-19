import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { horrorFlicksData } from "../../horrorFlickData"
import Error from "./Error"
import Holding from "./HoldingMessage"

import { FaAnglesLeft } from "react-icons/fa6"
import stabHook from "../../Hooks/stabHook"
import imdbLogo from "../img/IMDb_Logo.png"

// Individual flick component

export default function Flick() {

//Secured API key  
const apiKey = import.meta.env.VITE_OMDB_API_KEY 

// Retreive flickData from local storage with redundancy for if there is no data
const localFlickData = JSON.parse(localStorage.getItem('flickData') || [])

// Get individual id from params
const { id } = useParams()

// Isolate selected flick
const flick = localFlickData[id]

// Error handling for invalid id
if (!flick) {
  return (
    <Error 
      message="There's no flick here!"
      link="/"
    />
  )
}

// Destructuring flick properties as used so frequently
const { title, rating, subHeader, reviewText, imdbLink, imdbId } = flick

// Initialising imdbData as null - thisis replaced by fetch
const [imdbData, setImdbData] = useState(null)

// Fetch imdbData searched for by user
  useEffect(() => {
    const interval = setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
        .then(res => res.json())
        .then(data => setImdbData(data))
    }, 3000)
    // Cleanup function to prevent memory leaks
    return () => clearTimeout(interval)
  }, [imdbId])

  return (
    <>
    {/* Loading component to be displayed while fetching */}
      {!imdbData ? (
        <Holding />
      ) : (
        // Flick data populated by user
        <div className="flick">
          <h2 className="flick-title">{title}</h2>
          <p className="flick-mikey-rating">{stabHook(true, rating)}</p>
          <h3 className="flick-mikey-sub-title reveal">{subHeader}</h3>
          <p className="flick-mikey-review-text">
            <span className="mini-review-title">Mikey's mini-review:</span>
            <br /> {reviewText}
          </p>
          {/* Flick data populated by fetched data */}
          <p className="flick-imdb-actors">
            Actors: {imdbData.Actors}
          </p>
          <p className="flick-imdb-director">
            Director: {imdbData.Director}
          </p>
          <p className="flick-imdb-released">
            Released: {imdbData.Released}
          </p>
          {imdbData.Poster && (
            <img
              className="flick-imdb-poster"
              src={imdbData.Poster}
              alt={imdbData.Title || "Imdb Poster"}
            />
          )}
          {/* Return to search page */}
          <Link className="back-to-search" to="/">
            <div className="back-button-flex-container">
              <FaAnglesLeft className="link-arrows" />
              <p className="back-text">back</p>
            </div>
          </Link>
          {/* Link to external imdb site */}
          <Link to={`https://www.imdb.com/title/${imdbId}`} target="_blank" className="imdb-link">
            <div className="imdb-rating-flex-container">
              <img className="imdb-logo" src={imdbLogo} alt="Imdb -logo" />
              <p className="imdb-rating">
                <span className="imdb-score">{imdbData.imdbRating}</span>/10
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}