import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Header from './components/header'

function App(){
  return(
    <>
      <Router>
        <div>
          {/* <Header /> */}
          <Routes>
            {/* <Route path='/' element={<Main />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/post/:id' element={<Post />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App