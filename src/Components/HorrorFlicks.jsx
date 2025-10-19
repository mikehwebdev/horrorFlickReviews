import { useState, useEffect, useRef } from "react"
import { useParams, Link, useLocation} from "react-router-dom"
import FlickResult from "./FlickResult"
import Flick from "./Flick"
import stabHook from "../../Hooks/stabHook"
import { horrorFlicksData } from "../../horrorFlickData"
import { FaAnglesRight } from "react-icons/fa6"
import imdbLogo from "../img/IMDb_Logo.png";
import Holding from "./HoldingMessage"
import Error from "./Error"

export default function HorrorFlicks() {

  const [searchString, setSearchString] = useState('')
  const [imdbInputString, setImdbInputString] = useState('')
  const [imdbSearchString, setImdbSearchString] = useState("")
  const [userImdbData, setUserImdbData] = useState(null)
  const [fetchingData, setFetchingData] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)  
  const [flickData, setFlickData] = useState(() => {
  const localFlickData = localStorage.getItem('flickData');
  return localFlickData ? JSON.parse(localFlickData) : horrorFlicksData;
});
  const [flickExists, setFlickExists] = useState(
    { exists: false,
      id:0
  })
  const [stabChoice, setStabChoice] = useState(0)
  const { id } = useParams()
  const firstRender = useRef(true)
  const { top } = useLocation()
  const [flipped, setFlipped] = useState(false)
  const inputRef = useRef(null)
  

  const defaultRenderData = {
    id: flickData.length,
    imdbId: '',
    imdbLink: '',
    displayed: '',
    reviewText: '',
    subHeader: '',
    title: "Please search",
    actors: "Please search",
    director: "Please search",
    release: "Please search",
    rating:stabChoice,
    userReview: true
  }

  // the clear modal only fails if i change text just changing stabs is fine

  const [renderData, setRenderData] = useState(defaultRenderData)


useEffect(() => {
  localStorage.setItem('flickData', JSON.stringify(flickData));
}, [flickData]);

useEffect(()=> {
    window.scrollTo(0,0)
},[top])

const filterResults = flickData.map(flick => {
  return {
    ...flick,
    displayed: flick.title.toLowerCase().includes(searchString.toLowerCase())
  }
})

const flickResultElements = filterResults.map(flickResult => (
  <FlickResult
    key={flickResult.id}
    id={flickResult.id}
    title={flickResult.title}
    cardimage={flickResult.cardImage}
    rating={flickResult.rating}
    subHeader={flickResult.subHeader}
    reviewText={flickResult.reviewText}
    imdbLink={flickResult.imdbLink}
    displayed={flickResult.displayed}
    userReview={flickResult.userReview}
    tabbable={searchString !== ''}
    clicked={flickResult.clicked}
    reviewClicked={reviewClicked}
    editReview={editReview}
    clearModal={clearModal}
  />
))



function reviewClicked(id){
  setFlickData(prev => (
    prev.map(flick => {
      return {...flick, clicked: id === flick.id ? true : false }
    }
  ))
)

setTimeout(()=>{
      
 setFlickData(prev => prev.map(flick => ({...flick, clicked: false})))

    }, 3000)
}

function editReview(id){
  
  setFlipped(true)
  setUserImdbData(flickData[id])
  setRenderData(flickData[id])
}

function localReviewStringUpdater(e) {
  setSearchString(e.target.value)
}

function imdbInputStringUpdater(e) {
  setFlickExists(prev => ({...prev,exists: false}))
  setSearchString('')

  if (!e.target.value) {
    setUserImdbData(null)
  }

  setImdbInputString(e.target.value)
}

async function fetchData(){

let match = false

for (let flick of flickData) {
  
if (flick.title.toLowerCase() === imdbInputString.toLowerCase()) {
  
  setFlickExists({
    exists: true,
    id: flick.id})
    match = true
}  
}

if (match) return

      setFetchingData(true)
      setFetchingError(null)

try {

      const res = await fetch(`http://www.omdbapi.com/?apikey=b60f271c&t=${imdbSearchString}`)
      const data = await res.json()

      if (!data || data.Response === "False") {
        setTimeout(() => {
        setFetchingError(!data ? 'OMDb or network error' : data.Response ? 'Movie not found on OMDB. Try another search!' : 'Unknown error')
        setFetchingData(false)
        return
        }, 1500)
      }

      setTimeout(() => {
        
      setUserImdbData(data)  
      setRenderData(

      prev => {
        return {
          ...prev,
          id: flickData.length,
          title: data.Title,
          actors: data.Actors,
          director: data.Director,
          release: data.Year,
          poster: data.Poster,
          imdbId: data.imdbID,
          imdbRating: data.imdbRating,
          imdbLink: data.imdbLink,
          rating: stabChoice,
          clicked:false
        }
      }
    )
    setFetchingData(false)
      }, 1500)
    } catch (err) {
      setFetchingError('No response from OMDb')
      setFetchingData(false)
      return
    }
}

// Add comments to explain my logic.

// Write a readme   with screenshotes

useEffect(() => {
  if (firstRender.current) {
  firstRender.current = false
  return
  }
  
  fetchData()
  
}, [imdbSearchString])

