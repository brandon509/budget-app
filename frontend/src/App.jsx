import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/header'
import Profile from './pages/profile'
import EmailVerify from './pages/emailVerify'
import Signup from './pages/signup'
import Test from './pages/test'

function App(){
  return(
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/signup' element={<Signup />} />
            {/* <Route path='/account/login' element={<Login />} /> */}
            <Route path='/:id' element={<Profile />} />
            <Route path='/verify/:id' element={<EmailVerify />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App