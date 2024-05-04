import { useSelector } from "react-redux"
import { currencyFormatter } from "../scripts/currencyFormatter"
import { useState } from "react"
import TextInput from "./textInput"

export default function () {
  const { data } = useSelector((state) => state.post)
  const { currentCategories } = useSelector((state) => state.category)
  const { investments } = useSelector((state) => state.investment)

  const [price, setPrice] = useState({})

  const onChange = (e) => {
    setPrice((prevState) => ({
      ...prevState,
      [e.target.id]: +e.target.value,
    }))
  }

  const priceInfo = {
    label: "Price",
    type: "number",
    name: "price",
    handleChange: onChange,
    validation: true,
    errorMessage: null,
  }

  return (
    <div className="side-panel">
      <h3 className="side-panel-label">Investments</h3>
      <div className="investment-table">
        {currentCategories
          .filter((x) => x.type === "investment")
          .map((y) => (
            <div key={y._id}>
              <h4 className="investment-category-name">
                {y.name}:{" "}
                {currencyFormatter(
                  data
                    .filter((x) => x.category._id === y._id)
                    .reduce((a, b) => a + b.amount, 0)
                )}
              </h4>
              {investments
                .filter((z) => z.investmentType._id === y._id)
                .map((zz) => (
                  <div key={zz._id} className="investment-content">
                    <p className="ticker">{zz.ticker}</p>
                    <TextInput {...priceInfo} id={zz._id} />
                    <p className="shares">
                      {price[zz._id]
                        ? Math.floor(
                            (data
                              .filter((x) => x.category._id === y._id)
                              .reduce((a, b) => a + b.amount, 0) *
                              zz.percentage) /
                              price[zz._id]
                          )
                        : 0}{" "}
                      shares
                    </p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}
