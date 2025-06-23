import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import stabHook from "./Hooks/stabHook"

export default function FlickResult({title, rating, id}){

    const firstRender = useRef(true)
    
    useEffect(()=>{
        if(firstRender.current) {
            firstRender.current = false
        }
    },[firstRender]        
    )
    

    return (
        <Link to={`${id}`}>
        <div className="flick-result">
            <h2 className="flick-result-title">{title}</h2>
            <div className="flick-result-rating">{stabHook(rating)}</div>
        </div>
        </Link>
    )
}