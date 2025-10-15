import { Link } from "react-router-dom"
import stabHook from "../../Hooks/stabHook"

export default function FlickResult({title, rating, id, displayed, tabbable, userReview}){

console.log(userReview)

    return (
        <Link to={`${id}`} tabIndex={-1} className={`${displayed ? "slide-up" : 'removed'}`} >
        <div className={`flick-result${userReview? ' user-review' : ''}`} tabIndex={displayed && tabbable? 0 : -1}>
            <h2 className="flick-result-title">{title}</h2>
            <div className="flick-result-rating" tabIndex={-1}>{stabHook(false, rating)}</div>
        </div>
        </Link> 
    )
}