import axios from "axios"

const getInvestments = async () => {
  const response = await axios.get(`http://localhost:8000/investment`, {
    withCredentials: true,
  })

  return response.data
}

const newInvestment = async (investment) => {
  const response = await axios.post(
    "http://localhost:8000/investment/new",
    investment,
    { withCredentials: true }
  )

  return response.data
}

const deleteInvestment = async (investment) => {
  const response = await axios.delete(
    `http://localhost:8000/investment/delete?id=${investment.id}`,
    { withCredentials: true }
  )

  return response.data
}

const updateInvestment = async (investment) => {
  const response = await axios.put(
    "http://localhost:8000/investment/update",
    investment,
    { withCredentials: true }
  )
  return response.data
}

const categoryService = {
  getInvestments,
  newInvestment,
  deleteInvestment,
  updateInvestment,
}

export default categoryService
