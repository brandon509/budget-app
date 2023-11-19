import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { verifyEmail, reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function EmailVerify(){

    const [error, setError] = useState('')

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            if(message.includes("401")){
                setError("Email already verified, please log in")
            }
            else{
                setError("404: Page not found")
            }
        }

        dispatch(verifyEmail(params.id))
    }, [isError])

    const onClick = () => {
        dispatch(reset())
        navigate('/')
    }
    
    return(
        <div className='email-verify'>
            {isSuccess &&
                <div className='email-verify-success'>
                    <div>
                        <FontAwesomeIcon className='success-icon' icon={faCircleCheck} />
                        <p className='success'>Success! Your email has been verified.</p>
                    </div>
                    <p className='success-signin'>Sign in to continue.</p>
                </div>}
            {isError &&
                <p>{error}</p>
            }
            <button onClick={onClick} className='home-btn'>Home</button>
        </div>
    )
}