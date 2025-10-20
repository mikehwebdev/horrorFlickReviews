import { Link, useNavigate } from "react-router-dom"
import stabHook from "../../Hooks/stabHook"
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

// search result populated on main page

export default function FlickResult({title, rating, id, displayed, tabbable, userReview, clicked, reviewClicked, editReview}){

// Navigation hook for workaround as you can't nest Link components
let navigate = useNavigate()

    return (
        <Link to={userReview ? '' : `${id}`} tabIndex={-1} className={`${displayed ? "slide-up" : 'removed'}`} onClick={() => reviewClicked(id)}>
        <div className={`flick-result${userReview? ' user-review' : ''} ${clicked && userReview && 'background-blur'}`} tabIndex={displayed && tabbable? 0 : -1}>
            <h2 className="flick-result-title">{title}</h2>
            <div className="flick-result-rating" tabIndex={-1}>{stabHook(false, rating)}</div>
        </div>
        {/* action buttons for is user review is clicked - doesn't display for default data */}
        { clicked && userReview && <div className={`user-review-modal${clicked && userReview ? ' opacity-full' : ''}`}>
            <FiEdit onClick={() => editReview(id)}  className="modal-flex-item" />
            <FiTrash2 className="modal-flex-item" /> 
            <FiEye className="modal-flex-item" onClick={(e)=>{
                e.stopPropagation()      
                e.preventDefault() 
                navigate(`/${id}`)
            }}/>
        </div>}
        </Link> 
    )
}