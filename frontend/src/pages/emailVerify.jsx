import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { verifyEmail } from "../features/auth/authSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function EmailVerify() {
  const [error, setError] = useState("")

  const params = useParams()
  const dispatch = useDispatch()

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      if (message.includes("401")) {
        setError("Email already verified, please log in to continue.")
      } else {
        setError("404: Page not found")
      }
    }

    dispatch(verifyEmail(params.id))
  }, [isError])

  return (
    <div className="email-verify">
      {isSuccess && (
        <div className="email-verify-success">
          <div>
            <FontAwesomeIcon className="success-icon" icon={faCircleCheck} />
            <p className="success">Success! Your email has been verified.</p>
          </div>
          <p className="success-signin">Log in to continue.</p>
        </div>
      )}
      {isError && <p className="email-verify-error">{error}</p>}
    </div>
  )
}
