import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function PasswordRequirements({ password, confirmPassword }){

    return(
        <ul className='pswd-require'>
            <li><FontAwesomeIcon icon={password.length >= 8 ? faCircleCheck : faCircleXmark} className={password.length >= 8 ?'pswd-icon-check' : 'pswd-icon-x'} />Be at least 8 characters</li>
            <li><FontAwesomeIcon icon={password.match(/[0-9]/) ? faCircleCheck : faCircleXmark} className={password.match(/[0-9]/) ?'pswd-icon-check' : 'pswd-icon-x'} />Contain at least one number</li>
            <li><FontAwesomeIcon icon={password.match(/[A-Z]/) ? faCircleCheck : faCircleXmark} className={password.match(/[A-Z]/) ?'pswd-icon-check' : 'pswd-icon-x'} />Contain at least one uppercase</li>
            <li><FontAwesomeIcon icon={password.match(/[^A-Z0-9]/i) ? faCircleCheck : faCircleXmark} className={password.match(/[^A-Z0-9]/i) ?'pswd-icon-check' : 'pswd-icon-x'} />Contain at least one special character</li>
            <li><FontAwesomeIcon icon={password === confirmPassword && confirmPassword.length > 0 ? faCircleCheck : faCircleXmark} className={password === confirmPassword && confirmPassword.length > 0 ?'pswd-icon-check' : 'pswd-icon-x'} />Passwords match</li>
        </ul>
    )
}