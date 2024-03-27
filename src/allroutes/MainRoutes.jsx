import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}

export default MainRoutes