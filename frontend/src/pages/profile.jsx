import TextInput from "../components/textInput"
import {
  emailVal,
  emptyInputVal,
  passwordVal,
  confirmPasswordVal,
} from "../scripts/validation"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateProfile } from "../features/auth/authSlice"

export default function () {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
  })

  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitProfile = async (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
    }

    dispatch(updateProfile(userData))
  }

  const nameInput = {
    label: "Name",
    type: "name",
    name: "name",
    handleChange: onChange,
    inputValue: name,
    validation: emptyInputVal(name),
    errorMessage: "Input is not valid",
  }

  const emailInput = {
    label: "Email",
    type: "email",
    name: "email",
    handleChange: onChange,
    inputValue: email,
    validation: emailVal(email),
    errorMessage: "Input is not valid",
  }

  const passwordInput = {
    label: "Password",
    type: "password",
    name: "password",
    handleChange: onChange,
    inputValue: password,
    validation: passwordVal(password),
    errorMessage: "Input is not valid",
  }

  const confirmPasswordInput = {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    handleChange: onChange,
    inputValue: confirmPassword,
    validation: confirmPasswordVal(password, confirmPassword),
    errorMessage: "Passwords do not match",
  }

  return (
    <div className="main-body">
      <div className="category-lines test">
        <form className="form">
          <TextInput {...nameInput} />
          <TextInput {...emailInput} />
          <TextInput {...passwordInput} />
          <TextInput {...passwordInput} />
          <TextInput {...confirmPasswordInput} />
        </form>
        <button onClick={onSubmitProfile}>Click me</button>
      </div>
    </div>
  )
}
