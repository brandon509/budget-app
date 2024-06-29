import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextInput from "./textInput"
import Button from "./button"
import {
  newInvestment,
  updateInvestment,
  deleteInvestment,
} from "../features/investments/investmentSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import DropdownInput from "./dropdownInput"

export default function MaintainInvestments({ close }) {
  const [editInvestment, setEditInvestment] = useState(undefined)
  const [investmentFormData, setInvestmentFormData] = useState({
    ticker: "",
    percentage: "",
    investmentType: "",
  })

  const { ticker, percentage, investmentType } = investmentFormData

  const { investments } = useSelector((state) => state.investment)
  const { activeCategories } = useSelector((state) => state.category)

  const dispatch = useDispatch()

  const resetState = () => {
    setInvestmentFormData((prevState) => ({
      ...prevState,
      ticker: "",
      percentage: "",
      investmentType: "",
    }))
    setEditInvestment(undefined)
  }

  const closeModal = () => {
    close()
    resetState()
  }

  const onClickInvestment = (e) => {
    setEditInvestment(e.target.id)
    const selectedInvestment = investments.filter(
      (x) => x._id === e.target.id
    )[0]

    setInvestmentFormData((prevState) => ({
      ...prevState,
      ticker: selectedInvestment.ticker,
      percentage: selectedInvestment.percentage,
      investmentType: selectedInvestment.investmentType._id,
    }))
  }

  const splitValidation = (num) => {
    if (num > 1 || num < 0) return ""

    return num
  }

  const onChange = (e) => {
    let value = +e.target.value || e.target.value

    if (e.target.name === "percentage") {
      value = splitValidation(value / 100)
    }

    setInvestmentFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }))
  }

  const onSubmit = async () => {
    const userData = {
      ticker,
      percentage,
      investmentType,
    }

    dispatch(newInvestment({ investment: userData }))
    resetState()
  }

  const onSubmitUpdate = async () => {
    const userData = {
      id: editInvestment,
      ticker,
      percentage,
      investmentType,
    }

    dispatch(updateInvestment(userData))
    resetState()
  }

  const onSubmitDelete = () => {
    dispatch(deleteInvestment({ id: editInvestment }))
    resetState()
  }

  const investmentTicker = {
    label: "Ticker",
    type: "text",
    name: "ticker",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: ticker,
  }

  const investmentPercentage = {
    label: "Percentage",
    type: "text",
    name: "percentage",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: percentage * 100 || "",
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <Button
            click={closeModal}
            item="back"
            className="back-btn close-btn"
          />
          <div className="left">
            <h4 className="label-header">Investments</h4>
            <ul className="item-list">
              {investments &&
                investments.map((x) => (
                  <li
                    key={x._id}
                    id={x._id}
                    className={
                      x._id === editInvestment ? "list-item edit" : "list-item"
                    }
                    onClick={onClickInvestment}
                  >
                    {x.ticker}
                  </li>
                ))}
            </ul>
            <div className="new-item-container">
              <p className="new-item" onClick={resetState}>
                <FontAwesomeIcon icon={faPlus} /> new ticker
              </p>
            </div>
          </div>
          <div className="right">
            <form className="item-form">
              {!editInvestment ? <h3>New Ticker</h3> : <h3>Update Ticker</h3>}
              <TextInput {...investmentTicker} />
              <TextInput {...investmentPercentage} />
              <DropdownInput
                name="investmentType"
                state={investmentType}
                onChange={onChange}
                options={activeCategories.filter(
                  (x) => x.type === "investment"
                )}
              />
              <div className="buttons-group">
                <button
                  type="button"
                  className="btn item-button"
                  onClick={editInvestment ? onSubmitUpdate : onSubmit}
                >
                  {editInvestment ? "Update" : "Create"}
                </button>
                {editInvestment && (
                  <button
                    type="button"
                    className="btn item-button"
                    onClick={onSubmitDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
            <Button
              click={closeModal}
              item="x"
              className="close-btn modal-close"
            />
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  )
}
