
import {Link}  from "react-router-dom"
import { FaAnglesLeft } from "react-icons/fa6";

{/* Component for displaying errors */}

{/* Passes two props - message for the error message for the users and link for navigating user back to a journey  */}

export default function Error({message, link}){
    return (

        <div className="flick-not-found-container">
          <h2 className="flick-not-found-title">Flick not found</h2>
          <p className="flick-not-found-text">{message}</p>
          { link &&
          <Link to={link} className="back-to-search">
            <div className="back-button-flex-container">
            <FaAnglesLeft className="back-arrows" />
            <p className="back-text">Back to search</p>
            </div>
          </Link>
}
        </div>
    )
}


