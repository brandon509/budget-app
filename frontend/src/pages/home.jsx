import TextInput from '../components/textInput'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'

export default function Home(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [validation, setValidation] = useState({
        email: false,
        password: false
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
        if(isSuccess){
            navigate(`/${user.id}`)
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

        return e.target.value
    }

    const emailValidation = () => {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setValidation((prevState) => ({
                ...prevState,
                email: false
            }))
            return false
        }
        setValidation((prevState) => ({
            ...prevState,
            email: true
        }))
        return true
    }

    const passwordValidation = () => {
        if(password.length === 0){
            setValidation((prevState) => ({
                ...prevState,
                password: false
            }))
            return false
        }
        setValidation((prevState) => ({
            ...prevState,
            password: true
        }))
        return true
    }

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
    
    return (
        <div className="homePageLayout">
            <div>
                <h1 className="title">CENT</h1>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={onSubmit} noValidate={true} className="form logInForm">
                    <TextInput label="Email" type="email" name={"email"} handleChange={onChange} inputValue={email} validation={emailValidation} errorMessage="Input is not valid"/>
                    <TextInput label="Password" type="password" name="password" handleChange={onChange} inputValue={password} validation={passwordValidation} errorMessage="Input is not valid" />
                    <button type="submit" className="btn" disabled={!validation.email || !validation.password ? true : false}>Log in</button>
                    <p className='formBottom link' onClick={onClickForgot}>Forgot password?</p>
                    <p className='formBottom'>Don't have an account? <span className='link' onClick={onClickSignup}>Sign up</span></p>
                </form>
            </div>
            <div className="line"></div>
            <div className="triangle"></div>
        </div>
        
    )
}