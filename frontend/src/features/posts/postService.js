import axios from 'axios'

const getAmounts = async (timePeriod) => {
    const response = await axios.get(`http://localhost:8000/amount?year=${timePeriod.year}&month=${timePeriod.month}`, { withCredentials: true })

    return response.data
}

const newAmount = async (amount) => {
    const response = await axios.post('http://localhost:8000/amount/new', amount, { withCredentials: true })
    
    return response.data
}

const updateAmount = async (amount) => {
    const response = await axios.put('http://localhost:8000/amount/update', amount, { withCredentials: true })

    return response.data
}

const deleteAmount = async (amount) => {
    console.log(amount)
    const response = await axios.delete(`http://localhost:8000/amount/delete?id=${amount}`, { withCredentials: true })

    return response.data
}

const postService = { getAmounts, newAmount, updateAmount, deleteAmount }

export default postService