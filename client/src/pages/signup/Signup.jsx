import React, { useState } from 'react'
import GenderCheckBox from './components/GenderRadio'
import { Link } from 'react-router-dom'
import { useSignup } from '../../../hooks/useSignup';

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const { signup, loading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(inputs);

    }


    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-2xl shadow-md backdrop-blur-lg border border-white/30'>
                <h1 className='text-4xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-500 '> Chat Application</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full name</span>
                        </label>
                        <input type="text" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} placeholder="Enter full name" className='w-full input input-bordered h-10'/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} placeholder="Enter username" className='w-full input input-bordered h-10'/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder="Enter password" className='w-full input input-bordered h-10'/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} placeholder="Confirm password" className='w-full input input-bordered h-10'/>
                    </div>

                    <GenderCheckBox
                        value={inputs.gender}
                        onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                    />

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Signup