"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductContext } from "../../Context/ProductProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const context = useContext(ProductContext);
  const getById = context?.getById;
  const products = context?.products;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading while params are being resolved or products are being fetched
  if (!mounted || !id || !products) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </main>
    );
  }

  const product = getById(id);
  if (!product) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600 mb-4">We couldn't find the product you're looking for. Try browsing our catalog or going back.</p>
        <div className="flex gap-2">
          <button onClick={() => router.back()} className="btn btn-ghost">Go back</button>
          <button onClick={() => router.push('/products')} className="btn btn-primary">Browse all products</button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button onClick={() => router.back()} className="btn btn-ghost">Back</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-96 object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-muted my-2">{product.price} • Priority: {product.priority}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
      </div>
    </main>
  );
}
