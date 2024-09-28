import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import appwriteService from './appwrite/config'
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'
import { setPost } from './store/postSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))

    appwriteService.getPosts()
    .then((posts) => {
      if (posts) {
        dispatch(setPost(posts.documents))
      }
    })
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
