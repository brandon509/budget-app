import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, resetPassword } from '../features/auth/authSlice'
import TextInput from '../components/textInput'

export default function passwordReset(){
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [validation, setValidation] = useState({
        password: false,
        confirmPassword: false
    })

    const [error, setError] = useState('')
    
    const { password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            setError("Reset link invalid")
        }

        if(isSuccess){
            navigate('/account/login')
        }
        dispatch(reset())
    }, [isError, isSuccess, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            password,
            confirmPassword,
            ident: params.ident,
            timeStamp: params.timeStamp,
            hash: params.hash
        }
        
        dispatch(resetPassword(data))
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
                <h2 className='signUpTitle'>Reset password</h2>
                {error && <p className='error signupError'>{error}</p>}
                <form onSubmit={onSubmit} noValidate={true} className="form">
                    <TextInput label="Password" type="password" name="password" handleChange={onChange} inputValue={password} validation={passwordValidation} errorMessage="Input is not valid" />
                    <TextInput label="Confirm Password" type="password" name="confirmPassword" handleChange={onChange} inputValue={confirmPassword} validation= {confirmPasswordValidation} errorMessage="Passwords do not match" />
                    <button type="submit" className="btn" disabled={!validation.password || !validation.confirmPassword ? true : false}>Reset</button>
                </form>
            </div>
        </div>
    )
}