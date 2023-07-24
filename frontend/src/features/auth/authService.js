import axios from 'axios'

//Log in
const login = async (user) => {
    const response = await axios.post('http://localhost:8000/login', user, {withCredentials: true})

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

const authService = { login }

export default authService