import React from 'react'
import spin from './spin.gif'
const Spinner = ()=> {
        return (
        <div className='text-center d-flex align-items-center justify-content-center' style={{height: "75vh"}}>
            <img src={spin} alt="spinner" />
        </div>
        )
}

export default Spinner
