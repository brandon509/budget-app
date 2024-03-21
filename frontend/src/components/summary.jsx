import { useSelector } from 'react-redux'

export default function(){

    const { isError, message, data } = useSelector((state) => state.post)

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
        <div className='summary'>
            <h3 className='summary-label'>Monthly Summary</h3>
            <table className='summary-table'>
                <tbody>
                    <tr>
                        <td className='income-label'>Income</td>
                        <td className='income-value'>{income}</td>
                    </tr>
                    {totalExpenses && totalExpenses.map(x => 
                        <tr key={x.category} className='expenses'>
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
       </div>
    )
}