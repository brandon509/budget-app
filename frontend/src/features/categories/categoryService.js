import axios from 'axios'

const getCategories = async () => {
    const response = await axios.get('http://localhost:8000/category', { withCredentials: true })

    return response.data
}

const newCategory = async (category) => {
    const response = await axios.post('http://localhost:8000/category/new', category, { withCredentials: true })

    return response.data
}