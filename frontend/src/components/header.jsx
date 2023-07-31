import PopupWindow from './popupWindow'

export default function Header(){
    const user = localStorage.user

    return(
        <div>
            <h3>Budgey</h3>
            <PopupWindow item="Sign up"/>
            {user ? <button>Logout</button> : <PopupWindow item="Sign in"/>}
        </div>
    )
}