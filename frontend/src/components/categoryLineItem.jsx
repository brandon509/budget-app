import Button from '../components/button'
import { useDispatch } from 'react-redux'
import { deleteAmount } from '../features/posts/postSlice'
import { useState } from 'react'

export default function CateogryLineItem({ category, data, edit }){

    const dispatch = useDispatch()

    const [isVisable, setisVisable] = useState(false)

    const onClickDelete = (e) => {
        e.preventDefault()

        dispatch(deleteAmount(e.currentTarget.id))
    }

    const onClickVisable = () => setisVisable(prev => !prev)

    let percent = (data.reduce((a,b) => a + b.adjAmount,0)/category.budget)*100
    
    return (
        <div>
            <div onClick={onClickVisable} className='category-section'>
                <h4 className='category-name'>{category.name}</h4>
                <p className='progress-bar' style={{background:`linear-gradient(to right, ${percent < 50 ? 'green' : percent < 75 ? 'yellow' : 'red'} ${percent}%, rgb(235, 235, 235) ${percent}%)`}}>{category.budget - data.reduce((a,b) => a + b.adjAmount,0)} of {category.budget} remaining</p>
            </div>
            {isVisable && <table className='data-table'>
                <thead>
                    <tr className='table-header'>
                        <th className='head'>Description</th>
                        <th className='head'>Amount</th>
                        <th className='head'>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(x => 
                        <tr key={x._id} className='table-body'>
                            <td className='body'>{x.description}</td>
                            <td className='body'>$ -{x.adjAmount}</td>
                            <td className='body'>{x.dateIncurred.slice(0,10)}</td>
                            <td className='body'>
                                <div className='modify-icons'>
                                    <Button id={x._id} click={onClickDelete} item='x' className='x-btn'/>
                                    <Button id={x._id} item='edit' className= 'edit-btn' click={() => edit(x)} />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>}
        </div>
    )
}