import { useSelector } from 'react-redux'

export default function CateogryInput({ category, onChange, options, defaultValue }){

    const { activeCategories } = useSelector((state) => state.category)
    
    return (
        <div className='inputParent'>
            <h5 className={category ? 'inputLabel' : 'hidden'}>Category</h5>
            <select name="category" onChange={onChange} className={category ? 'select' : 'select category-placeholder'} defaultValue={defaultValue && defaultValue}>
                <option value=''>Category</option>
                {options && options.map(x => 
                    <option key={x._id} value={x._id}>{x.name}</option>
                )}
            </select>
        </div>
    )
}