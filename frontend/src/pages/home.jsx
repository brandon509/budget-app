import Login from '../components/login'
import { useState } from 'react'

export default function Home(){
    const [display, setDisplay] = useState(false)

    function handleClick(){
        setDisplay(display ? false : true)
    }
    
    return(
        <div>
        <p></p>
        </div>
    )
}