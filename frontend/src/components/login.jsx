import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, login, loginGoogle } from '../features/auth/authSlice'
import ErrorMessage from './errorMessage'

export default function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)

    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(isError){
            if(message.includes('400')){
                setError('Please verify you email before attempting to log in.')
            }
            else{
                setError('Email or password are incorrect. Please try again.')
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
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    const onClick = () => {
        dispatch(loginGoogle())
    }

    return(
        <div className="login-window">
            <h3>Log in to Budgey</h3>
            <form className='login' onSubmit={onSubmit} noValidate={true}>
                <input type="email" placeholder="email" name="email" onChange={onChange}></input>
                <input type="password" placeholder="password" name="password" onChange={onChange}></input>
                <button type="submit">Log in</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in" onClick={onClick}>
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign in with Google</p> 
            </button>
            <p>Forgot password?</p>
            {error && <ErrorMessage errorMsg={error}/>}
        </div>
    )
    
   
}