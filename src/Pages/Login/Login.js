import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading/Loading"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../CustomHooks/useToken';

const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, userG, loadingG, errorG] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // getting token
    const [token] = useToken(user || userG)

    let errorMsg;
    if (error || errorG) {
        errorMsg = <p className='text-red-500'>Error: {error?.message || errorG?.message}</p>
    }

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }

    // As not working(correct)
    // if (token) {
    //     navigate(from, { replace: true });
    // }

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    if (loading || loadingG) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="font-bold text-center text-2xl">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email validation*/}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is a required field'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Please provide an valid email address'
                                    }
                                })} />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className='label-text-alt text-red-500'>{errors.email.message}</span>}
                            </label>
                        </div>
                        {/* Password validation */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is a required field'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })} />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='label-text-alt text-red-500'>{errors.password.message}</span>}
                            </label>
                        </div>
                        {errorMsg}
                        <input className='btn w-full max-w-xs mt-4' type="submit" value="login" />
                        <p className='mt-2 text-center'><small>New to Doctors portal? <Link
                            className='text-primary'
                            to="/register">Sign up now!</Link></small></p>
                    </form>
                    <div className='divider'>Or</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >Sign In With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;