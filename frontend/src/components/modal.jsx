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

  const openModal = () => setIsOpen(true)

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
 
  let adjValue = null

  if(amount || category){
      const item = data.filter(x => x._id === id)
      const a = amount || item[0].amount
      const s = split || item[0].category.split
      adjValue = a*s
  }

  const userData = {
      id: lineItem._id,
      description,
      category,
      amount,
      adjAmount: adjValue,
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
    inputValue: !lineItem ? description : undefined,
    defaultValue: lineItem ? lineItem.description : undefined
}

const amountInput = {
    label: "Amount",
    type: "number",
    name: "amount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: !lineItem ? amount : undefined,
    defaultValue: lineItem ? lineItem.amount : undefined
}

const adjAmountInput = {
    label: "Adjusted Amount",
    type: "number",
    name: "adjAmount",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: !lineItem ? amount*split || amount : undefined,
    defaultValue: lineItem ? amount*split || amount || lineItem.adjAmount : undefined
}

const dateIncurredInput = {
    label: "Date",
    type: "date",
    name: "dateIncurred",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: !lineItem ? dateIncurred : undefined,
    defaultValue: lineItem ? lineItem.dateIncurred.slice(0,10) : undefined
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

// export default function Modal({ descriptionInput, amountInput, adjAmountInput, dateIncurredInput, onSubmit, btnInfo, category, resetState, id }) {

//   const [modalIsOpen, setIsOpen] = useState(false)

//   const openModal = () => setIsOpen(true)

//   const closeModal = () => {
//     resetState()
//     setIsOpen(false)
//   }

//   const submit = () => {
//     onSubmit(id)
//     setIsOpen(false)
//   }

//   return(
//     <div>
//       <Button {...btnInfo} click={openModal} />
//       <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal' overlayClassName='modal-overlay'  contentLabel="Example Modal" ariaHideApp={false}>
//             <Button click={closeModal} item='x' className='close-btn'/> 
//             <form className='modal-form'>
//                 <TextInput {...descriptionInput} />
//                 {category}
//                 <TextInput {...amountInput} />
//                 <TextInput {...adjAmountInput} />
//                 <TextInput {...dateIncurredInput} />
//                 <button type='button' onClick={submit} className='btn submit-btn'>Submit</button>
//             </form>
//       </ReactModal>
//     </div>
//   )
// }