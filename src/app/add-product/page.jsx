"use client";

import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../Context/Context";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addProduct } = useContext(ProductContext);

  const auth = useContext(AuthContext);
  const fbUser = auth?.user;
  useEffect(() => {
    if (status === "loading" || auth?.loading) return; // wait for both NextAuth and Firebase initialization
    if (status === "unauthenticated" && !fbUser) router.push("/login");
  }, [status, router, fbUser, auth?.loading]);

  const [form, setForm] = useState({ title: "", short: "", description: "", price: "", image: "", priority: "normal" });
  const [message, setMessage] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    setMessage("Product added");
    setTimeout(() => router.push('/manage-products'), 800);
  };

  if (status === "loading" || auth?.loading) return <div className="p-6">Checking session...</div>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="title" onChange={onChange} value={form.title} placeholder="Title" className="input w-full" required />
        <input name="short" onChange={onChange} value={form.short} placeholder="Short description" className="input w-full" required />
        <textarea name="description" onChange={onChange} value={form.description} placeholder="Full description" className="textarea w-full" rows={4} />
        <input name="price" onChange={onChange} value={form.price} placeholder="Price" className="input w-full" />
        <input name="image" onChange={onChange} value={form.image} placeholder="Image URL (optional)" className="input w-full" />
        <select name="priority" onChange={onChange} value={form.priority} className="select w-full">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2">
          <button className="btn btn-primary">Submit</button>
          <button type="button" className="btn" onClick={() => router.back()}>Cancel</button>
        </div>
        {message && <div className="toast toast-success mt-2">{message}</div>}
      </form>
    </main>
  );
}
