import {Route, Routes} from 'react-router-dom'
import Register from './Register'
import Login from './Login'


export default function AllRoute() {
    return (
        <Routes>
            <Route path="/Login" element={<Login/>} />
            <Route path='/register' element={<Register/>}/>
        </Routes>
    );
}