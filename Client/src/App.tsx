import './App.css'
import { StateProvider } from './Context API/StateContext'
import Dashboard from './pages/dashboard'
import ErrorRoute from './pages/ErrorRouter'
import { Landing } from './pages/Landing'
import SharedBrain from './pages/SharedBrain'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
 return <StateProvider>
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Landing/>}/>
            <Route path='/signin' element = {<Signin/>}/>
            <Route path='/signup' element = {<Signup/>}/>
            <Route path='/home' element = {<Dashboard/>}/>
            <Route path='/share/:shareId' element = {<SharedBrain/>}/>
            <Route path='*' element = {<ErrorRoute/>}/>
        </Routes>
    </BrowserRouter>
 </StateProvider>
}
export default App