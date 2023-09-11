import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { verifyEmail, reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function EmailVerify(){

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [modalIsOpen, setIsOpen] = useState(false)

    const { isError, isSuccess, isLoading } = useSelector((state) => state.auth)

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          padding: '0%'
        }
    }

    useEffect(() => {

        dispatch(verifyEmail(params.id))
    }, [])

    const onClick = () => {
        dispatch(reset())
        navigate('/')
    }
    
    return(
        <div>
            {isSuccess &&
                <div className='email-verify-success'>
                    <div>
                        <FontAwesomeIcon className='success-icon' icon={faCircleCheck} />
                        <p className='success'>Success! You have confirmed your email.</p>
                    </div>
                    <p className='success-signin'>Sign in to continue.</p>
                </div>}
            {isError &&
                <p>404: Page not found</p>
            }
            <button onClick={onClick} className='home-btn'>Home</button>
        </div>
    )
}