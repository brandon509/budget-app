import { useSelector } from 'react-redux'

export default function CateogryInput({ category, onChange, options, defaultValue }){
    console.log(defaultValue)
    console.log(options)

    const { activeCategories } = useSelector((state) => state.category)
    
    return (
        <div>
            <h5 className={category ? 'inputLabel category-label' : 'hidden'}>Category</h5>
            <select name="category" onChange={onChange} className={category ? 'select' : 'select category-placeholder'} defaultValue={defaultValue && defaultValue}>
                <option value=''>Category</option>
                {options && options.map(x => 
                    <option key={x._id} value={x._id}>{x.name}</option>
                )}
            </select>
        </div>
    )
}