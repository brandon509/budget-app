import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function ErrorBox({ errorMsg }){
    return(
        <div className="test">
            <p className="error-message-box"><FontAwesomeIcon icon={faTriangleExclamation} style={{background: "rgb(251, 235, 230)"}} />{errorMsg}</p>
        </div>
    )
}