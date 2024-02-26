import React from 'react'
import { Link } from 'react-router-dom'
import './errorpage.css'

const ErrorPage = () => {
  return (
    <div className='error__page'>
      <h1>404</h1>
      <p>Page not found</p>
      <div className="back">
        <Link className='link' to="/">Back to Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage