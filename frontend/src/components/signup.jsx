import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCircleXmark, faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'

export default function Signup(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [val, setVal] = useState(true)
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
        if(!val){
            dispatch(signup(userData))
        }
        else{
            console.log("failed validations")
        }
    }   
    
    const validation = () => {
        if(name.length === 0) setVal(false)
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) setVal(false)
        if(password.length < 8) setVal(false)
        if(!password.match(/[0-9]/)) setVal(false)
        if(!password.match(/[A-Z]/)) setVal(false)
        if(!password.match(/[^A-Z0-9]/i)) setVal(false)
        if((password != confirmPassword)) setVal(false)
    }

    const emailValidation = () => {
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? setEmailVal(true) : setEmailVal(false)
    }

    const passwordMatch = () => {
        password != confirmPassword ? setPasswordVal(true) : setPasswordVal(false)
    }

    function openPassword(){
        document.querySelector('.test').classList.remove('hidden')
    }

    function closePassword(){
        document.querySelector('.test').classList.add('hidden')
    }

    return(
        <div className="login-window">
            <h3>Join Budgey</h3>
            <form className="login" onSubmit={onSubmit} noValidate={true}>
                <input type="text" placeholder="name" name="name" onChange={onChange}></input>
                {passwordVal && <p className='validation-error'><FontAwesomeIcon icon={faTriangleExclamation} className="icon" />The passwords you entered do not match</p>}
                <input type="email" placeholder="email" name="email" onChange={onChange} onBlur={emailValidation}></input>
                {emailVal && <p className='validation-error'><FontAwesomeIcon icon={faTriangleExclamation} className="icon" />Invalid email address</p>}
                <input type="password" placeholder="password" name="password" onChange={onChange} onFocus={openPassword} onBlur={closePassword}></input>
                <div className="hidden test">
                    <ul className='pswd-require'>
                        <li><FontAwesomeIcon icon={password.length > 8 ? faCircleCheck : faCircleXmark} />Be at least 8 characters</li>
                        <li><FontAwesomeIcon icon={password.match(/[0-9]/) ? faCircleCheck : faCircleXmark} />Contain at least one number</li>
                        <li><FontAwesomeIcon icon={password.match(/[A-Z]/) ? faCircleCheck : faCircleXmark} />Contain at least one uppercase</li>
                        <li><FontAwesomeIcon icon={password.match(/[^A-Z0-9]/i) ? faCircleCheck : faCircleXmark} />Contain at least one special character</li>
                    </ul>
                </div>
                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={onChange} onBlur={passwordMatch}></input>
                {passwordVal && <p className='validation-error'><FontAwesomeIcon icon={faTriangleExclamation} className="icon" />The passwords you entered do not match</p>}
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