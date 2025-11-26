"use client";



import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/Context/Context';

const Register = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const { googleSignIn } = useContext(AuthContext);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/register`, data);
            console.log(res.data);
            showToast('Registration successful', 'success');
            // redirect to home after successful signup
            router.push('/');
        } catch (error) {
            console.log(error.response?.data || error.message);
            showToast(error.response?.data?.message || error.message || 'Registration failed', 'error');
        }
    };

    const onGoogle = async () => {
        try {
            const fbUser = await googleSignIn();
            // send to backend to create/find user
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER || process.env.NEXTAUTH_API_URL || 'http://localhost:5000'}/api/auth/firebase`, {
                uid: fbUser.uid,
                email: fbUser.email,
                name: fbUser.displayName,
            });
            showToast('Google sign-in successful', 'success');
            router.push('/');
        } catch (err) {
            console.error(err);
            showToast(err.message || 'Google sign-in failed', 'error');
        }
    };

    
    return (
        <div className='flex justify-center items-center max-w-7xl mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">




                    <label className="label">Name</label>
                    <input type="text" className="input" placeholder="Name" {...register("name")} />



                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" {...register("email", { required: true })} />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}


                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        {...register("password", {
                            required: true

                        })}
                    />
                    {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}



                    <div><a className="link link-hover">Forgot password?</a></div>
                    <div className='flex items-center'> <button className="btn btn-neutral mt-4 mx-20 w-50 text-xl text-white">Register</button></div>

                    <div className="divider">OR</div>
                    <button type="button" onClick={onGoogle} className="btn btn-outline w-full">Continue with Google</button>

                    {toast.show && (
                        <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'} mt-4`}>
                            <div className="alert">
                                <span>{toast.message}</span>
                            </div>
                        </div>
                    )}
                </fieldset>
            </form>
        </div>
    );
};

export default Register;