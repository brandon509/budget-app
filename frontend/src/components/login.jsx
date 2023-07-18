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
            <p>Sign in with Google</p>
            <p>Don't have an account? Signup</p>
        </div>
    )
    
   
}