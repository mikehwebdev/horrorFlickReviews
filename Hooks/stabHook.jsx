
import { RiKnifeBloodFill } from "react-icons/ri"
import { RiKnifeLine } from "react-icons/ri"


export default function stabsToRender (rating){
    
    let stabsToRender= new Array(5).fill('').map((stab, index) => {
        
    return index < rating ? <RiKnifeBloodFill key={index} className="knife filled"/> :  <RiKnifeLine key={index} className="knife"/>
})

return stabsToRender

}