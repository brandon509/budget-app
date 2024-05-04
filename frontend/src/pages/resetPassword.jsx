import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset, resetPassword } from "../features/auth/authSlice"
import TextInput from "../components/textInput"
import { passwordVal, confirmPasswordVal } from "../scripts/validation"

export default function passwordReset() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const { password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const { isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      setError("Reset link invalid")
    }

    if (isSuccess) {
      navigate("/account/login")
    }
    dispatch(reset())
  }, [isError, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      password,
      confirmPassword,
      ident: params.ident,
      timeStamp: params.timeStamp,
      hash: params.hash,
    }

    dispatch(resetPassword(data))
  }

  const passwordValidation = passwordVal(password)
  const confirmPasswordValidation = confirmPasswordVal(
    password,
    confirmPassword
  )

  const passwordInput = {
    label: "Password",
    type: "password",
    name: "password",
    handleChange: onChange,
    inputValue: password,
    validation: passwordValidation,
    errorMessage: "Input is not valid",
  }

  const confirmPasswordInput = {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    handleChange: onChange,
    inputValue: confirmPassword,
    validation: confirmPasswordValidation,
    errorMessage: "Passwords do not match",
  }

  return (
    <div className="sign-up-page-layout">
      <div className="total-form">
        <h2 className="sign-up-title">Reset password</h2>
        {error && <p className="error signup-error">{error}</p>}
        <form onSubmit={onSubmit} noValidate={true} className="form">
          <TextInput {...passwordInput} />
          <TextInput {...confirmPasswordInput} />
          <button
            type="submit"
            className="btn"
            disabled={!passwordValidation || !confirmPasswordValidation}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  )
}
