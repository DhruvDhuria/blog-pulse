import React from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import ThemeBtn from './ThemeBtn.jsx'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Post",
      slug: '/add-post',
      active: authStatus
    }
  ]

  return (
    <header className='py3 shadow bg-white p-4 border-b-4 border-slate-900 dark:border-slate-50 dark:bg-gray-900 dark:text-white'>
      <Container>
        <nav className='flex justify-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <NavLink to={item.slug} key={item.name} className={({isActive}) => `${isActive ? 'bg-black text-white rounded-2xl dark:bg-slate-50 dark:text-black' : ''}`}>
                  <button className='inline-block px-6 py-2 duration-200'
                  >{item.name}</button>
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <li><LogoutBtn /></li>
            )}
          </ul>
          <div><ThemeBtn /></div>
        </nav>
      </Container>
    </header>
  )
}

export default Header