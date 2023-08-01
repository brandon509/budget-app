import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import PopupWindow from "./popupWindow"
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formData

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
            name,
            email,
            password,
            confirmPassword
        }
        dispatch(signup(userData))
    }    
    return(
        <div className="login-window">
            <h3>Join Budgey</h3>
            <form className="login" onSubmit={onSubmit}>
                <input type="text" placeholder="name" name="name" onChange={onChange}></input>
                <input type="email" placeholder="email" name="email" onChange={onChange}></input>
                <input type="password" placeholder="password" name="password" onChange={onChange}></input>
                <input type="password" placeholder="password" name="confirmPassword" onChange={onChange}></input>
                <button type="submit">Sign up</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign up with Google</p> 
            </button>
            <p>Already have an account? <PopupWindow item="Sign in"/></p>
        </div>
    )
}