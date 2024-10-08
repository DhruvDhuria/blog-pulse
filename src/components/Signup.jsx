import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import {Button, Input, Logo} from '../components/index'
import { login } from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const create = async (data) => {
        setError("")
        try {
            
            const userData= await authService.createAccount(data)
            if (userData) {
                const userData = authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex justify-center items-center'>
        <div className={`w-full mx-auto max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-gray-800 dark:text-white m-8`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60 dark:text-gray-400'>
                Aldready have an account?&nbsp;
                <Link 
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover:under'
                >
                    Sign in
                </Link>
            </p>
            {error && <p className='text-center text-red-500 mt-8'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label= "Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true
                    })}
                    />
                    <Input 
                    type="email"
                    label="Email: "
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid adderess",
                        }
                    })}
                    />
                    <Input 
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true
                    })}
                    />
                    <Button type="submit" className="w-full">
                        Create account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup