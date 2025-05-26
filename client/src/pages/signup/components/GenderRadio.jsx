import React from 'react'

const GenderRadio = () => {
  return (
    <div className='flex m-2 space-x-3'>
        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text'>Male</span>
                <input type="radio" className='checkbox border-slate-900' name='gender' />
            </label>
        </div>

        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text'>Female</span>
                <input type="radio" className='checkbox border-slate-900' name='gender' />
            </label>
        </div>

    </div>
  )
}

export default GenderRadio