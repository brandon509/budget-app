import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextInput from "./textInput"
import Button from "./button"
import {
  newCategory,
  updateCategory,
  deleteCategory,
} from "../features/categories/categorySlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import DropdownInput from "./dropdownInput"
import { decimalVal } from "../scripts/validation"

export default function MaintainCategories({ close }) {
  const [editCategory, setEditCategory] = useState(undefined)
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    split: "",
    budget: "",
    type: "",
  })

  const { name, split, budget, type } = categoryFormData

  const { activeCategories } = useSelector((state) => state.category)
  const { year, month } = useSelector((state) => state.post)

  const dispatch = useDispatch()

  const resetState = () => {
    setCategoryFormData((prevState) => ({
      ...prevState,
      name: "",
      split: "",
      budget: "",
      type: "",
    }))
    setEditCategory(undefined)
  }

  const closeModal = () => {
    close()
    resetState()
  }

  const onClickCategory = (e) => {
    setEditCategory(e.target.id)
    const selectedCategory = activeCategories.filter(
      (x) => x._id === e.target.id
    )[0]

    setCategoryFormData((prevState) => ({
      ...prevState,
      name: selectedCategory.name,
      split: selectedCategory.split,
      budget: selectedCategory.budget,
      type: selectedCategory.type,
    }))
  }

  const splitValidation = (num) => {
    if (num > 1 || num < 0) return ""
    if (String(num).length > 4) return String(num).slice(0, 4)

    return num
  }

  const onChange = (e) => {
    let value = +e.target.value || e.target.value

    if (e.target.name === "split") {
      value = splitValidation(value / 100)
    }

    if (e.target.name === "budget") {
      value = decimalVal(value)
    }

    setCategoryFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }))
  }

  const onSubmit = async () => {
    const userData = {
      name,
      split,
      budget,
      type,
    }

    dispatch(newCategory({ category: userData, year: year, month: month }))
    resetState()
  }

  const onSubmitUpdate = async () => {
    const userData = {
      id: editCategory,
      name,
      split,
      budget,
      type,
    }

    dispatch(updateCategory(userData))
    resetState()
  }

  const onSubmitDelete = () => {
    dispatch(deleteCategory({ id: editCategory }))

    resetState()
  }

  const categoryName = {
    label: "Name",
    type: "text",
    name: "name",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: name,
  }

  const categoryType = {
    label: "Type",
    type: "text",
    name: "type",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: type,
  }

  const categorySplit = {
    label: "Split",
    type: "number",
    name: "split",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: split * 100 || "",
  }

  const categoryBudget = {
    label: "Budget",
    type: "number",
    name: "budget",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    inputValue: budget,
  }

  return (
    <div>
      s
      <div className="modal">
        <div className="modal-content">
          <div className="left">
            <h4 className="category-header">Category</h4>
            <ul className="category-list">
              {activeCategories &&
                activeCategories.map((x, i) => (
                  <li
                    key={x._id}
                    id={x._id}
                    className={
                      x._id === editCategory
                        ? "category-list-item edit"
                        : "category-list-item"
                    }
                    onClick={onClickCategory}
                  >
                    {x.name}
                  </li>
                ))}
            </ul>
            <div className="new-category-container">
              <p className="new-category" onClick={resetState}>
                <FontAwesomeIcon icon={faPlus} /> new category
              </p>
            </div>
          </div>
          <div className="right">
            <form className="category-form">
              {!editCategory ? <h3>New Category</h3> : <h3>Update Category</h3>}
              <TextInput {...categoryName} />
              <DropdownInput
                name="type"
                state={type}
                onChange={onChange}
                options={[
                  { _id: "income", name: "Income" },
                  { _id: "expense", name: "Expense" },
                  { _id: "savings", name: "Savings" },
                  { _id: "investment", name: "Investment" },
                ]}
              />
              <TextInput {...categorySplit} />
              <TextInput {...categoryBudget} />
              <div className="category-buttons-group">
                <button
                  type="button"
                  className="btn category-button"
                  onClick={editCategory ? onSubmitUpdate : onSubmit}
                >
                  {editCategory ? "Update" : "Create"}
                </button>
                {editCategory && (
                  <button
                    type="button"
                    className="btn category-button"
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
