import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function TextInput({
  label,
  type,
  name,
  supporting,
  handleChange,
  inputValue,
  validation,
  errorMessage,
  id,
  inputMode,
  readonly,
}) {
  const [labelVisable, setLabelVisable] = useState(false)
  const [passValidation, setPassValidation] = useState(true)

  useEffect(() => {
    setLabelVisable(false)
  }, [handleChange])

  const onFocus = () => {
    setLabelVisable(true)
  }

  const onBlur = () => {
    if (!inputValue) {
      setLabelVisable(false)
    }

    setPassValidation(validation)
  }

  return (
    <div className="input-parent">
      {(labelVisable || inputValue) && (
        <h5
          className={
            !passValidation ? "input-label input-error" : "input-label"
          }
        >
          {label}
        </h5>
      )}
      <input
        type={type}
        placeholder={!labelVisable ? label : undefined}
        name={name}
        className={!passValidation ? `input enabled-input-error` : `input`}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={inputValue}
        autoComplete="off"
        inputMode={inputMode || null}
        readOnly={readonly || null}
      ></input>
      {!passValidation && (
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="error-icon input-error"
        />
      )}
      <p className={!passValidation ? "support input-error" : "support"}>
        {!passValidation ? errorMessage : supporting}
      </p>
    </div>
  )
}
