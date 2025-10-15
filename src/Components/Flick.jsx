import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { horrorFlicksData } from "../../horrorFlickData";
import Error from "./Error";
import Holding from "./HoldingMessage";

import { FaAnglesLeft } from "react-icons/fa6";
import stabHook from "../../Hooks/stabHook";
import imdbLogo from "../img/IMDb_Logo.png";

export default function Flick() {

const localFlickData = JSON.parse(localStorage.getItem('flickData') || [])
const { id } = useParams();

const flick = localFlickData[id]

if (!flick) {
  return (
    <Error 
      message="There's no flick here!"
      link="/"
    />
  );
}

const { title, rating, subHeader, reviewText, imdbLink, imdbId } = flick

const [imdbData, setImdbData] = useState(null);

  useEffect(() => {
    const interval = setTimeout(() => {
      fetch(`http://www.omdbapi.com/?apikey=b60f271c&i=${imdbId}`)
        .then(res => res.json())
        .then(data => setImdbData(data));
    }, 3000);
    return () => clearTimeout(interval);
  }, [imdbId]);

  return (
    <>
      {!imdbData ? (
        <Holding />
      ) : (
        <div className="flick">
          <h2 className="flick-title">{title}</h2>
          <p className="flick-mikey-rating">{stabHook(true, rating)}</p>
          <h3 className="flick-mikey-sub-title">{subHeader}</h3>
          <p className="flick-mikey-review-text">
            <span className="mini-review-title">Mikey's mini-review:</span>
            <br /> {reviewText}
          </p>
          <p className="flick-imdb-actors">
            Actors: {imdbData.Actors ? imdbData.Actors : "No response from IMDb"}
          </p>
          <p className="flick-imdb-director">
            Director: {imdbData.Director ? imdbData.Director : "No response from IMDb"}
          </p>
          <p className="flick-imdb-released">
            Released: {imdbData.Released ? imdbData.Released : "No response from IMDb"}
          </p>
          {imdbData.Poster && (
            <img
              className="flick-imdb-poster"
              src={imdbData.Poster}
              alt={imdbData.Title || "Imdb Poster"}
            />
          )}
          <Link className="back-to-search" to="/">
            <div className="back-button-flex-container">
              <FaAnglesLeft className="link-arrows" />
              <p className="back-text">back</p>
            </div>
          </Link>
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
  );
}