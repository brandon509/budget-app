import Popup from 'reactjs-popup'
import Signup from '../components/signup'
import Login from '../components/login'

export default function PopupWindow({ item }){
    return(
        <Popup trigger={<button>{item}</button>} modal>
                    {close => (
                        <div>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            {item === "Sign up" ? <Signup /> : <Login /> }
                        </div>
                    )} 
                </Popup>
    )
}