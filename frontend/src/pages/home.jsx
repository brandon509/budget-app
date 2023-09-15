import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Signup from '../components/signup'
import Login from '../components/login'
import SignupSuccess from '../components/signupSuccess'
import { reset } from '../features/auth/authSlice'

export default function Home(){

    const { isSuccess } = useSelector((state) => state.auth)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    const dispatch = useDispatch()

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
        if(isSuccess){
            setModalType("success")
        }
    }, [isSuccess])

    const openModal = e => {
        setIsOpen(true)
        setModalType(e.target.name)
    }

    const closeModal = () => {
        setIsOpen(false)
        dispatch(reset())
    }

    let modalContent = {
        modal: null,
        verbiage: null,
        buttonName: null,
        buttonDisplay: null
    }

    switch(modalType){
        case 'sign-up':
            modalContent = {
                modal: <Signup />,
                verbiage: "Already have an account?",
                buttonName: "log-in",
                buttonDisplay: "Log in"
            }
            break
        case 'log-in':
            modalContent = {
                modal: <Login />,
                verbiage: "Don't have an account?",
                buttonName: "sign-up",
                buttonDisplay: "Sign up"
            }
            break
        case 'success':
            modalContent = {
                modal: <SignupSuccess />,
                verbiage: null,
                buttonName: null,
                buttonDisplay: null
            }
            break
        default:
            modalContent = {
                modal: null,
                verbiage: null,
                buttonName: null,
                buttonDisplay: null
            }
    }

    return(
        <div>
            <button onClick={openModal} name="sign-up">Sign up</button>
            <button onClick={openModal} name="log-in">Log in</button>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <button className='close' onClick={closeModal}>&times;</button>
                <div className='modalContent'>
                    {modalContent.modal}
                    <p className='switch'>{modalContent.verbiage}</p> 
                    <button onClick={openModal} name={modalContent.buttonName} className='switch'>{modalContent.buttonDisplay}</button>
                </div>
            </Modal>
        </div>
    )
}