import TextInput from '../components/textInput'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import { emailVal, emptyInputVal } from '../scripts/validation'

export default function Home(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState(null)
    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {        
        if(isError){
            if(message.includes("400")){
                setError("Email not verified.")
            }
            else{
                setError("Invalid email or password.")
            }
            
        }
        if(user){
            navigate(`/${user.id}`)
        }

        // if(isSuccess){
        //     navigate(`/${user.id}`)
        // }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

        return e.target.value
    }

    const emailValidation = emailVal(email)
    const passwordValidation = emptyInputVal(password)

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    const onClickSignup = () => {
        navigate('/account/signup')
    }

    const onClickForgot = () => {
        navigate('/account/password/resetRequest')
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
    
    return (
        <div className="homePageLayout">
            <div>
                <h1 className="title">CENT</h1>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={onSubmit} noValidate={true} className="form logInForm">
                    <TextInput {...emailInput}/>
                    <TextInput {...passwordInput} />
                    <button type="submit" className="btn" disabled={!emailValidation || !passwordValidation}>Log in</button>
                    <p className='formBottom link' onClick={onClickForgot}>Forgot password?</p>
                    <p className='formBottom'>Don't have an account? <span className='link' onClick={onClickSignup}>Sign up</span></p>
                </form>
            </div>
            <div className="line"></div>
            <div className="triangle"></div>
        </div>
        
    )
}