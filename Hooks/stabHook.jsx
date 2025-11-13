
import { RiKnifeBloodFill } from "react-icons/ri"
import { RiKnifeLine } from "react-icons/ri"

{/* My hook that renders knives for the stab rating (review score) - created as a hook as being re-used several times in the same format */}
export default function stabsToRender (rendered, rating){

    {/* Creates an array or knife containers */}
    let stabsToRender= new Array(5).fill('').map((stab, index) => {
        
    {/* if index is less or equal to score renders a full knife otherwise empty knife */}
    return index < rating ? 
    <RiKnifeBloodFill 
        key={index} 
        className="knife filled" 
        id={index + 1} 
        tabIndex={rendered ? 0 : -1}/> :  
    <RiKnifeLine 
    key={index} 
    className="knife" 
    id={index + 1} 
    tabIndex={rendered ? 0 : -1} />
})

return stabsToRender

}