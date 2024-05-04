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
    <div className="side-panel">
      <h3 className="side-panel-label">Monthly Savings</h3>
      <table className="side-panel-table">
        <tbody>
          <tr>
            <td className="label">Availible</td>
            <td className="value">
              {currencyFormatter(income - totalExpenses)}
            </td>
          </tr>
          {totalSavings &&
            totalSavings.map((x) => (
              <tr key={x.category} className="expenses">
                <td className="label">{x.category}</td>
                <td className="value">{currencyFormatter(-x.amount)}</td>
              </tr>
            ))}
          <tr className="savings">
            <td className="label savings-label">Remaining</td>
            <td className="value savings-value">
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
