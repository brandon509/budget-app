import TextInput from "../components/textInput"
import { emailVal } from "../scripts/validation"
import { useState, useEffect } from "react"

export default function () {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const emailValidation = emailVal(email)

  const emailInput = {
    label: "Email",
    type: "email",
    name: "email",
    handleChange: onChange,
    inputValue: email,
    validation: emailValidation,
    errorMessage: "Input is not valid",
  }
  return (
    <div className="totalForm">
      <form className="form">
        <TextInput {...emailInput} />
      </form>
    </div>
  )
}
