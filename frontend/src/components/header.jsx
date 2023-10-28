import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../features/auth/authSlice"
import { useEffect } from 'react'

export default function Header(){
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isSuccess && !user && !message){
            navigate('/')
            dispatch(reset())
        }
    }, [isSuccess, navigate, dispatch])

    const onClick = () => {
        dispatch(logout())
    }
    return(
        <div>
            {/* {location.pathname != '/' && <h1>Budgey</h1>} */}
            {user && <button onClick={onClick}>Logout</button>}
        </div>
    )
}