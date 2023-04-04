import React from 'react'
import { Navigate } from 'react-router-dom'


function Protected({ isLogged, children }) {
    if (!isLogged) {
        return <Navigate to="/login" replace />
    }

    return children
}
export default Protected