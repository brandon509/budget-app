import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import TextInput from '../components/textInput'

export default function ForgotPassword(){

    const [email,setEmail] = useState('')
    const [emailVal, setEmailVal] = useState(false)

    const onChange = (e) => {
       setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const emailValidation = () => {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailVal(false)
            return false
        }
        setEmailVal(true)
        return true
    }

    return(
        <div className='signUpPageLayout'>
            <div className='totalForm'>
                <h2 className='signUpTitle'>Reset password</h2>
                <p className='resetPasswordInstructions'>To reset your password, enter your email below. If an account associated with that email exists an email will be sent with instruction to reset your password.</p>
                <form onSubmit={onSubmit} noValidate={true} className="form">
                    <TextInput label="Email" type="email" name="email" handleChange={onChange} inputValue={email} validation={emailValidation} errorMessage="Input is not valid"/>
                    <button type="submit" className="btn" disabled={!email}>Reset</button>
                </form>
            </div>
        </div>
    )
}