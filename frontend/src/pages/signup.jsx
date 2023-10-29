import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'
import TextInput from '../components/textInput'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [validation, setValidation] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
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

    const nameValidation = () => {
        if(name.length === 0){
            setValidation((prevState) => ({
                ...prevState,
                name: false
            }))
            return false
        }
        setValidation((prevState) => ({
            ...prevState,
            name: true
        }))
        return true
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
        if(password.length < 8 || !password.match(/[0-9]/) || !password.match(/[A-Z]/) || !password.match(/[^A-Z0-9]/i)) {
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

    const confirmPasswordValidation = () => {
        if(password !== confirmPassword){
            setValidation((prevState) => ({
                ...prevState,
                confirmPassword: false
            }))
            return false
        }
        setValidation((prevState) => ({
            ...prevState,
            confirmPassword: true
        }))
        return true
    }

    return(
        <div className='signUpPageLayout'>
            <div className='totalForm'>
                <h2 className='signUpTitle'>Sign up for Cent</h2>
                {error && <p className='error signupError'>{error}</p>}
                <form onSubmit={onSubmit} noValidate={true} className="form">
                    <TextInput label="Name" type="text" name="name" handleChange={onChange} inputValue={name} validation={nameValidation} errorMessage="Input is not valid"/>
                    <TextInput label="Email" type="email" name="email" handleChange={onChange} inputValue={email} validation={emailValidation} errorMessage="Input is not valid"/>
                    <TextInput label="Password" type="password" name="password" handleChange={onChange} inputValue={password} validation={passwordValidation} errorMessage="Input is not valid" />
                    <TextInput label="Confirm Password" type="password" name="confirmPassword" handleChange={onChange} inputValue={confirmPassword} validation= {confirmPasswordValidation} errorMessage="Passwords do not match" />
                    <button type="submit" className="btn" disabled={!validation.name || !validation.email || !validation.password || !validation.confirmPassword ? true : false}>Sign up</button>
                    <p className='formBottom'>Already have an account? <span className='link' onClick={onClick}>Log in</span></p>
                </form>
            </div>
        </div>
    )
}