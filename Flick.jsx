import { useEffect, useState} from "react"
import { useParams, Link } from "react-router-dom"
import { horrorFlicksData } from "../Data/horrorFlickData"
import alienLoader from "../imgs/alien_loading.gif"
import { FaAnglesLeft } from "react-icons/fa6"

import stabHook from "../Hooks/stabHook"

import imdbLogo from "../src/img/IMDb_Logo.png"

export default function Flick(){

    const {id} = useParams()

    const {title, rating, subHeader, review, imdbLink, imdbId} = horrorFlicksData[id]

    const [imdbData, setImdbData] = useState(null)

    useEffect(()=>{
        setInterval(()=>{
        fetch(`http://www.omdbapi.com/?apikey=b60f271c&i=${imdbId}`)
        .then(res => res.json())
        .then(data => setImdbData(data))
    }, 3000)
    }, [])

    return (
            <>
                {!imdbData? 
                <div className="holding-message">
                    <img src={alienLoader}/>
                    <p className="loading-text">Hunting...</p>
                </div> 
                : 
                <div className="flick">
                <h2 className="flick-title">{title}</h2>
                <p className="flick-mikey-rating">{stabHook(rating)}</p>
                <h3 className="flick-mikey-sub-title">{subHeader}</h3>
                <p className="flick-mikey-review-text"><span className="mini-review-title">Mikey's mini-review:</span><br /> {review}</p>
                <p className="flick-imdb-actors">Actors: {imdbData.Actors ? imdbData.Actors : "No response from IMDb"}</p>
                <p className="flick-imdb-director">Director: {imdbData.Director ? imdbData.Director: "No response from IMDb"}</p>
                <p className="flick-imdb-released">Released: {imdbData.Released ? imdbData.Released: "No response from IMDb"}</p>
                
                <img className="flick-imdb-poster" src={imdbData.Poster}/>

                <Link className="back-to-search" to="."><div className="back-button-flex-container"><FaAnglesLeft className="back-arrows" /><p className="back-text">back</p></div></Link> 
                
                <Link to={`${imdbLink}`} target="_blank" className="imdb-link">
                    <div className="imdb-rating-flex-container">
                        <img className="imdb-logo" src={imdbLogo} />
                        <p className="imdb-rating"><span className="imdb-score">{imdbData.imdbRating}</span>/10</p>    
                    </div>
                </Link>
            </div> }
            </>
    )
}