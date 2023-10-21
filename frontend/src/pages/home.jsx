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

    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        // if(isError){
        //     if(message.includes("400")){
        //         setError("Please verify you email before attempting to log in.")
        //     }
        //     else{
        //         setError("Email or password are incorrect. Please try again.")
        //     }
            
        // }
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
            return false
        }
        
        return true
    }

    const passwordValidation = () => {
        if(password.length === 0){
            return false
        }
        
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
    
    return (
        <div className="homePageLayout">
            <div>
                <h1 className="title">CENT</h1>
                <form onSubmit={onSubmit} noValidate={true} className="logInForm">
                    <TextInput label="Email" type="email" handleChange={onChange} inputValue={email} validation={emailValidation} errorMessage="Input is not valid"/>
                    <TextInput label="Password" type="password" handleChange={onChange} inputValue={password} validation={passwordValidation} errorMessage="Input is not valid" />
                    <button type="submit" className="btn">Log in</button>
                </form>
            </div>
            <div className="line"></div>
            <div className="triangle"></div>
        </div>
        
    )
}