import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { verifyEmail } from '../features/auth/authSlice'

export default function EmailVerify(){

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(verifyEmail(params.id))
    }, [dispatch])
    
    return(
        <h1>{params.id}</h1>
    )
}