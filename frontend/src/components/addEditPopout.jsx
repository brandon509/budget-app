import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { newAmount, updateAmount } from "../features/posts/postSlice"
import TextInput from "./textInput"
import CateogryInput from "./categoryInput"

export default function AddEditPopout({ lineItem, close }) {
  const [split, setSplit] = useState(0)
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    dateIncurred: "",
  })

  const { description, category, amount, dateIncurred } = formData

  const { activeCategories } = useSelector((state) => state.category)

  const dispatch = useDispatch()

  useEffect(() => {
    if (lineItem) {
      setFormData((prevState) => ({
        ...prevState,
        description: lineItem.description,
        category: lineItem.category._id,
        amount: lineItem.amount,
        dateIncurred: lineItem.dateIncurred.slice(0, 10),
      }))
      setSplit(lineItem.category.split)
    }
  }, [lineItem])

  const resetState = () => {
    setFormData((prevState) => ({
      ...prevState,
      description: "",
      category: "",
      amount: "",
      dateIncurred: "",
    }))
    setSplit(0)
  }

  const onChange = (e) => {
    let value = +e.target.value || e.target.value

    if (e.target.name === "category" && e.target.value) {
      const category = activeCategories.filter((x) => x._id === e.target.value)
      setSplit(category[0].split)
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }))
  }

  const onSubmit = async () => {
    const userData = {
      description,
      category,
      amount,
      adjAmount: amount * split,
      dateIncurred,
    }

    dispatch(newAmount(userData))
    resetState()
  }

  const onSubmitEdit = async () => {
    const userData = {
      id: lineItem._id,
      description,
      category,
      amount,
      adjAmount: amount * split,
      dateIncurred,
    }

    dispatch(updateAmount(userData))
    resetState()
    close()
  }

  const descriptionInput = {
    label: "Description",
    type: "text",
    name: "description",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: "ln-item-input",
    inputValue: description,
  }

  const amountInput = {
    label: "Amount",
    type: "number",
    name: "amount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: "ln-item-input",
    inputValue: amount,
  }

  const adjAmountInput = {
    label: "Adjusted Amount",
    type: "number",
    name: "adjAmount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: "ln-item-input",
    inputValue: amount * split || amount,
  }

  const dateIncurredInput = {
    label: "Date",
    type: "date",
    name: "dateIncurred",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: "ln-item-input",
    inputValue: dateIncurred,
  }

  return (
    <div>
      <form className="popout-form">
        <TextInput {...descriptionInput} />
        <CateogryInput
          category={category}
          onChange={onChange}
          options={activeCategories}
        />
        <TextInput {...amountInput} />
        <TextInput {...adjAmountInput} />
        <TextInput {...dateIncurredInput} />
        <div className="popout-form-btns">
          <button
            type="button"
            onClick={!lineItem ? onSubmit : onSubmitEdit}
            className={lineItem ? "btn submit-btn" : "btn big-submit-btn"}
          >
            Save
          </button>
          {lineItem && (
            <button type="button" onClick={close} className="btn cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
