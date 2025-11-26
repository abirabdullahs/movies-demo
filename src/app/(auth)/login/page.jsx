"use client";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/Context/Context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const onSubmit = async (data) => {
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            if (res?.ok) {
                showToast('Login successful', 'success');
                router.push(res.url || '/');
            } else {
                console.error('Login failed', res);
                showToast('Login failed', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast(err.message || 'Login error', 'error');
        }
    };
    const { googleSignIn } = useContext(AuthContext);

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

                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className='text-red-500'>Password is required</p>}

                    <button className="btn btn-neutral mt-4 w-full">Login</button>

                    <div className="divider">OR</div>
                    <button type="button" onClick={onGoogle} className="btn btn-outline w-full">Continue with Google</button>

                    {
                        loggedIn && <div className="text-red-500">You are Already Logged In</div>
                    }

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

export default Login;
