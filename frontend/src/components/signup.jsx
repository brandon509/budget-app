import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'
import PasswordRequirements from './passwordRequirements'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [val, setVal] = useState(true)
    const [passwordRequirements, setPasswordRequirements] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [nameVal, setNameVal] = useState(false)
    const [emailVal, setEmailVal] = useState(false)
    const [passwordVal, setPasswordVal] = useState(false)
    

    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            console.log(message)
        }
        dispatch(reset())
    }, [user, isError, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        validation()

        const userData = {
            name,
            email,
            password,
            confirmPassword
        }
        if(!nameVal && !emailVal && !passwordVal){
            dispatch(signup(userData))
        }
        else{
            console.log("failed validations")
        }
    }  
    
    const openPassword = () => {
        setPasswordRequirements(true)
    }

    const closePassword = () => {
        setPasswordRequirements(false)
    }
    
    const validation = () => {
        name.length === 0 ? setNameVal(true) : setNameVal(false)
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length > 0 ? setEmailVal(true) : setEmailVal(false)

        if(password.length < 8 || !password.match(/[0-9]/) || !password.match(/[A-Z]/) || !password.match(/[^A-Z0-9]/i) || password != confirmPassword) {
            setPasswordVal(true)
        }
        else{
            setPasswordVal(false)
        }
    }

    function handleMouseOver(){
        setIsHovering(true)
    }

    function handleMouseOut(){
        setIsHovering(false)
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
                    onBlur={validation} 
                    className={nameVal ? 'val-error' : undefined}>
                </input>
                {nameVal && 
                <div 
                    className='validation-error name-val'
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>}
                <input type="email" placeholder="email" name="email" onChange={onChange} onBlur={validation} className={emailVal ? 'val-error' : undefined}></input>
                {emailVal && <div className='validation-error email-val' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><FontAwesomeIcon icon={faTriangleExclamation} className="icon" /></div>}
                {isHovering && <p className='test'>Invalid email address</p>}
                <input type="password" placeholder="password" name="password" onChange={onChange} onFocus={openPassword} onBlur={closePassword}></input>
                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={onChange} onFocus={openPassword} onBlur={closePassword}></input>
                {passwordRequirements && <PasswordRequirements password={password} confirmPassword={confirmPassword} />}
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