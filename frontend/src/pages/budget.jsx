import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount, deleteAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'

export default function(){

    const currentDate = new Date()
    
    const [month, setMonth] = useState(currentDate.getMonth())
    const [year, setYear] = useState(currentDate.getFullYear())

    const [formData, setFormData] = useState({
        description: '',
        category: '',
        amount: '',
        adjAmount: '',
        dateIncurred: ''
    })
    
    const { description, category, amount, adjAmount, dateIncurred } = formData

    const { isError, isSuccess, isLoading, message, data } = useSelector((state) => state.post)
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

    const onChange = (e) => {
        if(e.target.name === "amount" || e.target.name === "adjAmount"){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: +e.target.value
            }))
        }
        else{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
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

    const onClickDelete = (e) => {
        dispatch(deleteAmount(e.target.id))
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
                        <td><input type="text" id="description" name="description" onChange={onChange} value={description} /></td>
                        <td>
                            <select name="category" onChange={onChange}>
                            <option></option>
                                {categories && categories.map(x => 
                                    <option key={x._id} value={x._id}>{x.name}</option>
                            )}</select>
                        </td>
                        <td><input type="number" id="amount" name="amount" step="0.01" onChange={onChange} value={amount} /></td>
                        <td><input type="number" id="adjAmount" name="adjAmount" step="0.01" onChange={onChange} value={adjAmount} /></td>
                        <td><input type="date" id="dateIncurred" name="dateIncurred" onChange={onChange} value={dateIncurred} /></td>
                        <td><button>Submit</button></td>
                    </tr>
                    {data && data.map(x => 
                        <tr key={x._id}>
                            <td>{x.description}</td>
                            <td>{x.category.name}</td>
                            <td>{x.amount}</td>
                            <td>{x.adjAmount}</td>
                            <td>{x.dateIncurred.slice(0,10)}</td>
                            <td><button id={x._id} onClick={onClickDelete}>x</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            </form>
       </div>
    )
}