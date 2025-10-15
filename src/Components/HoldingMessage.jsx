
import alienLoader from "../img/alien_loading.gif";

export default function HoldingMessage(){
    return (
        <div className="holding-message">
            <img src={alienLoader} alt="Loading..." />
            <p className="loading-text">Hunting...</p>
        </div>
    )
}