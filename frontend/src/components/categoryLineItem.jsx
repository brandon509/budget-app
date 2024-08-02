import Button from "../components/button"
import { useDispatch } from "react-redux"
import { deleteAmount } from "../features/posts/postSlice"
import { useState, useEffect } from "react"
import { currencyFormatter } from "../scripts/currencyFormatter"

export default function CateogryLineItem({ category, data, edit, expandAll }) {
  const dispatch = useDispatch()

  const [isVisable, setIsVisable] = useState(false)

  useEffect(() => {
    setIsVisable(expandAll)
  }, [expandAll])

  const onClickDelete = (e) => {
    e.preventDefault()

    dispatch(deleteAmount(e.currentTarget.id))
  }

  const onClickVisable = () => {
    setIsVisable((prev) => !prev)
  }

  let percent =
    (data.reduce((a, b) => a + b.adjAmount, 0) / category.budget) * 100

  return (
    <div>
      <div onClick={onClickVisable} className="category-section">
        <h4 className="category-name">
          {category.name}: {category.budget}
        </h4>
        <p
          className="progress-bar"
          style={{
            background: `linear-gradient(to right, ${
              percent <= 100 ? "#366a21" : "#ca4139"
            } ${percent}%, rgb(235, 235, 235) ${percent}%)`,
          }}
        >
          {currencyFormatter(
            category.budget - data.reduce((a, b) => a + b.adjAmount, 0)
          )}{" "}
          remaining
        </p>
      </div>
      {isVisable && data.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr className="table-header">
              <th className="head">Description</th>
              <th className="head">Amount</th>
              <th className="head">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x) => (
                <tr key={x._id} className="table-body">
                  <td className="body">{x.description}</td>
                  <td className="body">{currencyFormatter(-x.adjAmount)}</td>
                  <td className="body">{x.dateIncurred.slice(0, 10)}</td>
                  <td className="body">
                    <div className="modify-icons">
                      <Button
                        id={x._id}
                        click={onClickDelete}
                        item="x"
                        className="x-btn"
                      />
                      <Button
                        id={x._id}
                        item="edit"
                        className="edit-btn"
                        click={() => edit("form", x)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : isVisable ? (
        <p className="no-items">No items yet.</p>
      ) : null}
    </div>
  )
}
