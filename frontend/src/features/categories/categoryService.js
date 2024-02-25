import axios from 'axios'

const getCategories = async (timePeriod) => {
    const response = await axios.get(`http://localhost:8000/category?year=${timePeriod.year}&month=${timePeriod.month}`, { withCredentials: true })
    
    return response.data
}

const newCategory = async (category) => {
    const response = await axios.post('http://localhost:8000/category/new', category, { withCredentials: true })

    return response.data
}

const deleteCategory = async (category) => {
    const response = await axios.put('http://localhost:8000/category/delete', category, { withCredentials: true })

    return response.data
}

const updateCategory = async (category) => {
    const response = await axios.put('http://localhost:8000/category/update', category, { withCredentials: true })
    console.log(response.data)
    return response.data
}

const categoryService = { getCategories, newCategory, deleteCategory, updateCategory }

export default categoryService