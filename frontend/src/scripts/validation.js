export function emptyInputVal (input){
    return input.length >= 1
}

export function emailVal (email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function passwordVal (password){
    return password.length >= 8 && password.match(/[0-9]/) && password.match(/[A-Z]/) && password.match(/[^A-Z0-9]/i)
}

export function confirmPasswordVal (password, confirmPassword){
    return password === confirmPassword
}