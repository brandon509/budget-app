export default function Login({ dis }){
    return(
        <div>
            {dis &&
            <div>
                <button>x</button>
                <form>
                    <input type="email" placeholder="email"></input>
                    <input type="password" placeholder="password"></input>
                </form>
                <p>OR</p>
                <p>Sign in with Google</p>
                <p>Don't have an account? Signup</p>
            </div>}
        </div>
    )
    
   
}