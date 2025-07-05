
import { Dashboard } from './pages/dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import SharePage from './pages/SharePage'

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/signup' element={<Signup />}/>
     <Route path='/signin' element={<Signin />}/>
      <Route path='/' element={<Dashboard />}/>
      <Route path='/api/v1/brain/:shareLink' element ={<SharePage />}/>
  </Routes>
  
  </BrowserRouter>
}

export default App
