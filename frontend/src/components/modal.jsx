import ReactModal from 'react-modal';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextInput from './textInput';
import Button from './button'
import { newCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice'

//ReactModal.setAppElement('#main')

export default function Modal() {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [editCategory, setEditCategory] = useState(undefined)
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    split: '',
    budget: ''
})

  const { name, split, budget } = categoryFormData

  const { activeCategories } = useSelector((state) => state.category)

  const dispatch = useDispatch()

  const resetState = () => {
    setCategoryFormData((prevState) => ({
      ...prevState,
      name: '',
      split: '',
      budget: ''
    }))
    setEditCategory(undefined)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    resetState()
  }

  const onClickCategory = (e) => {
    setEditCategory(e.target.id)
    const selectedCategory = activeCategories.filter(x => x._id === e.target.id)[0]  

    setCategoryFormData((prevState) => ({
      ...prevState,
      name: selectedCategory.name,
      split: selectedCategory.split,
      budget: selectedCategory.budget
  }))
  }

  const onChange = (e) => {
    let value = +e.target.value || e.target.value
  
    setCategoryFormData((prevState) => ({
        ...prevState,
        [e.target.name]: value
    }))
  }
  
  const onSubmit = async () => {
  
    const userData = {
        name,
        split,
        budget
    }
    
    dispatch(newCategory(userData))
    resetState()
  }

  const onSubmitDelete = () => {
    dispatch(deleteCategory({ id: editCategory }))

    resetState()
  }

  const categoryName = {
    label: "Name",
    type: "text",
    name: "name",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
    className: 'ln-item-input',
    inputValue: name
}

const categorySplit = {
  label: "Split",
  type: "number",
  name: "split",
  handleChange: onChange,
  validation: true,
  errorMessage: null,
  className: 'ln-item-input',
  inputValue: split
}

const categoryBudget = {
  label: "Budget",
  type: "number",
  name: "budget",
  handleChange: onChange,
  validation: true,
  errorMessage: null,
  className: 'ln-item-input',
  inputValue: budget
}

  return(
    <div>
      <button onClick={openModal}>Category</button>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal' overlayClassName='modal-overlay'  contentLabel="Example Modal" ariaHideApp={false}>
          <div className='test'>
            <div className='left'>
              {/* <Button click={closeModal} item='x' className='close-btn'/> */}
              <h4 className='category-header'>Category</h4>
              <ul className='category-list'>
                {activeCategories && activeCategories.map((x,i) => 
                    <li key={x._id} id={x._id} className={ x._id === editCategory ? 'category-list-item edit' : 'category-list-item'} onClick={onClickCategory}>{x.name}</li>
                )}
              </ul>
            </div>
            <div>
            <form className=''>
                <TextInput {...categoryName} />
                <TextInput {...categorySplit} />
                <TextInput {...categoryBudget} />
                <button type='button' className='btn' onClick={onSubmit}>{editCategory ? 'Update' : 'Create'}</button>
                {editCategory && <button type='button' className='btn' onClick={onSubmitDelete} >Delete</button>}
            </form>
            </div>
          </div>
      </ReactModal>
    </div>
  )
}