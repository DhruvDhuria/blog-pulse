import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import './App.css'
import authService from './appwrite/auth'
import appwriteService from './appwrite/config'
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'
import { setPost } from './store/postSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const themeMode = useSelector((state) => state.theme.theme)
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

  useEffect(() => {
    document.querySelector('html').classList.remove('light', "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white dark:bg-gray-900 dark:text-white'>
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
