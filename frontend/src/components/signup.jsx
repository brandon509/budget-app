export default function Signup(){
    return(

        <div className="login-window">
            <h3>Join Budgey</h3>
            <form className="login">
                <input type="text" placeholder="name" name="name"></input>
                <input type="email" placeholder="email" name="email"></input>
                <input type="password" placeholder="password" name="password"></input>
                <input type="password" placeholder="password" name="confirmPassword"></input>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}