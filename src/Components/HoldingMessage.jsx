
import alienLoader from "../img/alien_loading.gif"

{/* Component for displaying when fetching data including an animation and loading text */}

export default function HoldingMessage(){
    return (
        <div className="holding-message">
            <img src={alienLoader} alt="Loading..." />
            <p className="loading-text">Hunting...</p>
        </div>
    )
}