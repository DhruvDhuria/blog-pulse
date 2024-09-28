import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white shadow-md hover:bg-gray-100 border-slate-900 rounded-xl p-4 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl'
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard