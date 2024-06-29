import { useState, useEffect, useContext } from "react"
import { getAmounts } from "../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../features/categories/categorySlice"
import { getInvestments } from "../features/investments/investmentSlice"
import CateogryLineItem from "../components/categoryLineItem"
import LinesForm from "../components/linesForm"
import Button from "../components/button"
import Summary from "../components/summary"
import Savings from "../components/savings"
import Investments from "../components/investments"
import UserOptions from "../components/userOptions"

//Feature requests
//Initals in corner instad of hamburger
//Tool tips on some inputs
//Change color of item when reseting password
//Add animation when filtering

//Bugs
//Validation fail on text input icon no space under input

//Mobile
//**Sign up button on multiple lines on sign up page
//**On budget tab, make so the whole page doesnt scroll (make it shorter)
//**Fix edit
//**Fix cancel when editing
//**Drop downs and dates have grey background
//Date picker has no place holder
//**Remove hamburger background on click
//Add hanburger click animation
//Fix layout on cat and investments page
//**Fix log out issue where budget isnt there when logging back in
//Fix how hamburger works
//can type in adj amount
//amounts, can type other things

export default function ({ isUserOptions, onClickNav }) {
  const currentDate = new Date()
  const monthOptions = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let yearOptions = []

  for (let i = 2020; i < currentDate.getFullYear() + 3; i++) {
    yearOptions.push(i)
  }

  const [month, setMonth] = useState(currentDate.getMonth())
  const [year, setYear] = useState(currentDate.getFullYear())
  const [isVisable, setIsVisable] = useState(false)
  const [isBudget, setIsBudget] = useState(true)
  const [isForm, setIsForm] = useState(false)
  const [isSummary, setIsSummary] = useState(false)
  const [isSavings, setIsSavings] = useState(false)
  const [isInvest, setIsInvest] = useState(false)
  const [item, setItem] = useState(undefined)
  const [expandAll, setExpandAll] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")

  const [screen, setScreen] = useState("budget")

  const { isError, isLoading, message, data } = useSelector(
    (state) => state.post
  )
  const { currentCategories } = useSelector((state) => state.category)
  const { mobile } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const timePeriod = { month: month, year: year }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAmounts(timePeriod))
    dispatch(getCategories(timePeriod))
    dispatch(getInvestments())
  }, [dispatch])

  const onChangeDate = (e) => {
    if (e.target.name === "month") {
      setMonth(e.target.value)
      dispatch(getCategories({ month: e.target.value, year: year }))
      dispatch(getAmounts({ month: e.target.value, year: year }))
    }
    if (e.target.name === "year") {
      setYear(e.target.value)
      dispatch(getCategories({ month: month, year: e.target.value }))
      dispatch(getAmounts({ month: month, year: e.target.value }))
    }
  }

  // const openBudget = () => {
  //   setIsVisable(true)
  //   setIsBudget(true)
  //   setIsForm(false)
  //   setIsSavings(false)
  //   setIsSummary(false)
  //   setIsInvest(false)
  //   setItem(undefined)
  // }

  // const openForm = (x) => {
  //   if (x.description) {
  //     setItem(x)
  //     if (mobile) {
  //       setIsForm(!isForm)
  //       setIsBudget(!isBudget)
  //     }
  //   }

  //   if (mobile) {
  //     setIsVisable(true)
  //     setIsForm(true)
  //     setIsSummary(false)
  //     setIsSavings(false)
  //     setIsInvest(false)
  //     setIsBudget(false)
  //   } else if (isVisable && isForm && !x.description) {
  //     setIsVisable(false)
  //     setIsForm(false)
  //     setItem(undefined)
  //   } else {
  //     setIsVisable(true)
  //     setIsForm(true)
  //     setIsSummary(false)
  //     setIsSavings(false)
  //     setIsInvest(false)
  //   }
  // }

  // const cancelForm = () => {
  //   setIsVisable(false)
  //   setIsForm(false)
  //   setItem(undefined)

  //   if (mobile) {
  //     setIsBudget(true)
  //   }
  // }

  // const openSummary = (x) => {
  //   if (mobile) {
  //     setIsVisable(true)
  //     setIsSummary(true)
  //     setIsForm(false)
  //     setIsSavings(false)
  //     setIsInvest(false)
  //     setItem(undefined)
  //     setIsBudget(false)
  //   } else if (isVisable && isSummary) {
  //     setIsVisable(false)
  //     setIsSummary(false)
  //   } else {
  //     setIsVisable(true)
  //     setIsSummary(true)
  //     setIsForm(false)
  //     setIsSavings(false)
  //     setIsInvest(false)
  //     setItem(undefined)
  //   }
  // }

  // const openSavings = (x) => {
  //   if (mobile) {
  //     setIsVisable(true)
  //     setIsSavings(true)
  //     setIsSummary(false)
  //     setIsForm(false)
  //     setIsInvest(false)
  //     setItem(undefined)
  //     setIsBudget(false)
  //   } else if (isVisable && isSavings) {
  //     setIsVisable(false)
  //     setIsSavings(false)
  //   } else {
  //     setIsVisable(true)
  //     setIsSavings(true)
  //     setIsSummary(false)
  //     setIsForm(false)
  //     setIsInvest(false)
  //     setItem(undefined)
  //   }
  // }

  // const openInvest = (x) => {
  //   if (mobile) {
  //     setIsVisable(true)
  //     setIsInvest(true)
  //     setIsSummary(false)
  //     setIsForm(false)
  //     setIsSavings(false)
  //     setItem(undefined)
  //     setIsBudget(false)
  //   } else if (isVisable && isInvest) {
  //     setIsVisable(false)
  //     setIsInvest(false)
  //   } else {
  //     setIsVisable(true)
  //     setIsInvest(true)
  //     setIsSummary(false)
  //     setIsForm(false)
  //     setIsSavings(false)
  //     setItem(undefined)
  //   }
  // }

  const openBudget = () => {
    setScreen("budget")
    setItem(undefined)
  }

  const openForm = (x) => {
    if (x.description) {
      setItem(x)
    }
    if (!mobile && screen == "form") {
      setScreen("budget")
    } else {
      setScreen("form")
    }
  }

  const cancelForm = () => {
    setScreen("budget")
    setItem(undefined)
  }

  const openSummary = (x) => {
    if (!mobile && screen == "summary") {
      setScreen("budget")
    } else {
      setScreen("summary")
    }
    setItem(undefined)
  }

  const openSavings = (x) => {
    if (!mobile && screen == "savings") {
      setScreen("budget")
    } else {
      setScreen("savings")
    }
    setItem(undefined)
  }

  const openInvest = (x) => {
    if (!mobile && screen == "invest") {
      setScreen("budget")
    } else {
      setScreen("invest")
    }
    setItem(undefined)
  }

  const expandAllOnClick = () => {
    setExpandAll((prev) => !prev)
  }

  const categoryFilterOnClick = (e) => {
    setCategoryFilter(e.target.name)
  }

  return (
    <div
      className={screen != "budget" ? "main-body main-body-small" : "main-body"}
    >
      <div className="nav-buttons">
        {/* <Button
          click={openForm}
          item="new"
          className={isForm ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
        <Button
          click={openSummary}
          item="group"
          className={isSummary ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
        <Button
          click={openSavings}
          item="savings"
          className={isSavings ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
        <Button
          click={openInvest}
          item="invest"
          className={isInvest ? "nav-btn nav-btn-clicked" : "nav-btn"}
        /> */}
        <Button
          click={openForm}
          item="new"
          className={screen == "form" ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
        <Button
          click={openSummary}
          item="group"
          className={
            screen == "summary" ? "nav-btn nav-btn-clicked" : "nav-btn"
          }
        />
        <Button
          click={openSavings}
          item="savings"
          className={
            screen == "savings" ? "nav-btn nav-btn-clicked" : "nav-btn"
          }
        />
        <Button
          click={openInvest}
          item="invest"
          className={screen == "invest" ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
      </div>
      {screen != "budget" && (
        <div className="popout">
          {/* {isForm && <LinesForm close={cancelForm} lineItem={item} />}
          {isSummary && <Summary />}
          {isSavings && <Savings />}
          {isInvest && <Investments />} */}
          {screen == "form" && <LinesForm close={cancelForm} lineItem={item} />}
          {screen == "summary" && <Summary />}
          {screen == "savings" && <Savings />}
          {screen == "invest" && <Investments />}
        </div>
      )}
      <div
        className={
          screen != "budget"
            ? "main-section category-lines-small"
            : "main-section"
        }
      >
        {!isUserOptions && (
          <div className="top-section">
            <ul className="nav-list">
              {/* <li
                onClick={openBudget}
                className={isBudget ? "nav-list-clicked" : undefined}
              >
                Budget
              </li>
              <li
                onClick={openForm}
                className={isForm ? "nav-list-clicked" : undefined}
              >
                New
              </li>
              <li
                onClick={openSummary}
                className={isSummary ? "nav-list-clicked" : undefined}
              >
                Summary
              </li>
              <li
                onClick={openSavings}
                className={isSavings ? "nav-list-clicked" : undefined}
              >
                Savings
              </li>
              <li
                onClick={openInvest}
                className={isInvest ? "nav-list-clicked" : undefined}
              >
                Investments
              </li> */}
              <li
                onClick={openBudget}
                className={screen == "budget" ? "nav-list-clicked" : undefined}
              >
                Budget
              </li>
              <li
                onClick={openForm}
                className={screen == "form" ? "nav-list-clicked" : undefined}
              >
                New
              </li>
              <li
                onClick={openSummary}
                className={screen == "summary" ? "nav-list-clicked" : undefined}
              >
                Summary
              </li>
              <li
                onClick={openSavings}
                className={screen == "savings" ? "nav-list-clicked" : undefined}
              >
                Savings
              </li>
              <li
                onClick={openInvest}
                className={screen == "invest" ? "nav-list-clicked" : undefined}
              >
                Investments
              </li>
            </ul>
            <form className="date-input-form">
              <select
                name="month"
                defaultValue={month}
                onChange={onChangeDate}
                className="date-input input"
              >
                {monthOptions.map((x, i) => (
                  <option key={i} value={i}>
                    {x}
                  </option>
                ))}
              </select>
              <select
                name="year"
                defaultValue={year}
                onChange={onChangeDate}
                className="date-input input"
              >
                {yearOptions.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </form>
            {isBudget && !isUserOptions && (
              <div className="collapse-filter-section">
                <div className="filter-section">
                  <button
                    onClick={categoryFilterOnClick}
                    className={
                      categoryFilter === "all" ? "hidden" : "btn clear-filters"
                    }
                    name="all"
                  >
                    x
                  </button>
                  <button
                    name="expense"
                    onClick={categoryFilterOnClick}
                    className={
                      categoryFilter === "expense"
                        ? "btn cat-btn cat-btn-selected"
                        : categoryFilter === "all"
                        ? "btn cat-btn cat-btn-unselected"
                        : "hidden"
                    }
                  >
                    Expenses
                  </button>
                  <button
                    name="savings"
                    onClick={categoryFilterOnClick}
                    className={
                      categoryFilter === "savings"
                        ? "btn cat-btn cat-btn-selected"
                        : categoryFilter === "all"
                        ? "btn cat-btn cat-btn-unselected"
                        : "hidden"
                    }
                  >
                    Savings
                  </button>
                  <button
                    name="investment"
                    onClick={categoryFilterOnClick}
                    className={
                      categoryFilter === "investment"
                        ? "btn cat-btn cat-btn-selected"
                        : categoryFilter === "all"
                        ? "btn cat-btn cat-btn-unselected"
                        : "hidden"
                    }
                  >
                    Investments
                  </button>
                  <button
                    name="income"
                    onClick={categoryFilterOnClick}
                    className={
                      categoryFilter === "income"
                        ? "btn cat-btn cat-btn-selected"
                        : categoryFilter === "all"
                        ? "btn cat-btn cat-btn-unselected"
                        : "hidden"
                    }
                  >
                    Income
                  </button>
                </div>
                <button onClick={expandAllOnClick} className="expand-collapse">
                  {expandAll ? "- Collapse" : "+ Expand"}
                </button>
              </div>
            )}
          </div>
        )}
        {!isUserOptions && (
          <div className="categories">
            {(screen == "budget" || !mobile) && (
              <div>
                {currentCategories && categoryFilter === "all"
                  ? currentCategories.map((x) => (
                      <CateogryLineItem
                        key={x._id}
                        category={x}
                        data={data.filter((y) => y.category._id === x._id)}
                        edit={openForm}
                        expandAll={expandAll}
                      />
                    ))
                  : currentCategories
                      .filter((x) => x.type === categoryFilter)
                      .map((x) => (
                        <CateogryLineItem
                          key={x._id}
                          category={x}
                          data={data.filter((y) => y.category._id === x._id)}
                          edit={openForm}
                          expandAll={expandAll}
                        />
                      ))}
              </div>
            )}
            {/* {isBudget && (
              <div>
                {currentCategories && categoryFilter === "all"
                  ? currentCategories.map((x) => (
                      <CateogryLineItem
                        key={x._id}
                        category={x}
                        data={data.filter((y) => y.category._id === x._id)}
                        edit={openForm}
                        expandAll={expandAll}
                      />
                    ))
                  : currentCategories
                      .filter((x) => x.type === categoryFilter)
                      .map((x) => (
                        <CateogryLineItem
                          key={x._id}
                          category={x}
                          data={data.filter((y) => y.category._id === x._id)}
                          edit={openForm}
                          expandAll={expandAll}
                        />
                      ))}
              </div>
            )} */}
            <div className="mobile">
              {/* {isForm && <LinesForm close={cancelForm} lineItem={item} />}
              {isSummary && <Summary />}
              {isSavings && <Savings />}
              {isInvest && <Investments />} */}
              {screen == "form" && (
                <LinesForm close={cancelForm} lineItem={item} />
              )}
              {screen == "summary" && <Summary />}
              {screen == "savings" && <Savings />}
              {screen == "invest" && <Investments />}
            </div>
          </div>
        )}
        {isUserOptions && <UserOptions onClickNav={onClickNav} />}
      </div>
    </div>
  )
}
