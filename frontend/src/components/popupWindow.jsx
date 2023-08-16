import Popup from 'reactjs-popup'
import Modal from 'react-modal'
import { useState } from 'react'
import Signup from '../components/signup'
import Login from '../components/login'
import SignupSuccess from './signupSuccess'

export default function PopupWindow({ item }){
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

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    window.location.reload(false)
    setIsOpen(false)
  }
    
    return(
        <div>
            <button onClick={openModal}>{item}</button>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
                <button className='close' onClick={closeModal}>&times;</button>
                {item === "Sign up" ? <Signup /> : item === "Sign in" ? <Login /> : <SignupSuccess />}
            </Modal>
        </div>
    )
}