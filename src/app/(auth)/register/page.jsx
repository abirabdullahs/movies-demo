"use client";



import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/register`, data);
            console.log(res.data);
            // Optionally: redirect to login page
        } catch (error) {
            console.log(error.response?.data || error.message);
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
                </fieldset>
            </form>
        </div>
    );
};

export default Register;