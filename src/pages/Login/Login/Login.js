import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    if (token) {
        navigate(from, { replace: true })
    }

    const handleLogin = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                setLoginUserEmail(data.email)

            })
            .catch(err => console.error(err))
    }

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user)

                saveUserDB(user.displayName, user.email, 'Buyer');

            })
            .catch(err => {
                console.error(err)
            })
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
                setLoginUserEmail(email)
                console.log('saveUserDB', data)

            })
    }

    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='bg bg-base-200 shadow-2xl border-2 border-sky-300 rounded-xl px-12 py-8'>
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
                <button onClick={handleGoogle} className='btn btn-outline btn-accent w-full'>Google Login</button>
            </div>
        </div>
    );
};

export default Login;