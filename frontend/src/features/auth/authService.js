import axios from 'axios'

const login = async (user) => {
    const response = await axios.post('http://localhost:8000/login', user, {withCredentials: true})

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

const signup = async (user) => {
    const response = await axios.post('http://localhost:8000/newUser', user, {withCredentials: true})
    
    return response.data
}

const loginGoogle = async () => {
    const response = await axios.get('http://localhost:8000/auth/google')

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const verifyEmail = async (id) => {
    const response = await axios.put(`http://localhost:8000/verify/${id}`)

    return response.data
}

const logout = async () => {
    const response = await axios.get('http://localhost:8000/logout', {withCredentials: true})

    if(response.data){
        localStorage.removeItem('user')
    }

    return response.data
}

const authService = { login, signup, loginGoogle, verifyEmail, logout }

export default authService