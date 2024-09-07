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

export default function () {
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

  const screenTypeChange = (type, x) => {
    if (!mobile && screen == type && !x) {
      setScreen("budget")
    } else {
      setScreen(type)
    }

    if (x) {
      setItem(x)
    } else {
      setItem(undefined)
    }
  }

  const cancelForm = () => {
    setScreen("budget")
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
        <Button
          click={() => screenTypeChange("form")}
          item="new"
          className={screen == "form" ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
        <Button
          click={() => screenTypeChange("summary")}
          item="group"
          className={
            screen == "summary" ? "nav-btn nav-btn-clicked" : "nav-btn"
          }
        />
        <Button
          click={() => screenTypeChange("savings")}
          item="savings"
          className={
            screen == "savings" ? "nav-btn nav-btn-clicked" : "nav-btn"
          }
        />
        <Button
          click={() => screenTypeChange("invest")}
          item="invest"
          className={screen == "invest" ? "nav-btn nav-btn-clicked" : "nav-btn"}
        />
      </div>
      {screen != "budget" && (
        <div className="popout">
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
        <div className="top-section">
          <ul className="nav-list">
            <li
              onClick={() => screenTypeChange("budget")}
              className={screen == "budget" ? "nav-list-clicked" : undefined}
            >
              Budget
            </li>
            <li
              onClick={() => screenTypeChange("form")}
              className={screen == "form" ? "nav-list-clicked" : undefined}
            >
              New
            </li>
            <li
              onClick={() => screenTypeChange("summary")}
              className={screen == "summary" ? "nav-list-clicked" : undefined}
            >
              Summary
            </li>
            <li
              onClick={() => screenTypeChange("savings")}
              className={screen == "savings" ? "nav-list-clicked" : undefined}
            >
              Savings
            </li>
            <li
              onClick={() => screenTypeChange("invest")}
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
          {(screen == "budget" || !mobile) && (
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
        <div className="categories">
          {(screen == "budget" || !mobile) && (
            <div>
              {currentCategories && categoryFilter === "all"
                ? currentCategories.map((x) => (
                    <CateogryLineItem
                      key={x._id}
                      category={x}
                      data={data.filter((y) => y.category._id === x._id)}
                      edit={screenTypeChange}
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
                        edit={screenTypeChange}
                        expandAll={expandAll}
                      />
                    ))}
            </div>
          )}
          {mobile && (
            <div>
              {screen == "form" && (
                <LinesForm close={cancelForm} lineItem={item} />
              )}
              {screen == "summary" && <Summary />}
              {screen == "savings" && <Savings />}
              {screen == "invest" && <Investments />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
