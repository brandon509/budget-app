import ReactModal from 'react-modal';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newAmount, updateAmount } from '../features/posts/postSlice'
import TextInput from './textInput';
import Button from './button'
import CateogryInput from './categoryInput';

//ReactModal.setAppElement('#main')

export default function Modal({ type, lineItem }) {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [split, setSplit] = useState(0)
  const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        dateIncurred: ''
    })

  const { description, category, amount, dateIncurred } = formData

  const { activeCategories } = useSelector((state) => state.category)

  const dispatch = useDispatch()

  const openModal = () => {
    setIsOpen(true)
    if(lineItem){
      setFormData((prevState) => ({
        ...prevState,
        description: lineItem.description,
        category: lineItem.category._id,
        amount: lineItem.amount,
        dateIncurred: lineItem.dateIncurred.slice(0,10)
    }))
    setSplit(lineItem.category.split)
  } 
  }

  const closeModal = () => {
    resetState()
    setIsOpen(false)
  }

  const resetState = () => {
    setFormData((prevState) => ({
        ...prevState,
        description: '',
        category: '',
        amount: '',
        dateIncurred: ''
    }))
    setSplit(0)
}

const onChange = (e) => {
  let value = +e.target.value || e.target.value

  if(e.target.name === 'category' && e.target.value){
      const category = activeCategories.filter(x => x._id === e.target.value)
      setSplit(category[0].split)
  }

  setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value
  }))
}

const onSubmit = async (e) => {

  const userData = {
      description,
      category,
      amount,
      adjAmount: amount*split,
      dateIncurred
  }
  
  dispatch(newAmount(userData))
  resetState()
  setIsOpen(false)
}

const onSubmitEdit = async () => {
 
  const userData = {
      id: lineItem._id,
      description,
      category,
      amount,
      adjAmount: amount*split,
      dateIncurred
  }

  dispatch(updateAmount(userData))
  resetState()
  setIsOpen(false)
}

  const descriptionInput = {
    label: "Description",
    type: "text",
    name: "description",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: description
}

const amountInput = {
    label: "Amount",
    type: "number",
    name: "amount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: amount
}

const adjAmountInput = {
    label: "Adjusted Amount",
    type: "number",
    name: "adjAmount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: amount*split || amount
}

const dateIncurredInput = {
    label: "Date",
    type: "date",
    name: "dateIncurred",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: dateIncurred
}

  return(
    <div>
      {type === 'new' ? <Button item='new'  click={openModal} /> : <Button id={lineItem._id} item='edit' className= 'edit-btn' click={openModal} />}
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal' overlayClassName='modal-overlay'  contentLabel="Example Modal" ariaHideApp={false}>
            <Button click={closeModal} item='x' className='close-btn'/> 
            <form className='modal-form'>
                <TextInput {...descriptionInput} />
                <CateogryInput category={category} onChange={onChange} options={activeCategories} defaultValue={lineItem && lineItem.category._id} />
                <TextInput {...amountInput} />
                <TextInput {...adjAmountInput} />
                <TextInput {...dateIncurredInput} />
                <button type='button' onClick={type === 'new' ? onSubmit : onSubmitEdit} className='btn submit-btn'>Submit</button>
            </form>
      </ReactModal>
    </div>
  )
}