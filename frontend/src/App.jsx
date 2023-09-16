import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/header'
import Profile from './pages/profile'
import EmailVerify from './pages/emailVerify'

function App(){
  return(
    <>
      <Router>
        <div>
          {window.location.pathname !== '/' ? <Header />: null}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Profile />} />
            <Route path='/verify/:id' element={<EmailVerify />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App