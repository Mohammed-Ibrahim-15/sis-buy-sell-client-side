import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()

    if (token) {
        navigate('/');
    }


    const handleRegister = (data) => {
        console.log(data)
        createUser(data.email, data.password, data.role)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully!')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserDB(data.name, data.email, data.role);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }

    const saveUserDB = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://sis-buy-sell-server-side.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)

            })
    }



    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='bg bg-base-200 shadow-2xl border-2 border-sky-300 rounded-xl px-8'>
                <h1 className='text-3xl text-center'>Register</h1>

                <form onSubmit={handleSubmit(handleRegister)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs"  {...register("name", { required: 'Name is required' })} placeholder="Write your name" />
                        {errors.name && <p role='alert' className='text-red-600'>*{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered input-primary w-full max-w-xs"  {...register("email", { required: 'Email Address is required' })} placeholder="Write your email" />
                        {errors.email && <p role='alert' className='text-red-600'>*{errors.email?.message}</p>}
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select {...register("role", { required: 'User role is required' })} name='role' className="select select-primary w-full max-w-xs">
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered input-primary w-full max-w-xs"  {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password minimum 6 character' } })} placeholder="Enter your password" />

                        {errors.password && <p role='alert' className='text-red-600'>*{errors.password?.message}</p>}
                    </div>


                    <input className='btn btn-primary w-full mt-4' value='Register' type="submit" />
                </form>
                <p className='my-2'>Already have an account? <Link className='text-primary' to='/login'>Please Login</Link> </p>
            </div>
        </div>
    );
};

export default Register;