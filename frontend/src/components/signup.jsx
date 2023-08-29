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
    const [isHovering, setIsHovering] = useState(false)
    const [error, setError] = useState(null)
    
    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setError("Error, please try again later")
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

    function handleMouseOver(){
        setIsHovering(true)
    }

    function handleMouseOut(){
        setIsHovering(false)
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
        // if(name.length === 0){
        //     setNameVal((prevState) => ({
        //         ...prevState,
        //         pass: false,
        //         initial: false
        //     }))
        // }
        // else{
        //     setNameVal((prevState) => ({
        //         ...prevState,
        //         pass: true,
        //         initial: false
        //     }))
        // }
        // name.length === 0 ? setNameVal((prevState) => ({
        //     ...prevState,
        //     pass: false,
        //     initial: false
        // })) : setNameVal((prevState) => ({
        //     ...prevState,
        //     pass: true,
        //     initial: false
        // }))
    }

    const emailValidation = () => {
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)? setEmailVal((prevState) => ({
            ...prevState,
            pass: false,
            initial: false
        })) : setEmailVal((prevState) => ({
            ...prevState,
            pass: true,
            initial: false
        }))
    }

    const passwordValidation = () => {
        setPasswordRequirements(false)
        if(password.length > 8 && password.match(/[0-9]/) && password.match(/[A-Z]/) && password.match(/[^A-Z0-9]/i) && password === confirmPassword) {
            setPasswordVal((prevState) => ({
                ...prevState,
                pass: true,
                initial: false
            }))
        }
        else{
            setPasswordVal((prevState) => ({
                ...prevState,
                pass: false,
                initial: false
            }))
        }
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
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                </div>}
                <input type="email" placeholder="email" name="email" onChange={onChange} onBlur={emailValidation} className={!emailVal.pass && !emailVal.initial ? 'val-error' : undefined}></input>
                {!emailVal.pass && !emailVal.initial && <div className='validation-error email-val' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><FontAwesomeIcon icon={faTriangleExclamation} className="icon" /></div>}
                {isHovering && <p className='test'>Invalid email address</p>}
                <input type="password" placeholder="password" name="password" onChange={onChange} onFocus={openPassword} onBlur={passwordValidation}></input>
                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={onChange} onFocus={openPassword} onBlur={passwordValidation}></input>
                {passwordRequirements && <PasswordRequirements password={password} confirmPassword={confirmPassword} />}
                {/* {isVal && <ErrorMessage errorMsg={error}/>} */}
                <button type="submit" disabled={!nameVal.pass || !emailVal.pass || !passwordVal.pass ? true : false}>Sign up</button>
            </form>
            <p className="or"><span>or</span></p>
            <button className="google-sign-in">
                <FontAwesomeIcon className="google-icon" icon={faGoogle} /> 
                <p>Sign up with Google</p> 
            </button>
        </div>
    )
}