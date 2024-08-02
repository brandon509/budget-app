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
  faDollarSign,
  faFlag,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import MaintainCategories from "../components/maintainCategories"
import MaintainInvestments from "../components/maintainInvestments"

export default function Header() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess, message, mobile } = useSelector(
    (state) => state.auth
  )

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

  const menu = () => {
    setIsVisable(!isVisable)
  }

  const onClickCategories = () => {
    if (mobile) {
      navigate(`/${user.id}/categories`)
    } else {
      setIsCategoriesOpen(!isCategoriesOpen)
    }

    setIsVisable(false)
  }

  const onClickInvestments = () => {
    if (mobile) {
      navigate(`/${user.id}/investments`)
    } else {
      setIsInvestmentsOpen(!isInvestmentsOpen)
    }

    setIsVisable(false)
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
                  className="hamburger"
                  onMouseEnter={!mobile ? onMouseEnter : null}
                  onMouseLeave={!mobile ? onMouseLeave : null}
                  onClick={mobile ? menu : null}
                  icon={faBars}
                />
              </div>
            )}
            {isVisable && (
              <div
                className="hamburger-container"
                onMouseEnter={!mobile ? onMouseEnter : null}
                onMouseLeave={!mobile ? onMouseLeave : null}
              >
                <ul className="hamburger-list">
                  {!mobile ? (
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
                  ) : (
                    <li
                      className="hamburger-list-item"
                      onClick={onClickProfile}
                    >
                      <FontAwesomeIcon className="icon" icon={faUser} />
                      View Profile
                    </li>
                  )}
                  <li
                    className="hamburger-list-item"
                    onClick={onClickCategories}
                  >
                    <FontAwesomeIcon className="icon" icon={faFolder} />
                    Categories
                  </li>
                  <li
                    className="hamburger-list-item"
                    onClick={onClickInvestments}
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
              <MaintainCategories close={onClickCategories} />
            )}
            {isInvestmentsOpen && (
              <MaintainInvestments close={onClickInvestments} />
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
