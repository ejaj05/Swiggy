import React from 'react'
import { auth, provider } from '../../config/firebaseAuth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUserData, removeUserData } from '../../utils/reducers/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    
    return (
        <div className='mt-24'>
            <button onClick={handleLogin} className='p-4 bg-slate-400 m-6'>Google Login</button>
            <button onClick={handleLogout} className='p-4 bg-slate-400 m-6'>Logout</button>
        </div>
    )
}

export default Login