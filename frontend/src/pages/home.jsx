import Login from '../components/login'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Home(){
    const [display, setDisplay] = useState(false)

    function handleClick(){
        setDisplay(display ? false : true)
    }
    
    return(
        <div>
        
        </div>
    )
}