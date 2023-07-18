import Popup from 'reactjs-popup'
import Login from '../components/login'

export default function Header(){
    return(
        <div>
            <h3>Budgey</h3>
            <Popup trigger={<button>Login</button>} modal>
                {close => (
                    <button className="close" onClick={close}>
                        &times
                    </button>
                )}
                <Login />
            </Popup>
        </div>
    )
}