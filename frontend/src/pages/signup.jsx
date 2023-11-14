import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'
import TextInput from '../components/textInput'
import { emptyInputVal, emailVal, passwordVal, confirmPasswordVal } from '../scripts/validation'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')
    
    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setError("Account already exists.")
        }
        dispatch(reset())
    }, [user, isError, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
            password,
            confirmPassword
        }
        
        dispatch(signup(userData))
    }  

    const onClick = () => {
        navigate('/account/login')
    }

    const nameValidation = emptyInputVal(name)
    const emailValidation = emailVal(email)
    const passwordValidation = passwordVal(password)
    const confirmPasswordValidation = confirmPasswordVal(password, confirmPassword)

    const nameInput = {
        label: "Name",
        type: "text",
        name: "name",
        handleChange: onChange,
        inputValue: name,
        validation: nameValidation,
        errorMessage: 'Input is not valid'
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

    const passwordInput = {
        label: "Password",
        type: "password",
        name: "password",
        handleChange: onChange,
        inputValue: password,
        validation: passwordValidation,
        errorMessage: 'Input is not valid'
    }

    const confirmPasswordInput = {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        handleChange: onChange,
        inputValue: confirmPassword,
        validation: confirmPasswordValidation,
        errorMessage: 'Passwords do not match'
    }

    return(
        <div className='signUpPageLayout'>
            <div className='totalForm'>
                <h2 className='signUpTitle'>Sign up for Cent</h2>
                {error && <p className='error signupError'>{error}</p>}
                <form onSubmit={onSubmit} noValidate={true} className="form">
                    <TextInput {...nameInput} />
                    <TextInput {...emailInput} />
                    <TextInput {...passwordInput} />
                    <TextInput {...confirmPasswordInput} />
                    <button type="submit" className="btn" disabled={!nameValidation || !emailValidation || !passwordValidation || !confirmPasswordValidation}>Sign up</button>
                    <p className='formBottom'>Already have an account? <span className='link' onClick={onClick}>Log in</span></p>
                </form>
            </div>
        </div>
    )
}