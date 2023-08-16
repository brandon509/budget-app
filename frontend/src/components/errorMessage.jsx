import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function ErrorBox({ errorMsg }){
    return(
        <div>
            <p style={{border: "rgb(248, 207, 201) 2px solid", borderLeft: "rgb(202, 64, 57) solid 6px", borderRadius: "5px", background: "rgb(251, 235, 230)", color: "rgb(202, 65, 57)", padding: "5px", textAlign: "center", overflowWrap: "break-word", width: "283px"}}><FontAwesomeIcon icon={faTriangleExclamation} style={{background: "rgb(251, 235, 230)", paddingRight: "6px"}} />{errorMsg}</p>
        </div>
    )
}