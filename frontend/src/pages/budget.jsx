import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount, deleteAmount, updateAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'
import Button from '../components/button'
import Modal from '../components/modal'
import CateogryLineItem from '../components/categoryLineItem'

export default function(){

    const currentDate = new Date()
    const monthOptions = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let yearOptions = []

    for(let i = 2020; i < currentDate.getFullYear()+3; i++){
        yearOptions.push(i)
    }
    
    const [month, setMonth] = useState(currentDate.getMonth())
    const [year, setYear] = useState(currentDate.getFullYear())
    const [split, setSplit] = useState(0)
    const [edit, setEdit] = useState('')
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        dateIncurred: ''
    })

    const resetState = () => {
        setFormData((prevState) => ({
            ...prevState,
            description: '',
            category: '',
            amount: '',
            dateIncurred: ''
        }))
    }
    
    const { description, category, amount, dateIncurred } = formData

    const { isError, isLoading, message, data } = useSelector((state) => state.post)
    const { activeCategories, currentCategories } = useSelector((state) => state.category)

    const dispatch = useDispatch()
    const timePeriod = { month: month, year: year}

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        dispatch(getAmounts(timePeriod))
        dispatch(getCategories(timePeriod))
        
    }, [dispatch])

    const onChangeDate = (e) => {
        if(e.target.name === "month"){
            setMonth(e.target.value)
            dispatch(getCategories({month: e.target.value, year: year}))
            dispatch(getAmounts({month: e.target.value, year: year}))
        }
        if(e.target.name === "year"){
            setYear(e.target.value)
            dispatch(getCategories({month: month, year: e.target.value}))
            dispatch(getAmounts({month: month, year: e.target.value}))
        }
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

    const onClickDelete = (e) => {
        e.preventDefault()

        dispatch(deleteAmount(e.currentTarget.id))
    }

    const onClickEdit = (id) => {
        //e.preventDefault()
        console.log(id)

        //setEdit(e.currentTarget.id)
    }

    const onSubmit = async (e) => {
        //e.preventDefault()

        const userData = {
            description,
            category,
            amount,
            adjAmount: amount*split,
            dateIncurred
        }
        
        dispatch(newAmount(userData))

        setFormData((prevState) => ({
            ...prevState,
            description: '',
            category: '',
            amount: '',
            dateIncurred: ''
        }))
    }

    const onSubmitEdit = async (id) => {
        //e.preventDefault()
        console.log(formData)

        let adjValue = null

        if(amount || category){
            const item = data.filter(x => x._id === id)
            const a = amount || item[0].amount
            const s = split || item[0].category.split
            adjValue = a*s
        }

        const userData = {
            id: id,
            description,
            category,
            amount,
            adjAmount: adjValue,
            dateIncurred
        }

        dispatch(updateAmount(userData))

        setEdit('')
        setSplit(0)
        setFormData((prevState) => ({
            ...prevState,
            description: '',
            category: '',
            amount: '',
            dateIncurred: ''
        }))
    }

    // let summaryObj = {}
    // data.forEach(x => {
    //     if(!summaryObj[x.category.name]){
    //         summaryObj[x.category.name] = 0
    //     }

    //     summaryObj[x.category.name] += x.adjAmount
    // })

    // let summaryArray = []

    // for (const x in summaryObj){
    //     summaryArray.push({category: x, amount: summaryObj[x]})
    // }

    const descriptionInput = {
        label: "Description",
        type: "text",
        name: "description",
        handleChange: onChange,
        validation: true,
        errorMessage: null,
        className: 'ln-item-input'
    }

    const amountInput = {
        label: "Amount",
        type: "number",
        name: "amount",
        handleChange: onChange,
        validation: true,
        errorMessage: null,
        className: 'ln-item-input'
    }

    const adjAmountInput = {
        label: "Adjusted Amount",
        type: "number",
        name: "adjAmount",
        handleChange: onChange,
        validation: true,
        errorMessage: null,
        className: 'ln-item-input'
    }

    const dateIncurredInput = {
        label: "Date",
        type: "date",
        name: "dateIncurred",
        handleChange: onChange,
        validation: true,
        errorMessage: null,
        className: 'ln-item-input'
    }

    return (
       <div className='testerapp'>
        <Modal 
            descriptionInput={{...descriptionInput, inputValue: description}} 
            category={<div><h5 className={category ? 'inputLabel category-label' : 'hidden'}>Category</h5><select name="category" onChange={onChange} className={category ? 'select' : 'select category-placeholder' }>
                            <option value=''>Category</option>
                            {activeCategories && activeCategories.map(x => 
                                <option key={x._id} value={x._id}>{x.name}</option>
                                )}
                    </select></div>} 
            amountInput={{...amountInput, inputValue: amount}} 
            adjAmountInput={{...adjAmountInput, inputValue: amount*split || amount}} 
            dateIncurredInput={{...dateIncurredInput, inputValue: dateIncurred}} 
            onSubmit={onSubmit} 
            btnInfo={{item:'new'}} 
            resetState={resetState}/>
        
        <form className='date-input-form'>
            <select name="month" defaultValue={month} onChange={onChangeDate} className='date-input input'>
               {monthOptions.map((x,i) => <option key={i} value={i}>{x}</option>)}
            </select>
            <select name="year" defaultValue={year} onChange={onChangeDate} className='date-input input'>
                {yearOptions.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
        </form>
        {currentCategories && currentCategories.map(x => 
           <CateogryLineItem key={x._id} category={x} data={data.filter(y => y.category._id === x._id)} /> )}
        {/* <h3 className='test'>Summary</h3>
        <table className='test'>
            <tbody>
                {summaryArray && summaryArray.map(x => 
                    <tr key={x.category}>
                        <td>{x.category}</td>
                        <td>{x.amount}</td>
                    </tr>
                )}
                <tr>
                    <td>Total</td>
                    <td>{summaryArray.reduce((a,b) => a + b.amount,0)}</td>
                </tr>
            </tbody>
        </table> */}
            {/* <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Adjusted Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(x => 
                        <tr key={x._id}>
                            <td>{x.description}</td>
                            <td>{x.category.name}</td>
                            <td>{x.amount}</td>
                            <td>{x.adjAmount}</td>
                            <td>{x.dateIncurred.slice(0,10)}</td>
                            <td>
                                <div className='modify-icons'>
                                    <Button id={x._id} click={onClickDelete} item='x' className='x-btn'/>
                                    <Modal 
                                        descriptionInput={{...descriptionInput, defaultValue: x.description}}
                                        category={<div><h5 className={category ? 'inputLabel category-label' : 'hidden'}>Category</h5><select name="category" defaultValue={x.category._id} className={category ? 'select' : 'select category-placeholder' } onChange={onChange}>
                                                    {activeCategories && activeCategories.map(y => 
                                                        <option key={y._id} value={y._id}>{y.name}</option>
                                                    )}
                                                </select></div>}
                                        amountInput={{...amountInput, defaultValue: x.amount}} 
                                        adjAmountInput={{...adjAmountInput, inputValue: amount*split || amount || x.adjAmount}}
                                        dateIncurredInput={{...dateIncurredInput, defaultValue: x.dateIncurred.slice(0,10)}} 
                                        onSubmit={onSubmitEdit} 
                                        btnInfo={{ id:x._id, item:'edit', className: 'edit-btn' }}
                                        resetState={resetState}
                                        id={x._id}/>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */}
       </div>
    )
}