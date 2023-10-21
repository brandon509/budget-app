import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function TextInput({ label, type, supporting, handleChange, inputValue, validation, errorMessage }){

    const [labelVisable, setLabelVisable] = useState(false)
    const [passValidation, setPassValidation] = useState(true)

    const onFocus = () => {
        setLabelVisable(true)
    }

    const onBlur = () => {
        if(!inputValue){
            setLabelVisable(false)
        }

        setPassValidation(validation())
    }

    return (
            <div className="inputParent">
                {labelVisable && <h5 className = {!passValidation ? "inputLabel inputError" : "inputLabel"}>{label}</h5>}
                <input 
                    type={type} 
                    placeholder={!labelVisable ? label: undefined} 
                    name={type} 
                    className={!passValidation ? "input enabledInputError" : "input"} 
                    onFocus={onFocus} 
                    onBlur={onBlur} 
                    onChange={handleChange}>
                </input>
                {!passValidation && <FontAwesomeIcon icon={faCircleExclamation} className="errorIcon inputError" />}
                <p className={!passValidation ? "support inputError" : "support"}>{!passValidation ? errorMessage : supporting}</p>
            </div>
    )
}