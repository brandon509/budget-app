import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function(){

    const currentDate = new Date()
    
    const [month, setMonth] = useState(currentDate.getMonth()+1)
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

    const dispatch = useDispatch()
    const timePeriod = { month: month, year: year}

    useEffect(() => {
        if(isError){
            console.log(message)
        }
        dispatch(getAmounts(timePeriod))
        
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

    return (
       <div>
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
                        <td><input type="text" id="category" name="category" list="category" onChange={onChange} value={category} /></td>
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
                        </tr>
                    )}
                </tbody>
            </table>
            </form>
       </div>
    )
}