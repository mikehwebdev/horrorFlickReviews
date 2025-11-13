import { Link, useNavigate } from "react-router-dom"
import stabHook from "../../Hooks/stabHook"
import { FiEdit, FiTrash2, FiEye, FiCheck, FiChevronsLeft } from "react-icons/fi"

// Search result populated on main page


export default function FlickResult({title, rating, id, displayed, tabbable, userReview, clicked, reviewClicked, editReview, deleteClicked, deleteReview, clearPrompt, confirmDeletePrompt}){

// Navigation hook for workaround as you can't nest Link components
let navigate = useNavigate()

    return (
        <Link to={userReview ? '' : `${id}`} tabIndex={-1} className={`${displayed ? "slide-up" : 'removed'}`} onClick={() => reviewClicked(id)}>
        <div className={`flick-result${userReview? ' user-review' : ''} ${clicked && userReview && 'background-blur'}`} tabIndex={displayed && tabbable? 0 : -1}>
            <h2 className="flick-result-title">{title}</h2>
            <div className="flick-result-rating" tabIndex={-1}>{stabHook(false, rating)}</div>
            {userReview && <p className="new-tag boing">New!</p>}
        </div>
        {/* action buttons for if user review is clicked - doesn't display for default data */}

        { clicked && userReview && <div className={`user-review-modal${clicked && userReview ? ' opacity-full' : ''}`}>
            <FiChevronsLeft onClick={ e => clearPrompt(e)} className="modal-flex-item" />
            <FiEdit onClick={(e) => {
                clearPrompt(e)
                editReview(id)}}  className="modal-flex-item" />
            <FiTrash2 onClick={(e) => {
                
                deleteReview(e, id)}} className="modal-flex-item" /> 
            <FiEye className="modal-flex-item" onClick={(e)=>{
                // e.preventDefault() 
                clearPrompt(e)
                navigate(`/${id}`)
            }}/>
        </div>}

        {deleteClicked && userReview && 
            <div className={`delete-prompt${deleteClicked? ' splat' : ''}`}>
                <p>Are you sure?</p>
                <div className="delete-icon-flex-container">
                    <button onClick={e => clearPrompt(e)} className="delete-icon-button">
                        <FiChevronsLeft className="delete-icon"/>
                    </button>
                    <button onClick={(e)=>{confirmDeletePrompt(e, id)}} className="delete-icon-button">
                        <FiCheck className="delete-icon"/>
                    </button>
                </div>
            </div>}
        </Link> 
    )
}