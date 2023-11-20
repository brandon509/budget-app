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

    const onClickHome = () => {
        navigate('/')
        dispatch(reset())
    }

    const onClickLogout = () => {
        dispatch(logout())
    }

    const onClickLogin = () => {
        navigate('/account/login')
        dispatch(reset())
    }

    return(
        <div className="header">
            {location.pathname != '/' &&
                <div className="header-contents">
                    <h1 className="header-title" onClick={onClickHome}>CENT</h1>
                    {user && <button className="btn header-btn" onClick={onClickLogout}>Log out</button>}  
                    {location.pathname.includes('/account/verify') && <button className="btn header-btn" onClick={onClickLogin}>Log in</button>}
                </div>
            }
        </div>
    )
}