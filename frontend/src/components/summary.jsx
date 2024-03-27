import { useSelector } from "react-redux"

export default function () {
  const { data } = useSelector((state) => state.post)
  const { currentCategories } = useSelector((state) => state.category)

  let summaryObj = {}
  data.forEach((x) => {
    if (!summaryObj[x.category.name]) {
      summaryObj[x.category.name] = 0
    }

    summaryObj[x.category.name] += x.adjAmount
  })

  let summaryArray = []

  for (const x in summaryObj) {
    summaryArray.push({ category: x, amount: summaryObj[x] })
  }

  for (let i = 0; i < summaryArray.length; i++) {
    const test = currentCategories.filter(
      (x) => x.name == summaryArray[i].category
    )
    summaryArray[i].type = test[0].type
  }

  const totalExpenses = summaryArray.filter((x) => x.type === "expense")
  const income = summaryArray
    .filter((x) => x.type === "income")
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className="summary">
      <h3 className="summary-label">Monthly Summary</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td className="income-label">Income</td>
            <td className="income-value">{income}</td>
          </tr>
          {totalExpenses &&
            totalExpenses.map((x) => (
              <tr key={x.category} className="expenses">
                <td className="expense-label">{x.category}</td>
                <td className="expense-value">-{x.amount}</td>
              </tr>
            ))}
          <tr className="savings">
            <td className="savings-label">Monthly Savings</td>
            <td className="savings-value">
              ${income - totalExpenses.reduce((a, b) => a + b.amount, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
