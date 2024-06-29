import TextInput from "../components/textInput"
import {
  emailVal,
  emptyInputVal,
  passwordVal,
  confirmPasswordVal,
} from "../scripts/validation"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateProfile, changePassword } from "../features/auth/authSlice"

export default function () {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const { name, email, password, newPassword, confirmNewPassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitProfile = async (e) => {
    e.preventDefault()

    if (
      emptyInputVal(password) &&
      passwordVal(newPassword) &&
      confirmPasswordVal(newPassword, confirmNewPassword)
    ) {
      const userPassword = {
        password,
        newPassword,
        confirmNewPassword,
      }

      dispatch(changePassword(userPassword))
    }

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
    validation: true,
    errorMessage: "Input is not valid",
  }

  const newPasswordInput = {
    label: "New Password",
    type: "password",
    name: "newPassword",
    handleChange: onChange,
    inputValue: newPassword,
    validation: !newPassword ? true : passwordVal(newPassword),
    errorMessage: "Input is not valid",
  }

  const confirmNewPasswordInput = {
    label: "Confirm New Password",
    type: "password",
    name: "confirmNewPassword",
    handleChange: onChange,
    inputValue: confirmNewPassword,
    validation: confirmPasswordVal(newPassword, confirmNewPassword),
    errorMessage: "Passwords do not match",
  }

  return (
    <div className="main-body">
      <div className="main-section profile-section">
        <h2 className="profile-update-title">Update Profile</h2>
        <form className="form">
          <div>
            <TextInput {...nameInput} />
            <TextInput {...newPasswordInput} />
            <button
              onClick={onSubmitProfile}
              className="profile-update-btn btn"
            >
              Update Profile
            </button>
          </div>
          <div>
            <TextInput {...emailInput} />
            <TextInput {...confirmNewPasswordInput} />
          </div>
          <TextInput {...passwordInput} />
        </form>
      </div>
    </div>
  )
}
