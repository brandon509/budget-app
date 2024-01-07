import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount, deleteAmount, updateAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'

export default function(){

    const currentDate = new Date()
    
    const [month, setMonth] = useState(currentDate.getMonth())
    const [year, setYear] = useState(currentDate.getFullYear())
    const [split, setSplit] = useState(0)
    const [edit, setEdit] = useState('')

    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        adjAmount: '',
        dateIncurred: ''
    })
    
    const { description, category, amount, adjAmount, dateIncurred } = formData

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
            let category = categories.filter(x => x._id === e.target.value)
            setSplit(category[0].split)
        }

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }

    const onClickDelete = (e) => {
        e.preventDefault()

        dispatch(deleteAmount(e.target.id))
    }

    const onClickEdit = (e) => {
        setEdit(e.target.id)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            description,
            category,
            amount,
            adjAmount,
            dateIncurred
        }
        
        dispatch(newAmount(userData))

        setFormData((prevState) => ({
            ...prevState,
            description: '',
            category: '',
            amount: '',
            adjAmount: '',
            dateIncurred: ''
        }))
    }

    const onSubmitEdit = async (e) => {
        e.preventDefault()

        const userData = {
            id: e.target.id,
            description,
            category,
            amount,
            adjAmount,
            dateIncurred
        }

        dispatch(updateAmount(userData))

        setEdit('')
        setFormData((prevState) => ({
            ...prevState,
            description: '',
            category: '',
            amount: '',
            adjAmount: '',
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

    console.log(split)

    return (
       <div>
        <form>
            <select name="month" defaultValue={month} onChange={onChangeDate}>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
            </select>
            <select name="year" defaultValue={year} onChange={onChangeDate}>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
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
                        <td><input type="number" id="adjAmount" name="adjAmount" step="0.01" onChange={onChange} value={edit ? "" : (adjAmount)} /></td>
                        <td><input type="date" id="dateIncurred" name="dateIncurred" onChange={onChange} value={edit ? "" : dateIncurred} /></td>
                        <td><button>Submit</button></td>
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
                            {edit === x._id ? <td><input type="number" id="adjAmount" name="adjAmount" step="0.01" onChange={onChange} defaultValue={x.adjAmount} /></td> : <td>{x.adjAmount}</td>}
                            {edit === x._id ? <td><input type="date" id="dateIncurred" name="dateIncurred" onChange={onChange} defaultValue={x.dateIncurred.slice(0,10)} /></td> : <td>{x.dateIncurred.slice(0,10)}</td>}
                            <td><button id={x._id} onClick={onClickDelete}>x</button></td>
                            {edit != x._id && <td><button id={x._id} onClick={onClickEdit}>Edit</button></td>}
                            {edit === x._id && <td><button id={x._id} onClick={onSubmitEdit}>Save</button></td>}
                        </tr>
                    )}
                </tbody>
            </table>
            </form>
       </div>
    )
}