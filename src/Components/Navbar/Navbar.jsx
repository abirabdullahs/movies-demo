"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "@/app/Context/Context";

const Navbar = () => {
    const { data: session, status } = useSession();
    const { user: fbUser, signOutUser } = useContext(AuthContext);

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-lg">
                        ShopDemo
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <Link href="/products" className="hover:underline">Products</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {!session && !fbUser && (
                        <>
                            <Link href="/login" className="btn btn-ghost">Login</Link>
                            <Link href="/register" className="btn btn-outline">Register</Link>
                        </>
                    )}

                    {(session || fbUser) && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex="0" className="btn btn-secondary rounded-full">
                                {session ? (session.user?.name ? session.user.name.split(" ")[0] : session.user?.email) : (fbUser?.name || fbUser?.email)}
                            </label>
                            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link href="/profile">Profile</Link></li>
                                <li><Link href="/add-product">Add Product</Link></li>
                                <li><Link href="/manage-products">Manage Products</Link></li>
                                <li>
                                    {session ? (
                                        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
                                    ) : (
                                        <button onClick={() => signOutUser().then(() => location.reload())}>Sign out</button>
                                    )}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;