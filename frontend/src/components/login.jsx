import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Login(){
    return(
        <div className="login-window">
            <h3>Login</h3>
            <form className='login'>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
            </form>
            <button>Login</button>
            <p>OR</p>
            <div className="google-sign-in">
                <p><FontAwesomeIcon className="google-icon" icon={faGoogle} /> Sign in with Google</p> 
            </div>
            <p>Don't have an account? Signup</p>
        </div>
    )
    
   
}