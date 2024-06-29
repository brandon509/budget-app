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
} from "@fortawesome/free-solid-svg-icons"
import MaintainCategories from "../components/maintainCategories"
import MaintainInvestments from "../components/maintainInvestments"

export default function UserOptions({ categories, investments, onClickNav }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess, message } = useSelector((state) => state.auth)

  const [isVisable, setIsVisable] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false)

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

  const onClickLogout = () => {
    dispatch(logout())
    onClickNav()
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
      {!isCategoriesOpen && !isInvestmentsOpen && (
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
              icon={location.pathname.includes("budget") ? faUser : faFlag}
            />
            {location.pathname.includes("budget")
              ? "View Profile"
              : "View Budget"}
          </li>
          <li className="hamburger-list-item" onClick={onClickCategoriesOpen}>
            <FontAwesomeIcon className="icon" icon={faFolder} />
            Categories
          </li>
          <li className="hamburger-list-item" onClick={onClickInvestmentsOpen}>
            <FontAwesomeIcon className="icon" icon={faDollarSign} />
            Investments
          </li>
          <li className="hamburger-list-item last-item" onClick={onClickLogout}>
            <FontAwesomeIcon className="icon" icon={faPowerOff} />
            Log out
          </li>
        </ul>
      )}
      {isCategoriesOpen && (
        <MaintainCategories close={onClickCategoriesClose} />
      )}
      {isInvestmentsOpen && (
        <MaintainInvestments close={onClickInvestmentsClose} />
      )}
    </div>
  )
}
