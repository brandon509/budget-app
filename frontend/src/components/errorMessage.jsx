import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function ErrorBox({ errorMsg }){
    return(
        <div className="error-message-box-container">
            <p className="error-message-box"><FontAwesomeIcon icon={faTriangleExclamation} />{errorMsg}</p>
        </div>
    )
}