"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsClient({ product }) {
  const router = useRouter();
    console.log(product);
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button onClick={() => router.back()} className="btn btn-ghost">
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-muted my-2">
            {product.price} • Priority: {product.priority}
          </p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
      </div>
    </main>
  );
}
