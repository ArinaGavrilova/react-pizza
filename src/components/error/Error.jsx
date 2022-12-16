import './error.scss'
import React from 'react'


const Error = () => {
  return (
    <div className='error'>
        <h1>
            <span>😞</span>
            <br />
            Nothing found
        </h1>
        <p className='description'>Unfortunately, there is no such page on our website</p>
    </div>
  )
}

export default Error;
