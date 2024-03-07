import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk, faPlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons'

export default function Button({ id, click, item, className }){

    const icons = {
        x: faX,
        edit: faPenToSquare,
        save: faFloppyDisk,
        new: faPlus,
        group: faLayerGroup
    }
    
    return (
        <button id={id} onClick={click} className={`btn ${className}`}>
            <FontAwesomeIcon icon={icons[item]} />
        </button>
    )
}