import { useState, useEffect } from 'react'
import { reset, getAmounts, newAmount, deleteAmount, updateAmount } from '../features/posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/categories/categorySlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

export default function Button({ id, click, item }){

    const icons = {
        x: faX,
        edit: faPenToSquare,
        save: faFloppyDisk
    }
    
    return (
        <button id={id} onClick={click} className={`btn ${item}-btn`}>
            <FontAwesomeIcon icon={icons[item]} />
        </button>
    )
}