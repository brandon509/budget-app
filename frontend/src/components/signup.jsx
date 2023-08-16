import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'
import PasswordRequirements from './passwordRequirements'
import ErrorMessage from './errorMessage'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [passwordRequirements, setPasswordRequirements] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isVal, setIsVal] = useState(false)
    const [nameVal, setNameVal] = useState(false)
    const [emailVal, setEmailVal] = useState(false)
    const [passwordVal, setPasswordVal] = useState(false)
    const [error, setError] = useState(null)
    

    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setError(message)
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
        if(!nameVal && !emailVal && !passwordVal && name && email && password && confirmPassword){
            dispatch(signup(userData))
        }
        else{
            setIsVal(true)
            setError("Please complete the form correctly")
        }
    }  
    
    const openPassword = () => {
        setPasswordRequirements(true)
    }

    function handleMouseOver(){
        setIsHovering(true)
    }

    function handleMouseOut(){
        setIsHovering(false)
    }

    const nameValidation = () => {
        name.length === 0 ? setNameVal(true) : setNameVal(false)
    }

    const emailValidation = () => {
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)? setEmailVal(true) : setEmailVal(false)
    }

    const passwordValidaiton = () => {
        setPasswordRequirements(false)

        if(password.length < 8 || !password.match(/[0-9]/) || !password.match(/[A-Z]/) || !password.match(/[^A-Z0-9]/i) || password != confirmPassword) {
            setPasswordVal(true)
        }
        else{
            setPasswordVal(false)
        }
    }

    return(
        <div className="login-window">
            <h3>Join Budgey</h3>
            <form className="login" onSubmit={onSubmit} noValidate={true}>
                <input 
                    type="text" 
                    placeholder="name" 
                    name="name" 
                    onChange={onChange} 
                    onBlur={nameValidation} 
                    className={nameVal ? 'val-error' : undefined}>
                </input>
                {nameVal && 
                <div 
                    className='validation-error name-val'
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>}
                <input type="email" placeholder="email" name="email" onChange={onChange} onBlur={emailValidation} className={emailVal ? 'val-error' : undefined}></input>
                {emailVal && <div className='validation-error email-val' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><FontAwesomeIcon icon={faTriangleExclamation} className="icon" /></div>}
                {isHovering && <p className='test'>Invalid email address</p>}
                <input type="password" placeholder="password" name="password" onChange={onChange} onFocus={openPassword} onBlur={passwordValidaiton}></input>
                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={onChange} onFocus={openPassword} onBlur={passwordValidaiton}></input>
                {passwordRequirements && <PasswordRequirements password={password} confirmPassword={confirmPassword} />}
                {isVal && <ErrorMessage errorMsg={error}/>}
                <button type="submit">Sign up</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign up with Google</p> 
            </button>
        </div>
    )
}