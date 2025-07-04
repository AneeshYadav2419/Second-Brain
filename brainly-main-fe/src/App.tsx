
import { Dashboard } from './pages/dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { BrowserRouter, Route,Routes } from 'react-router-dom'

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/signup' element={<Signup />}/>
     <Route path='/signin' element={<Signin />}/>
      <Route path='/' element={<Dashboard />}/>
  </Routes>
  
  </BrowserRouter>
}

export default App
