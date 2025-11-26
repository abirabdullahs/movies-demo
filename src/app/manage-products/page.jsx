"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductContext } from "../Context/ProductProvider";
import Link from "next/link";
import { AuthContext } from "../Context/Context";

export default function ManageProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { products, deleteProduct } = useContext(ProductContext) || { products: [], deleteProduct: () => {} };
  const auth = useContext(AuthContext);
  const fbUser = auth?.user;

  const [localProducts, setLocalProducts] = useState(Array.isArray(products) ? products : []);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "loading" || auth?.loading) return;
    if (status === "unauthenticated" && !fbUser) router.push('/login');
  }, [status, fbUser, auth?.loading, router]);

  // Keep localProducts in sync with context products
  useEffect(() => {
    setLocalProducts(Array.isArray(products) ? products : []);
  }, [products]);

  if (status === "loading" || auth?.loading) return <div className="p-6">Checking session...</div>;

  // Confirmation modal (SweetAlert2 if available, fallback to confirm)
  const showConfirm = async (options = {}) => {
    try {
      const Swal = (await import('sweetalert2')).default;
      return await Swal.fire({
        title: options.title || 'Are you sure?',
        text: options.text || 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: options.confirmText || 'Yes, delete it',
        cancelButtonText: options.cancelText || 'Cancel',
      }).then(res => res.isConfirmed);
    } catch (e) {
      if (typeof window !== 'undefined' && window.Swal) {
        return await window.Swal.fire({
          title: options.title || 'Are you sure?',
          text: options.text || 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: options.confirmText || 'Yes, delete it',
          cancelButtonText: options.cancelText || 'Cancel',
        }).then(res => res.isConfirmed);
      }
      return confirm(options.text || 'Delete this item?');
    }
  };

  // Handle delete with optimistic UI
  const handleDelete = async (id) => {
    const confirmed = await showConfirm({ title: 'Delete product', text: 'Delete this product? This action cannot be undone.' });
    if (!confirmed) return;

    const previous = localProducts;
    setLocalProducts(prev => prev.filter(p => String(p.id || p._id) !== String(id)));

    try {
      const ok = await deleteProduct(id);
      if (!ok) setLocalProducts(previous);
    } catch (err) {
      console.error(err);
      setLocalProducts(previous);
      try { alert('Could not delete product'); } catch (e) {}
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href="/add-product" className="btn btn-primary">Add Product</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {localProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-600">
                  No products found. Add one from the button above.
                </td>
              </tr>
            ) : (
              localProducts.map(p => (
                <tr key={p.id || p._id} className="hover">
                  <td>{p.title}</td>
                  <td>{p.price}</td>
                  <td>{p.priority}</td>
                  <td className="flex gap-2">
                    <Link href={`/products/${p.id || p._id}`}>
                      <button className="btn btn-sm">View</button>
                    </Link>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(p.id || p._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
