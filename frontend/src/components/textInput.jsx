import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function TextInput({ label, type, name, supporting, handleChange, inputValue, validation, errorMessage, className, defaultValue }){

    const [labelVisable, setLabelVisable] = useState(false)
    const [passValidation, setPassValidation] = useState(true)

    useEffect(() => {
        setLabelVisable(false)
        
    }, [handleChange])

    const onFocus = () => {
        setLabelVisable(true)
    }

    const onBlur = () => {
        if(!inputValue){
            setLabelVisable(false)
        }

        setPassValidation(validation)
    }

    return (
            <div className="inputParent">
                {(labelVisable || (inputValue)) && <h5 className = {!passValidation ? "inputLabel inputError" : "inputLabel"}>{label}</h5>}
                <input 
                    type={type} 
                    placeholder={!labelVisable ? label: undefined} 
                    name={name} 
                    className={!passValidation ? `input enabledInputError ${className}` : `input ${className}`} 
                    onFocus={onFocus} 
                    onBlur={onBlur} 
                    onChange={handleChange}
                    value={inputValue}
                    defaultValue={defaultValue}>
                </input>
                {!passValidation && <FontAwesomeIcon icon={faCircleExclamation} className="errorIcon inputError" />}
                <p className={!passValidation ? "support inputError" : "support"}>{!passValidation ? errorMessage : supporting}</p>
            </div>
    )
}