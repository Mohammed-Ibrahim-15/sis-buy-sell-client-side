import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleLogin = data => {
        console.log(data)
    }

    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='border-4 border-sky-300 rounded-xl p-4 my-6'>
                <h1 className='text-3xl text-center'>Login</h1>

                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered input-primary w-full max-w-xs"  {...register("email", { required: 'Email Address is required' })} placeholder="Write your email" />
                        {errors.email && <p role='alert' className='text-red-600'>*{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered input-primary w-full max-w-xs"  {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password minimum 6 character' } })} placeholder="Enter your password" />
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                        {errors.password && <p role='alert' className='text-red-600'>*{errors.password?.message}</p>}
                    </div>


                    <input className='btn btn-primary w-full' value='Login' type="submit" />
                </form>
                <p>New user? <Link className='text-primary' to='/register'>Create an Account</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-accent w-full'>Google Login</button>
            </div>
        </div>
    );
};

export default Login;