import { useState, useEffect } from "react"
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

//Feature requests
//Initals in corner instad of hamburger
//Tool tips on some inputs
//In cat modal lock "Category" tilte when scrolling

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
  const [isVisable, setIsVisable] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [isSummary, setIsSummary] = useState(false)
  const [isSavings, setIsSavings] = useState(false)
  const [isInvest, setIsInvest] = useState(false)
  const [item, setItem] = useState(undefined)
  const [expandAll, setExpandAll] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")

  const { isError, isLoading, message, data } = useSelector(
    (state) => state.post
  )
  const { currentCategories } = useSelector((state) => state.category)

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

  const openForm = (x) => {
    if (x.description) setItem(x)

    if (isVisable && isForm && !x.description) {
      setIsVisable(false)
      setIsForm(false)
      setItem(undefined)
    } else {
      setIsVisable(true)
      setIsForm(true)
      setIsSummary(false)
      setIsSavings(false)
      setIsInvest(false)
    }
  }

  const openSummary = () => {
    if (isVisable && isSummary) {
      setIsVisable(false)
      setIsSummary(false)
    } else {
      setIsVisable(true)
      setIsSummary(true)
      setIsForm(false)
      setIsSavings(false)
      setIsInvest(false)
      setItem(undefined)
    }
  }

  const openSavings = () => {
    if (isVisable && isSavings) {
      setIsVisable(false)
      setIsSavings(false)
    } else {
      setIsVisable(true)
      setIsSavings(true)
      setIsSummary(false)
      setIsForm(false)
      setIsInvest(false)
      setItem(undefined)
    }
  }

  const openInvest = () => {
    if (isVisable && isInvest) {
      setIsVisable(false)
      setIsInvest(false)
    } else {
      setIsVisable(true)
      setIsInvest(true)
      setIsSummary(false)
      setIsForm(false)
      setIsSavings(false)
      setItem(undefined)
    }
  }

  const expandAllOnClick = () => {
    setExpandAll((prev) => !prev)
  }

  const categoryFilterOnClick = (e) => {
    setCategoryFilter(e.target.name)
  }

  return (
    <div className={isVisable ? "main-body main-body-small" : "main-body"}>
      <div className="nav-buttons">
        <Button
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
        />
      </div>
      {isVisable && (
        <div className="popout">
          {isForm && <LinesForm close={openForm} lineItem={item} />}
          {isSummary && <Summary />}
          {isSavings && <Savings />}
          {isInvest && <Investments />}
        </div>
      )}
      <div
        className={
          isVisable ? "category-lines category-lines-small" : "category-lines"
        }
      >
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
        <div className="collapse-filter-section">
          <div className="filter-section">
            <button
              onClick={categoryFilterOnClick}
              className="btn clear-filters"
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
        <div className="categories">
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
      </div>
    </div>
  )
}
