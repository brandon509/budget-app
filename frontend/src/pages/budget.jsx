import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount, deleteAmount, updateAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

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
    
    const { description, category, amount, dateIncurred } = formData

    const { isError, isLoading, message, data } = useSelector((state) => state.post)
    const { categories } = useSelector((state) => state.category)

    const dispatch = useDispatch()
    const timePeriod = { month: month, year: year}

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        dispatch(getAmounts(timePeriod))
        dispatch(getCategories())
        
    }, [dispatch])

    const onChangeDate = (e) => {
        if(e.target.name === "month"){
            setMonth(e.target.value)
            dispatch(getAmounts({month: e.target.value, year: year}))
        }
        if(e.target.name === "year"){
            setYear(e.target.value)
            dispatch(getAmounts({month: month, year: e.target.value}))
        }
    }

    const onChange = (e) => {
        let value = +e.target.value || e.target.value

        if(e.target.name === 'category'){
            const category = categories.filter(x => x._id === e.target.value)
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

    const onClickEdit = (e) => {
        e.preventDefault()

        setEdit(e.currentTarget.id)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

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

    const onSubmitEdit = async (e) => {
        e.preventDefault()

        let adjValue = null

        if(amount || category){
            const item = data.filter(x => x._id === e.target.id)
            const a = amount || item[0].amount
            const s = split || item[0].category.split
            adjValue = a*s
        }

        const userData = {
            id: e.currentTarget.id,
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

    let summaryObj = {}
    data.forEach(x => {
        if(!summaryObj[x.category.name]){
            summaryObj[x.category.name] = 0
        }

        summaryObj[x.category.name] += x.adjAmount
    })

    let summaryArray = []

    for (const x in summaryObj){
        summaryArray.push({category: x, amount: summaryObj[x]})
    }

    return (
       <div>
        <form>
            <select name="month" defaultValue={month} onChange={onChangeDate} className='date-input'>
               {monthOptions.map((x,i) => <option key={i} value={i}>{x}</option>)}
            </select>
            <select name="year" defaultValue={year} onChange={onChangeDate} className='date-input'>
                {yearOptions.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
        </form>
        <h3>Summary</h3>
        <table>
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
        </table>
        <form onSubmit={onSubmit}>
            <table>
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
                    <tr>
                        <td><input type="text" id="description" name="description" onChange={onChange} value={edit ? "" : description} /></td>
                        <td>
                            <select name="category" onChange={onChange}>
                            <option></option>
                                {categories && categories.map(x => 
                                    <option key={x._id} value={x._id}>{x.name}</option>
                            )}</select>
                        </td>
                        <td><input type="number" id="amount" name="amount" step="0.01" onChange={onChange} value={edit ? "" : amount} /></td>
                        <td>{edit ? "" : amount*split || amount}</td>
                        <td><input type="date" id="dateIncurred" name="dateIncurred" onChange={onChange} value={edit ? "" : dateIncurred} /></td>
                        <td><button className='btn'>Submit</button></td>
                    </tr>
                    {data && data.map(x => 
                        <tr key={x._id}>
                            {edit === x._id ? <td><input type="text" id="description" name="description" defaultValue={x.description} onChange={onChange} /></td> : <td>{x.description}</td>}
                            {edit === x._id ? 
                                <td>
                                    <select name="category" defaultValue={x.category._id} onChange={onChange}>
                                        {categories && categories.map(y => 
                                            <option key={y._id} value={y._id}>{y.name}</option>
                                    )}</select>
                                </td> : <td>{x.category.name}</td>}
                            {edit === x._id ? <td><input type="number" id="amount" name="amount" step="0.01" onChange={onChange} defaultValue={x.amount} /></td> : <td>{x.amount}</td>}

                            {/* {edit === x._id ? <td>{amount && split ? amount*split : amount ? amount*x.category.split : split ? x.amount*split : x.adjAmount}</td> : <td>{x.adjAmount}</td>} */}
                            {edit === x._id ? <td>{amount*split || amount*x.category.split || x.amount*split || x.adjAmount}</td> : <td>{x.adjAmount}</td>}

                            {edit === x._id ? <td><input type="date" id="dateIncurred" name="dateIncurred" onChange={onChange} defaultValue={x.dateIncurred.slice(0,10)} /></td> : <td>{x.dateIncurred.slice(0,10)}</td>}


                            {/* <td className='modify-icons'>
                            {edit != x._id && <button id={x._id} onClick={onClickDelete} className='btn x-btn'><FontAwesomeIcon icon={faX} /></button>}

                            {edit != x._id && <button id={x._id} onClick={onClickEdit} className='btn edit-btn'><FontAwesomeIcon icon={faPenToSquare} /></button>}

                            {edit === x._id && <button id={x._id} onClick={onSubmitEdit} className='btn save-btn'><FontAwesomeIcon icon={faFloppyDisk} /></button>}
                            </td> */}

                            <td>
                                {edit != x._id ? 
                                    <div className='modify-icons'>
                                        <button id={x._id} onClick={onClickDelete} className='btn x-btn'><FontAwesomeIcon icon={faX} /></button>
                                        <button id={x._id} onClick={onClickEdit} className='btn edit-btn'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    </div> :
                                    <button id={x._id} onClick={onSubmitEdit} className='btn save-btn'><FontAwesomeIcon icon={faFloppyDisk} /></button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </form>
       </div>
    )
}