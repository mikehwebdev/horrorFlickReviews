
import { RiKnifeBloodFill } from "react-icons/ri"
import { RiKnifeLine } from "react-icons/ri"


export default function stabsToRender (rendered, rating){
    let stabsToRender= new Array(5).fill('').map((stab, index) => {
        
    return index < rating ? <RiKnifeBloodFill key={index} className="knife filled" id={index + 1} tabIndex={rendered ? 0 : -1}/> :  
    <RiKnifeLine key={index} className="knife" id={index + 1} tabIndex={rendered ? 0 : -1} />
})

return stabsToRender

}