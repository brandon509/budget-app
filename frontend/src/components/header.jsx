import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../features/auth/authSlice"
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPowerOff, faUser, faFolder } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/modal'

export default function Header(){
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isSuccess, message } = useSelector((state) => state.auth)

    const [isVisable, setIsVisable] = useState(false)

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

    const onClickVisable = () => {
        setIsVisable(!isVisable)
    }

    return(
        <div className="header">
            {location.pathname != '/' &&
                <div className="header-contents">
                    <h1 className="header-title" onClick={onClickHome}>CENT</h1>

                    {user && <FontAwesomeIcon className="hamburger" onClick={onClickVisable} icon={faBars} />}
                    {/* {isVisable && <div className="hamburger-container">
                        <ul className="hamburger-list">
                            <li className="hamburger-list-item"><FontAwesomeIcon className="icon" icon={faUser} />View Profile</li>
                            <li className="hamburger-list-item"><Modal /></li>
                            <li className="hamburger-list-item last-item" onClick={onClickLogout}><FontAwesomeIcon className="icon" icon={faPowerOff} />Log out</li>
                        </ul>
                        </div>} */}
                        <div className="hamburger-container">
                        <ul className="hamburger-list">
                            <li className="hamburger-list-item"><FontAwesomeIcon className="icon" icon={faUser} />View Profile</li>
                            <li className="hamburger-list-item"><Modal /></li>
                            <li className="hamburger-list-item last-item" onClick={onClickLogout}><FontAwesomeIcon className="icon" icon={faPowerOff} />Log out</li>
                        </ul>
                        </div>
                    {/* {user && <button className="btn header-btn" onClick={onClickLogout}>Log out</button>} */}

                    {location.pathname.includes('/account/verify') && <button className="btn header-btn" onClick={onClickLogin}>Log in</button>}
                </div>
            }
        </div>
    )
}