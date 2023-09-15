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
    const [nameVal, setNameVal] = useState({
        pass: false,
        initial: true
    })
    const [emailVal, setEmailVal] = useState({
        pass: false,
        initial: true
    })
    const [passwordVal, setPasswordVal] = useState({
        pass: false,
        initial: true
    })
    const [passwordRequirements, setPasswordRequirements] = useState(false)
    const [isHoveringName, setIsHoveringName] = useState(false)
    const [isHoveringEmail, setIsHoveringEmail] = useState(false)
    const [error, setError] = useState(null)
    
    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setError("Account associated with the given email already exists")
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
    
    const openPassword = () => {
        setPasswordRequirements(true)
    }

    function handleMouseOverName(){
        setIsHoveringName(true)
    }

    function handleMouseOutName(){
        setIsHoveringName(false)
    }

    function handleMouseOverEmail(){
        setIsHoveringEmail(true)
    }

    function handleMouseOutEmail(){
        setIsHoveringEmail(false)
    }

    const nameValidation = () => {
        let pass = true
        if(name.length === 0){
            pass = false
        }
        
        setNameVal((prevState) => ({
            ...prevState,
            pass: pass,
            initial: false
        }))
    }

    const emailValidation = () => {
        let pass = true
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            pass = false
        }
        
        setEmailVal((prevState) => ({
            ...prevState,
            pass: pass,
            initial: false
        }))
    }

    const passwordValidation = () => {
        setPasswordRequirements(false)
        let pass = true

        if(password.length < 8 || !password.match(/[0-9]/) || !password.match(/[A-Z]/) || !password.match(/[^A-Z0-9]/i) || password !== confirmPassword) {
            pass = false
        }
        
        setPasswordVal((prevState) => ({
            ...prevState,
            pass: pass,
            initial: false
        }))
    }

    return(
        <div className="login-window">
            <h3>Join Budgey</h3>
            <form className="login" onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="name" 
                    name="name" 
                    onChange={onChange} 
                    onBlur={nameValidation} 
                    className={!nameVal.pass && !nameVal.initial ? 'val-error' : undefined}>
                </input>
                {!nameVal.pass && !nameVal.initial && 
                <div 
                    className='validation-error name-val'
                    onMouseOver={handleMouseOverName} 
                    onMouseOut={handleMouseOutName}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>}
                {isHoveringName && <p className='error-hover-box error-name'>Name must be at least 1 character</p>}
                <input 
                    type="email" 
                    placeholder="email" 
                    name="email" 
                    onChange={onChange} 
                    onBlur={emailValidation} 
                    className={!emailVal.pass && !emailVal.initial ? 'val-error' : undefined}>
                </input>
                {!emailVal.pass && !emailVal.initial && 
                <div 
                    className='validation-error email-val' 
                    onMouseOver={handleMouseOverEmail} 
                    onMouseOut={handleMouseOutEmail}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>}
                {isHoveringEmail && <p className='error-hover-box error-email'>Invalid email address</p>}
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    onChange={onChange} 
                    onFocus={openPassword} 
                    onBlur={passwordValidation}>
                </input>
                <input 
                    type="password" 
                    placeholder="confirm password" 
                    name="confirmPassword" 
                    onChange={onChange} 
                    onFocus={openPassword} 
                    onBlur={passwordValidation}>
                </input>
                {passwordRequirements && <PasswordRequirements password={password} confirmPassword={confirmPassword} />}
                <button 
                    type="submit" 
                    disabled={!nameVal.pass || !emailVal.pass || !passwordVal.pass ? true : false}>
                Sign up</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign up with Google</p> 
            </button>
            {error && <ErrorMessage errorMsg={error}/>}
        </div>
    )
}