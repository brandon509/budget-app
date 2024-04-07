import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faPowerOff,
  faUser,
  faFolder,
} from "@fortawesome/free-solid-svg-icons"
import Modal from "../components/modal"

export default function Header() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess, message } = useSelector((state) => state.auth)

  const [isVisable, setIsVisable] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  useEffect(() => {
    if (isSuccess && !user && !message) {
      navigate("/")
      dispatch(reset())
    }
  }, [isSuccess, navigate, dispatch])

  const onClickHome = () => {
    navigate("/")
    dispatch(reset())
  }

  const onClickLogout = () => {
    dispatch(logout())
  }

  const onClickLogin = () => {
    navigate("/account/login")
    dispatch(reset())
  }

  const onMouseEnter = () => {
    setIsVisable(true)
  }

  const onMouseLeave = () => {
    setIsVisable(false)
  }

  const onClickCategoriesOpen = () => {
    setIsCategoriesOpen(true)
    setIsVisable(false)
  }

  const onClickCategoriesClose = () => {
    setIsCategoriesOpen(false)
  }

  return (
    <div className="header">
      {location.pathname != "/" && (
        <div className="header-contents">
          <h1 className="header-title" onClick={onClickHome}>
            CENT
          </h1>

          {user && (
            <FontAwesomeIcon
              className="hamburger"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              icon={faBars}
            />
          )}
          {isVisable && (
            <div
              className="hamburger-container"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <ul className="hamburger-list">
                <li className="hamburger-list-item">
                  <FontAwesomeIcon className="icon" icon={faUser} />
                  View Profile
                </li>
                <li
                  className="hamburger-list-item"
                  onClick={onClickCategoriesOpen}
                >
                  <FontAwesomeIcon className="icon" icon={faFolder} />
                  Categories
                </li>
                <li
                  className="hamburger-list-item last-item"
                  onClick={onClickLogout}
                >
                  <FontAwesomeIcon className="icon" icon={faPowerOff} />
                  Log out
                </li>
              </ul>
            </div>
          )}
          {isCategoriesOpen && <Modal close={onClickCategoriesClose} />}

          {location.pathname.includes("/account/verify") && (
            <button className="btn header-btn" onClick={onClickLogin}>
              Log in
            </button>
          )}
        </div>
      )}
    </div>
  )
}
