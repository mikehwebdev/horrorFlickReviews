import { useState, useEffect, useRef, useMemo } from "react"
import { useParams, Link, useLocation} from "react-router-dom"
import FlickResult from "./FlickResult"
import Flick from "./Flick"
import stabHook from "../../Hooks/stabHook"
import { horrorFlicksData } from "../../horrorFlickData"
import { FaAnglesRight } from "react-icons/fa6"
import { FaAnglesLeft } from "react-icons/fa6"
import Holding from "./HoldingMessage"
import Error from "./Error"




//  This is the main component for my app - It shows existing reviews and search inputs for finding your own 

export default function HorrorFlicks() {

  // variable to help hide API key

const apiKey = import.meta.env.VITE_OMDB_API_KEY

// State for the component

// State for search and input values
  const [searchString, setSearchString] = useState('')
  const [imdbInputString, setImdbInputString] = useState('')
  const [imdbSearchString, setImdbSearchString] = useState("")

//State for API and managing API errors
  const [userImdbData, setUserImdbData] = useState(null)
  const [fetchingData, setFetchingData] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)  

//Review data - will either return default data or customised data if it exists
  const [flickData, setFlickData] = useState(() => {
  const localFlickData = localStorage.getItem('flickData')
  return localFlickData ? JSON.parse(localFlickData) : horrorFlicksData
})

// States for determining UI
  const [flickExists, setFlickExists] = useState(
    { exists: false,
      id:0
  })
  const [stabChoice, setStabChoice] = useState(0)
  const [flipped, setFlipped] = useState(false)

// React router, refs and misc

  const { id } = useParams()
  const firstRender = useRef(true)
  const { top } = useLocation()
  const inputRef = useRef(null)
  
// default movie date for new review
  const defaultRenderData = {
    id: flickData.length,
    title: "Please search",
    rating:stabChoice,
    subHeader: '',
    reviewText: '',
    imdbLink: '',
    imdbId: '',
    userReview: true,
    clicked:false,
    displayed: '',
    actors: "Please search",
    director: "Please search",
    release: "Please search",
    deleteClicked: false
  }

const [renderData, setRenderData] = useState(defaultRenderData)

// My useEffects

// Update localStorage when changing main movie data

useEffect(() => {
  localStorage.setItem('flickData', JSON.stringify(flickData))
}, [flickData])

// Scroll to top when navigating back

useEffect(()=> {
  window.scrollTo(0,0)
},[top])

// Triggers API data fetch when user has actually submitted a search - not on initial render
useEffect(() => {
  if (firstRender.current) {
  firstRender.current = false
  return
  }
  
  fetchData()
  
}, [imdbSearchString])


// Filter logic for flick reviews
const filterResults = useMemo(() => {
  return flickData.map(flick => ({
    ...flick,
    displayed: flick.displayed === false 
      ? false 
      : flick.title.toLowerCase().includes(searchString.toLowerCase())
  }))
}, [flickData])

// Generate FlickResult components using filtered array
const flickResultElements = useMemo(() => 
  filterResults
    .filter(flickResult => flickResult.displayed === true)
    .map(flickResult => (
      <FlickResult
        key={flickResult.id}
        id={flickResult.id}
        title={flickResult.title}
        rating={flickResult.rating}
        displayed={flickResult.displayed}
        userReview={flickResult.userReview}
        tabbable={searchString !== ''} //For accessibility - this ensures the flick results are only tabbable when searchString has a truthy value
        clicked={flickResult.clicked}
        reviewClicked={reviewClicked}
        editReview={editReview}
        deleteReview={deleteReview}
        deleteClicked={flickResult.deleteClicked}
        clearPrompt={clearPrompt}
        confirmDeletePrompt={confirmDeletePrompt}
      />
    )),
  [filterResults]
)

//Functions for userReview modal

// Displays modal and action
function reviewClicked(id){
  setFlickData(prev => (
    prev.map(flick => {
      return {...flick, clicked: id === flick.id ? true : false }
    }
  ))
)
}

// Display edit mode for user review
function editReview(id){
  window.scrollTo(0,0)
  setFlipped(true)
  setUserImdbData(flickData[id])
  setRenderData(flickData[id])
}

//  Show delete confirmation for user review
function deleteReview(e,id){
  e.stopPropagation()
  e.preventDefault()
  setFlickData(prev => (
    prev.map(flick => {
      return {...flick, 
        deleteClicked: id === flick.id ? true : false,
        title: id === flick.id ? '' : flick.title}
    }
  )
  ))
}

//  Clear modal
function clearPrompt(e){
  if (e) {
  // This ensures function is immediately called on click and no event bubbling
  e.stopPropagation() 
  //  Stops the page from rereshing and scrolling to top
  e.preventDefault() 
  } 

  setFlickData(prev => prev.map(flick => ({...flick, clicked: false, deleteClicked:false})))
}

// Delete review function - actually hides flick rather than delete
function confirmDeletePrompt(e, id){
  e.stopPropagation() 
  e.preventDefault()
  
  setFlickData(prev =>(
  prev.map(flick => flick.id === id ? {...flick, displayed:false} : flick)
))

  clearPrompt()
  setRenderData(defaultRenderData)
}

// Updates local search string
function localReviewStringUpdater(e) {
  setSearchString(e.target.value)
}

// Updates online search string
function imdbInputStringUpdater(e) {
  setFlickExists(prev => ({...prev,exists: false})) //Clear state for managing "Flick exsits!" warning
  setSearchString('') //Clears local search for smooth UX

  if (!e.target.value) {
    setUserImdbData(null) //Clear OMDb data if no string
  }

  setImdbInputString(e.target.value)
}

