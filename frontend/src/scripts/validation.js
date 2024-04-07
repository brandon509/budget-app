export function emptyInputVal(input) {
  return input.length >= 1
}

export function emailVal(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function passwordVal(password) {
  return (
    password.length >= 8 &&
    password.match(/[0-9]/) &&
    password.match(/[A-Z]/) &&
    password.match(/[^A-Z0-9]/i)
  )
}

export function confirmPasswordVal(password, confirmPassword) {
  return password === confirmPassword
}

export function decimalVal(num) {
  const stringNum = String(num)

  if (stringNum.replaceAll(".", "") != stringNum) {
    const split = stringNum.split(".")
    if (split[1].length > 2) {
      const newNum = stringNum.slice(0, split[0].length + 3)
      return newNum
    }
  }
  return stringNum
}
