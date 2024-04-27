import { useSelector } from "react-redux"
import { currencyFormatter } from "../scripts/currencyFormatter"

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

  const totalSavings = summaryArray.filter(
    (x) => x.type === "savings" || x.type === "investment"
  )
  const totalExpenses = summaryArray
    .filter((x) => x.type === "expense")
    .reduce((a, b) => a + b.amount, 0)
  const income = summaryArray
    .filter((x) => x.type === "income")
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className="summary">
      <h3 className="summary-label">Monthly Savings</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td className="income-label">Availible</td>
            <td className="income-value">
              {currencyFormatter(income - totalExpenses)}
            </td>
          </tr>
          {totalSavings &&
            totalSavings.map((x) => (
              <tr key={x.category} className="expenses">
                <td className="expense-label">{x.category}</td>
                <td className="expense-value">
                  {currencyFormatter(-x.amount)}
                </td>
              </tr>
            ))}
          <tr className="savings">
            <td className="savings-label">Remaining</td>
            <td className="savings-value">
              {currencyFormatter(
                income -
                  totalExpenses -
                  totalSavings.reduce((a, b) => a + b.amount, 0)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
