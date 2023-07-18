import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/header'

function App(){
  return(
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/profile/:id' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/post/:id' element={<Post />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App