export default function Header(){
    const path = window.location.pathname
    console.log(path)
    return(
        // <div>
        //     {path != '/' && 
        //         <h1>Budgey</h1>
        //     }
        // </div>
        <h1>Budgey</h1>
    )
}