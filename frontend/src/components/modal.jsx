import ReactModal from 'react-modal';
import { useState } from 'react'
import TextInput from './textInput';
import Button from './button'

//ReactModal.setAppElement('#main')

export default function Modal({ descriptionInput, amountInput, adjAmountInput, dateIncurredInput, onSubmit, btnInfo, category, resetState, id }) {

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)

  const closeModal = () => {
    resetState()
    setIsOpen(false)
  }

  const submit = () => {
    onSubmit(id)
    setIsOpen(false)
  }

  return(
    <div>
      <Button {...btnInfo} click={openModal} />
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal' overlayClassName='modal-overlay'  contentLabel="Example Modal" ariaHideApp={false}>
            <Button click={closeModal} item='x' className='close-btn'/> 
            <form className='modal-form'>
                <TextInput {...descriptionInput} />
                {category}
                <TextInput {...amountInput} />
                <TextInput {...adjAmountInput} />
                <TextInput {...dateIncurredInput} />
                <button type='button' onClick={submit} className='btn submit-btn'>Submit</button>
            </form>
      </ReactModal>
    </div>
  )
}