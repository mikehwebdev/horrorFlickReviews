
import react, { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import FlickResult from "./FlickResult"
import Flick from "./Flick"
import { horrorFlicksData } from "./horrorFlickData"
import { FaCirclePlus } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";


export default function HorrorFlicks(){
    
    const [searchString, setSearchString] = react.useState('')
    const [imdbInputString, setImdbInputString] = react.useState('')
    const [imdbSearchString, setImdbSearchString] = react.useState('')
    const [userImdbData, setUserImdbData] = react.useState(null)
    const {id} = useParams()
    const [addReview, setAddReview] = useState(false)

    const filterResults = horrorFlicksData.filter(flick => flick.title.toLowerCase().includes(searchString.toLowerCase()))
   
    const flickResultElements = filterResults.map(flickResult =>
    {
        return (
        <FlickResult
            key={flickResult.id}
            id={flickResult.id}
            title={flickResult.title}
            cardimage={flickResult.cardImage}
            rating={flickResult.rating}
            subHeader={flickResult.subHeader}
            review={flickResult.review}
            imdbLink={flickResult.imdbLink}
        />
        )
    }
    
    )
    function inputDataUpdate(e){
        setSearchString(e.target.value)
    }

        function inputData2Update(e){
        setImdbInputString(e.target.value)
    }
       
    function addReviewToggle() {
        setAddReview(prev => !prev
        )
    }

    useEffect(()=>{
            fetch(`http://www.omdbapi.com/?apikey=b60f271c&t=${imdbSearchString}`)
            .then(res => res.json())
            .then(data => setUserImdbData(data))
        },[imdbSearchString])  

return (
        <>   
            <section className="section horror-section">
            <h2 className="title horror-title">Horror flick micro reviews</h2>
               {id ? <Flick/> :
               <div className="flick-search">
                <input 
                type="text" 
                placeholder="search reviews..."
                onChange={inputDataUpdate}
                value={searchString}
                className="search-input"
                />

                <div className="flippy-container">
                    <div className={`flippy-inner${addReview ? ' flipped' : ''}`}>
                        <div className="flippy-front">
                            <button onClick={addReviewToggle} className="horror-btn">add your own review <FaCirclePlus className="add-icon"/></button>
                        </div>
                        <div className="flippy-back">
                            <input
                            type="text"
                            placeholder="search imdb..."
                            onChange={inputData2Update}
                            value={imdbInputString}
                            className="imdb-search-input"
                            />
                            <button className="fetch-btn" onClick={() => {setImdbSearchString(imdbInputString)}}><FaAnglesRight /> </button>
                            <button className="back-btn" onClick={addReviewToggle}><FaArrowRotateLeft className="back-icon"/></button>
                        </div>
                    </div>
                </div>
                {imdbSearchString &&            
                        <div className="flick-search-result-expanded">
                            <h2 className="flick-title">{userImdbData.Title}</h2>
                            <input 
                                type="text"
                                placeholder="add subheader"
                                className="flick-search-input-subheader"/>

                                <input 
                                type="textarea"
                                placeholder="add you review"
                                className="flick-search-input-review-text"/>
                                <p className="flick-search-actors">Actors: {userImdbData.Actors ? userImdbData.Actors : "No response from IMDb"}</p>
                                <p className="flick-search-director">Director: {userImdbData.Director ? userImdbData.Director: "No response from IMDb"}</p>
                                <p className="flick-search-released">Released: {userImdbData.Released ? userImdbData.Released: "No response from IMDb"}</p>
                                <img className="flick-search-imdb-poster" src={userImdbData.Poster}/>
                                
                            {/* <p className="flick-mikey-rating">{stabHook(rating)}</p>
                            
                            <img className="flick-imdb-poster" src={imdbData.Poster}/>
            
                            <Link className="back-to-search" to="."><div className="back-button-flex-container"><FaAnglesLeft className="back-arrows" /><p className="back-text">back</p></div></Link> 
                            
                            <Link to={`${imdbLink}`} target="_blank" className="imdb-link">
                                <div className="imdb-rating-flex-container">
                                    <img className="imdb-logo" src={imdbLogo} />
                                    <p className="imdb-rating"><span className="imdb-score">{imdbData.imdbRating}</span>/10</p>    
                                </div>
                            </Link> */}
                        </div>       
                }
                {searchString && filterResults.length === 0 ? <p>No results</p> : 
                <div className="flick-result-container slide-up">
                    {flickResultElements}
                    </div> 
                }   
               
               </div> 
               }
            </section>
            
        </>
    )
}