import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"
import { useEffect, useState, createContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faPowerOff,
  faUser,
  faFolder,
  faDollarSign,
  faFlag,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import MaintainCategories from "../components/maintainCategories"
import MaintainInvestments from "../components/maintainInvestments"

export default function Header({ onClickNav, isUserOptions }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess, message } = useSelector((state) => state.auth)

  const [isVisable, setIsVisable] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false)

  useEffect(() => {
    if (isSuccess && !user && !message) {
      navigate("/")
      dispatch(reset())
    }
  }, [isSuccess, navigate, dispatch])

  const onClickHome = () => {
    if (user) {
      navigate(`/${user.id}/budget`)
    } else {
      navigate("/")
    }
    dispatch(reset())
  }

  const onClickLogout = () => {
    dispatch(logout())
    setIsVisable(false)
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

  const onClickInvestmentsOpen = () => {
    setIsInvestmentsOpen(true)
    setIsVisable(false)
  }

  const onClickInvestmentsClose = () => {
    setIsInvestmentsOpen(false)
  }

  const onClickProfile = () => {
    navigate(`/${user.id}/profile`)
    setIsVisable(false)
  }

  const onClickBudget = () => {
    navigate(`/${user.id}/budget`)
    setIsVisable(false)
  }

  return (
    <div>
      {location.pathname != "/" && (
        <div className="header">
          <div className="header-contents">
            <h1 className="header-title" onClick={onClickHome}>
              CENT
            </h1>

            {user && (
              <div>
                <FontAwesomeIcon
                  className="hamburger non-mobile"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  icon={faBars}
                />
                <FontAwesomeIcon
                  className="hamburger mobile"
                  onClick={() => onClickNav()}
                  icon={isUserOptions ? faX : faBars}
                />
              </div>
            )}
            {isVisable && (
              <div
                className="hamburger-container"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <ul className="hamburger-list">
                  <li
                    className="hamburger-list-item"
                    onClick={
                      location.pathname.includes("budget")
                        ? onClickProfile
                        : onClickBudget
                    }
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={
                        location.pathname.includes("budget") ? faUser : faFlag
                      }
                    />
                    {location.pathname.includes("budget")
                      ? "View Profile"
                      : "View Budget"}
                  </li>
                  <li
                    className="hamburger-list-item"
                    onClick={onClickCategoriesOpen}
                  >
                    <FontAwesomeIcon className="icon" icon={faFolder} />
                    Categories
                  </li>
                  <li
                    className="hamburger-list-item"
                    onClick={onClickInvestmentsOpen}
                  >
                    <FontAwesomeIcon className="icon" icon={faDollarSign} />
                    Investments
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
            {isCategoriesOpen && (
              <MaintainCategories close={onClickCategoriesClose} />
            )}
            {isInvestmentsOpen && (
              <MaintainInvestments close={onClickInvestmentsClose} />
            )}

            {location.pathname.includes("/account/verify") && (
              <button className="btn header-btn" onClick={onClickLogin}>
                Log in
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