function updateRenderData(e) {
    
  const name = e.target.name
  const value = e.target.value

  setRenderData(prev => {
    return {...prev, [name]: value }
  })
}

function buttonDisplay (){
  if (!userImdbData) return 'Search OMDb for your flick'
  if (!renderData.subHeader) return 'Add your subheader'
  if (!renderData.reviewText) return 'Add your review'
  if (stabChoice < 1) return 'Add your rating'
  return 'Submit'
}


function flickDataUpdater(e){
  e.preventDefault()
if (renderData.id === flickData.length) {
  setFlickData( prev => [
    ...prev,
    {...renderData,
      rating:stabChoice,
      clicked:false
  }]) 
}

setFlickData(
  prev => prev.map(flick => flick.id === renderData.id ? {...renderData, rating:stabChoice} : flick )
)


    inputRef.current.value = ''
    inputRef.current.focus()
    setFlipped(false)
    setRenderData(defaultRenderData)
    setImdbInputString('') 
}

  return (
    <>
        {id ? (
          <Flick />
        ) : (
          <div className="flick-search">
            <div className="flick-search-inputs">
              <form className="search-input-form" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="search Mikey's reviews..."
                  onChange={localReviewStringUpdater}
                  value={searchString}
                  className="search-input"
                  onFocus={() => setFlipped(false)}
                  ref={inputRef}
                />
                {searchString && <button type="submit" className="fetch-btn-flicks" tabIndex={-1}></button>}
              </form>
              <p className="input-seperator-text">- or -</p>
              <form onSubmit={(e) => {
                e.preventDefault()
                setSearchString('')
                  setImdbSearchString(imdbInputString)}} 
                className="imdb-search-input-form">
                <input
                  type="text"
                  placeholder="search OMDb and add your own..."
                  onChange={imdbInputStringUpdater}
                  value={imdbInputString}
                  className="imdb-search-input"
                  onFocus={() => setFlipped(true)}
                  tabIndex={searchString ? -1 : 0}
                />
                {imdbInputString && <button type="submit" className="fetch-btn-imdb"><FaAnglesRight className="drop-in"  tabIndex={-1}/></button>}
                {/* why isnt the animation playing on this arrow? */}
                {flickExists.exists && 
                
                <div className="flick-already-exists splat">
                  <p className="flick-already-exists-text">This flick already exists</p>
                  <Link to={`${flickExists.id}`} className="flick-already-exists-link" onClick={() =>setFlickExists({exists: false, id: null})} tabIndex={flickExists.exists ? 0 : -1}>
                    <p className="flick-already-exists-text">Show me</p>
                    <FaAnglesRight  />
                  </Link>
                </div>
                }
              </form>
            </div>  
                      <div className="flipper">
                <div className={`flipper-inner ${flipped ? 'flipped' : null }`}>
                  <div className="flipper-front">
                          <div className="flick-result-container" tabIndex={-1}>
                {flickResultElements}
              </div>
                  </div>
                  <div className="flipper-back">
              { fetchingData ? 
                  <Holding /> :
                fetchingError ?
                  <Error 
                  message={fetchingError}
                  link={null}/>
              :

              <form className={`flick-input-form${userImdbData ? ' opacity-full' : ''}`} tabIndex={-1} onSubmit={(e) => flickDataUpdater(e)}>                
                <h2 className="flick-input-form-search-title-complete" >{renderData.title}</h2> 
                <p className={`flick-input-search-rating ${!stabChoice ? '' : 'completed'}`} 
                onClick={e => setStabChoice(e.target.id)}
                onKeyDown={ e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                  setStabChoice(e.target.id)
                  }
                }}
                >{stabHook(userImdbData ? true : false, stabChoice)}</p>
                <input
                  type="text"
                  placeholder="add subheader"
                  className={`flick-input-subheader ${renderData.subHeader? 'completed': ''}`}
                  name={"subHeader"}
                  onChange={(e) => updateRenderData(e)}
                  value={renderData.subHeader}
                  tabIndex={userImdbData ? 0 : -1}
                />
                <textarea
                  placeholder="add your review"
                  className={`flick-input-review-text ${renderData.reviewText? 'completed': ''}`}
                  name={"reviewText"}
                  onChange={(e)=> updateRenderData(e)}
                  value={renderData.reviewText}
                  tabIndex={userImdbData ? 0 : -1}
                />
                <button className={`flick-input-submit${buttonDisplay() === 'Submit' ? ' completed' : ''}`}
                type="submit"
                disabled={buttonDisplay() !== 'Submit'}
                >{buttonDisplay()}</button>
                <p className="flick-input-actors">
                  Actors: {renderData.actors}
                </p>
                <p className="flick-input-director">
                  Director: {renderData.director}
                </p>
                <p className="flick-input-released">
                  Released: {renderData.release}
                </p>
                {renderData.poster && (
                  <img
                    className="flick-input-imdb-poster"
                    src={renderData.poster}
                    alt={renderData.title}
                  />
                )}
              </form>
              } 
                  </div>
                </div>
              </div>
          </div>
        )}
    </>
  )
}