import Popup from 'reactjs-popup'
import Login from '../components/login'
import Signup from '../components/signup'

export default function Header(){
    const user = localStorage.user

    return(
        <div>
            <h3>Budgey</h3>
            <Popup trigger={<button>Sign up</button>} modal>
                    {close => (
                        <div>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <Signup />
                        </div>
                    )} 
                </Popup>

            {user ? <button>Logout</button> : 
                <Popup trigger={<button>Log in</button>} modal>
                    {close => (
                        <div>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <Login />
                        </div>
                    )}
                    
                </Popup>}
        </div>
    )
}