// API logic and asociated functions

//Fetch movie data from OMDB
async function fetchData(){

let match = false

// Checks to see if movie exists in movie data
for (let flick of flickData) {
  if (flick.title.toLowerCase() === imdbInputString.toLowerCase()) {
    setFlickExists({
    exists: true,
    id: flick.id
  })

  match = true
}  
}

if (match) return //Returns out if movie already exists - doesn't fetch

  setFetchingData(true)
  setFetchingError(null)

try {

    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}=${imdbSearchString}`)
    const data = await res.json()

    //Error handling for API
    if (!data || data.Response === "False") {
      setTimeout(() => {
      setFetchingError(!data ? 'OMDb or network error' : data.Response ? 'Movie not found on OMDB. Try another search!' : 'Unknown error')
      setFetchingData(false)
      return
      }, 1500)
    }

    //After pause to simulate fetching populates form
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

//Form logic

// Updates form fields after each user keystroke
function updateRenderData(e) {
    
  const name = e.target.name
  const value = e.target.value

  setRenderData(prev => {
    return {...prev, [name]: value }
  })
}

// Fancy and dynamic/contextual button text
function buttonDisplay (){
  if (!userImdbData) return 'Search OMDb for your flick'
  if (!renderData.subHeader) return 'Add your subheader'
  if (!renderData.reviewText) return 'Add your review'
  if (stabChoice < 1) return 'Add your rating'
  return 'Submit'
}

//Save down new or edited review to flickData
function flickDataUpdater(e){
  e.preventDefault()

//Add new review
if (renderData.id === flickData.length) {
  setFlickData( prev => [
    ...prev,
    {...renderData,
      rating:stabChoice,
      clicked:false
  }]) 
}

//Update existing review if not clear modal
setFlickData(
  prev => prev.map(flick => flick.id === renderData.id ? {...renderData, rating:stabChoice} :  {...flick, clicked: false} )
)

//Restore form for next use
    inputRef.current.value = ''
    inputRef.current.focus()
    setFlipped(false)
    setRenderData(defaultRenderData)
    setImdbInputString('') 
}

// Cancel the edit function and restore form for next use
function cancelEdit(){
    inputRef.current.value = ''
    inputRef.current.focus()
    setFlipped(false)
    setRenderData(defaultRenderData)
    setImdbInputString('') 
}

// Rendering code

  return (
    <>
    {/* Show selected flick by ID from URL else show main search */}
        {id ? (
          <Flick />
        ) : (
          <div className="flick-search">
            {/* Search inputs */}
            <div className="flick-search-inputs">
              {/* Local review search */}
              <form className="search-input-form" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="search Mikey's reviews..."
                  name="Local review search"
                  onChange={localReviewStringUpdater}
                  value={searchString}
                  className="search-input"
                  onFocus={() => setFlipped(false)}
                  ref={inputRef}
                  maxLength={25}
                />
                {searchString && <button type="submit" className="fetch-btn-flicks" tabIndex={-1}></button>}
              </form>
              <p className="input-seperator-text">- or -</p>

              {/* OMDb search */}
              <form onSubmit={(e) => {
                e.preventDefault()
                setSearchString('')
                  setImdbSearchString(imdbInputString)}} 
                className="imdb-search-input-form">
                <input
                  type="text"
                  name="OMDb review search"
                  placeholder="search OMDb and add your own..."
                  onChange={imdbInputStringUpdater}
                  value={imdbInputString}
                  className="imdb-search-input"
                  onFocus={() => setFlipped(true)}
                  tabIndex={searchString ? -1 : 0}
                  maxLength={25}
                />
                {imdbInputString && <button type="submit" className="fetch-btn-imdb"><FaAnglesRight className="drop-in"  tabIndex={-1}/></button>}

                {/* Duplicate movie popup */}
                {flickExists.exists && 
                
                <div className="user-prompt splat">
                  <p className="user-prompt-text">This flick already exists</p>
                  <Link to={`${flickExists.id}`} className="user-prompt-link" onClick={() =>setFlickExists({exists: false, id: null})} tabIndex={flickExists.exists ? 0 : -1}>
                    <p className="user-prompt-text">Show me</p>
                    <FaAnglesRight  />
                  </Link>
                </div>
                }
              </form>
            </div>  

            {/* Fancy flipper element */}
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

              <form className={`flick-input-form${userImdbData ? ' opacity-full' : ''}`} 
              tabIndex={-1} 
              onSubmit={(e) => flickDataUpdater(e)}
              disabled={!userImdbData}
              >                
                <h2 className="flick-input-form-search-title-complete" >{renderData.title}</h2> 
                {/* Stab based rating system) */}
                <p className={`flick-input-search-rating ${!stabChoice ? '' : 'completed'}`} 
                onClick={e => setStabChoice(e.target.id)}
                onKeyDown={ e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                  setStabChoice(e.target.id)
                  }
                }}
                >{stabHook(userImdbData ? true : false, stabChoice)}</p>

                {/* User input section */}
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

                {/* Inout for for new review */}
                  <button className="cancel-edit-btn" type="button" disabled={!userImdbData} onClick={() => cancelEdit()}>
                    <FaAnglesLeft className="link-arrows" />
                    <p className="cancel-edit-text">back</p>
                  </button>
                <button className={`flick-input-submit${buttonDisplay() === 'Submit' ? ' completed' : ''}`}
                type="submit"
                disabled={buttonDisplay() !== 'Submit'}
                >{buttonDisplay()}</button>

                {/* Fetched movie info */}
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