import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import NomatchRoute from './NomatchRoute'
import AuthContainer from '../Pages/AuthContainer'
import ProtectedRoute from './ProtectedRoute'

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/login' element={<AuthContainer />} />
      <Route path='/registration' element={<AuthContainer />} />
      <Route path='*' element={<NomatchRoute />} />
    </Routes>
  )
}
export default Routing