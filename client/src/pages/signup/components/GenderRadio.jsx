import React from 'react'

const GenderRadio = ({ value, onChange }) => {
  return (
    <div className='flex m-2 space-x-3'>
        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text'>Male</span>
                <input
                    type="radio"
                    className='radio border-slate-900'
                    name='gender'
                    value="Male"
                    checked={value === "Male"}
                    onChange={onChange}
                />
            </label>
        </div>

        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text'>Female</span>
                <input
                    type="radio"
                    className='radio border-slate-900'
                    name='gender'
                    value="Female"
                    checked={value === "Female"}
                    onChange={onChange}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderRadio
