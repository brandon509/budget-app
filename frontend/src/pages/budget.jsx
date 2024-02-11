import { useState, useEffect } from 'react'
import { getAmounts } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'
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

    const { isError, isLoading, message, data } = useSelector((state) => state.post)
    const { currentCategories } = useSelector((state) => state.category)

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

    const totalExpenses = summaryArray.filter(x => x.category != 'Income')
    const income = summaryArray.filter(x => x.category === 'Income').reduce((a,b) => a + b.amount,0)

    return (
        <div className='big'>
       <div className='test'>
            <Modal type='new' />      
            <form className='date-input-form'>
                <select name="month" defaultValue={month} onChange={onChangeDate} className='date-input input'>
                    {monthOptions.map((x,i) => <option key={i} value={i}>{x}</option>)}
                </select>
                <select name="year" defaultValue={year} onChange={onChangeDate} className='date-input input'>
                    {yearOptions.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </form>
            <h3 className='summary-label'>Monthly Summary</h3>
            <table className='summary'>
                <tbody>
                    <tr>
                        <td className='income-label'>Income</td>
                        <td className='income-value'>{income}</td>
                    </tr>
                    {totalExpenses && totalExpenses.map(x => 
                        <tr key={x.category}>
                            <td className='expense-label'>{x.category}</td>
                            <td className='expense-value'>-{x.amount}</td>
                        </tr>
                    )}
                    <tr className='savings'>
                        <td className='savings-label'>Monthly Savings</td>
                        <td className='savings-value'>${income - totalExpenses.reduce((a,b) => a + b.amount,0)}</td>
                    </tr>
                </tbody>
            </table>
            {currentCategories && currentCategories.map(x => 
                <CateogryLineItem key={x._id} category={x} data={data.filter(y => y.category._id === x._id)} /> )}
       </div>
       <div className='tester'>
        <h1 className='cat'>Categories</h1>
       </div>
       </div>
    )
}