import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'

export default function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(isError){
            console.log(message)
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

    return(
        <div className="login-window">
            <h3>Log in to Budgy</h3>
            <form className='login' onSubmit={onSubmit}>
                <input type="email" placeholder="email" name="email" onChange={onChange}></input>
                <input type="password" placeholder="password" name="password" onChange={onChange}></input>
                <button type="submit">Log in</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign in with Google</p> 
            </button>
            <p>Forgot password?</p>
        </div>
    )
    
   
}