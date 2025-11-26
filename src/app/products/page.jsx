"use client";

import React, { useContext, useMemo, useState } from "react";
import { ProductContext } from "../Context/ProductProvider";
import Link from "next/link";

export default function ProductsPage() {
  const { products } = useContext(ProductContext);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    if (!query) return list;
    return list.filter((p) => (p.title || '').toLowerCase().includes(query.toLowerCase()));
  }, [products, query]);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Products</h1>
      <p className="text-muted mb-6">Browse our catalog — use search to filter items.</p>

      <div className="mb-6 flex gap-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="input input-bordered w-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => {
          const productId = p.id || p._id;
          return (
            <article key={productId} className="card card-compact bg-base-100 shadow hover:shadow-lg transition">
              <figure className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={p.image || '/assets/headphones.jpg'} alt={p.title} className="object-cover w-full h-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{p.title}</h2>
                <p className="line-clamp-2 text-sm text-gray-600">{p.short}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="font-semibold">{p.price}</span>
                  <Link href={`/products/${productId}`} className="btn btn-sm btn-primary">Details</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
