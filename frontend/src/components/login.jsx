import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Login(){
    return(
        <div className="login-window">
            <h3>Login to Budgy</h3>
            <form className='login'>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <button>Log in</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign in with Google</p> 
            </button>
            <p>Forgot password?</p>
            <p>Don't have an account? Signup</p>
        </div>
    )
    
   
}