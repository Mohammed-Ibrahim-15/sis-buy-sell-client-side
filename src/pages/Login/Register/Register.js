import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleRegister = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully!')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => { })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='border-4 border-sky-300 rounded-xl p-4 my-6'>
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
                        <select name='role' className="select select-primary w-full max-w-xs">
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
                <p>Already have an account? <Link className='text-primary' to='/login'>Please Login</Link> </p>
            </div>
        </div>
    );
};

export default Register;