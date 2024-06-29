import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Header from "./components/header"
import Profile from "./pages/profile"
import EmailVerify from "./pages/emailVerify"
import Signup from "./pages/signup"
import Login from "./pages/login"
import ForgotPassword from "./pages/forgotPassword"
import PasswordReset from "./pages/resetPassword"
import Budget from "./pages/budget"
import { useState } from "react"

function App() {
  const [isUserOptions, setIsUserOptions] = useState(false)

  let onClickNav = () => {
    setIsUserOptions(!isUserOptions)
  }

  return (
    <>
      <Router>
        <div>
          <Header onClickNav={onClickNav} isUserOptions={isUserOptions} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/signup" element={<Signup />} />
            <Route path="/account/login" element={<Login />} />
            <Route
              path="/account/password/resetRequest"
              element={<ForgotPassword />}
            />
            <Route
              path="/account/password/reset/:ident/:timeStamp/:hash"
              element={<PasswordReset />}
            />
            <Route path="/account/verify/:id" element={<EmailVerify />} />
            <Route path="/:id/profile" element={<Profile />} />
            <Route
              path="/:id/budget"
              element={
                <Budget isUserOptions={isUserOptions} onClickNav={onClickNav} />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
