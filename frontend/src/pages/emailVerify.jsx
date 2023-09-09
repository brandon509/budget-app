import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { verifyEmail } from '../features/auth/authSlice'

export default function EmailVerify(){

    const params = useParams()
    const dispatch = useDispatch()

    const { isError, isSuccess, isLoading } = useSelector((state) => state.auth)

    useEffect(() => {

        dispatch(verifyEmail(params.id))
    }, [])
    
    return(
        <div>
            <h1>{isSuccess && 'Successfully verified email. Please log in'}</h1>
            <h1>{isError && 'Not a valid verification link, please try again'}</h1>
        </div>
    )
}