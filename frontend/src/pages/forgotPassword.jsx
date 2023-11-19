import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, resetPasswordRequest } from '../features/auth/authSlice'
import TextInput from '../components/textInput'
import { emailVal } from '../scripts/validation'

export default function ForgotPassword(){

    const [email,setEmail] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isError, isSuccess, message, user } = useSelector((state) => state.auth)

    useEffect(() => {        
        if(isError){
            console.log(message)
        }
        if(isSuccess){
            setSuccessMessage(message)
        }
        if(user){
            navigate(`/${user.id}`)
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])

    const onChange = (e) => {
       setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(resetPasswordRequest({ email: email }))
    }

    const emailValidation = emailVal(email)

    const onClick = () => {
        navigate('/')
    }

    const emailInput = {
        label: "Email",
        type: "email",
        name: "email",
        handleChange: onChange,
        inputValue: email,
        validation: emailValidation,
        errorMessage: 'Input is not valid'
    }

    return(
        <div className='signUpPageLayout'>
            <div className='totalForm'>
                <h2 className='signUpTitle'>Reset password</h2>
                {!successMessage && <p className='resetPasswordInstructions'>To reset your password, enter your email below. If an account associated with that email exists an email will be sent with instructions to reset your password.</p>}
                {successMessage && <div>
                    <p className='messageWrap'>{successMessage}</p>
                    <button className='btn' onClick={onClick}>Home</button>
                </div>}
                {!successMessage && <form onSubmit={onSubmit} noValidate={true} className="form">
                    <TextInput {...emailInput} />
                    <button type="submit" className="btn" disabled={!emailValidation}>Reset</button>
                </form>}
            </div>
        </div>
    )
}