"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./Context";
import { useSession } from "next-auth/react";

export const ProductContext = createContext();

const sampleProducts = [
  { id: "1", title: "Acme Wireless Headphones", short: "Comfortable wireless headphones", description: "High-quality audio with up to 30 hours battery life and quick charge.", price: "$89", image: "/assets/headphones.jpg", priority: "normal" },
  { id: "2", title: "Smartwatch Pro", short: "Track your fitness and notifications", description: "Water resistant smartwatch with heart-rate monitor and sleep tracking.", price: "$129", image: "/assets/watch.jpg", priority: "high" },
  { id: "3", title: "Mini Projector", short: "Portable mini projector", description: "1080p support, HDMI input, and compact form factor for travel.", price: "$199", image: "/assets/projector.jpg", priority: "normal" },
  { id: "4", title: "Noise-Cancelling Earbuds", short: "Tiny buds, huge sound", description: "Active noise cancellation and ergonomic fit for long listening sessions.", price: "$59", image: "/assets/earbuds.jpg", priority: "low" },
  { id: "5", title: "USB-C Hub", short: "Expand your laptop ports", description: "Multiple ports including HDMI, USB-A, Ethernet and SD card reader.", price: "$39", image: "/assets/hub.jpg", priority: "low" },
  { id: "6", title: "Ergonomic Keyboard", short: "Comfortable typing", description: "Mechanical switches with ergonomic layout and adjustable tilt.", price: "$79", image: "/assets/keyboard.jpg", priority: "normal" },
];

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(sampleProducts); // Initialize with sample products immediately
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const { data: session } = useSession();

  const server = process.env.NEXT_PUBLIC_SERVER || process.env.NEXTAUTH_API_URL || "http://localhost:5000";

  // Fetch products from server (or fallback to sample)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${server}/api/products`, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        // Merge API results with sample products for fallback
        if (Array.isArray(data)) setProducts(data);
        else if (data && Array.isArray(data.products)) setProducts(data.products);
        else setProducts(sampleProducts);
      } catch (err) {
        console.warn("Failed to fetch products from API, using sample products:", err.message);
        // Always use sample products as fallback to ensure details pages work
        setProducts(sampleProducts);
      }
    };
    fetchProducts();
  }, [server]);

  // Add a new product
  const addProduct = async (product) => {
    try {
      const body = { ...product };
      const ownerEmail = user?.email || session?.user?.email;
      const ownerName = user?.name || session?.user?.name || '';

      if (ownerEmail) {
        body.ownerEmail = ownerEmail;
        body.ownerName = ownerName;
      }

      const res = await fetch(`${server}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const created = await res.json();
      setProducts((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      return created;
    } catch (err) {
      console.error("Add product error:", err);
      return null;
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${server}/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => (Array.isArray(prev) ? prev.filter((p) => String(p.id) !== String(id) && String(p._id) !== String(id)) : []));
      return true;
    } catch (err) {
      console.error("Delete product error:", err);
      return false;
    }
  };

  // Get product by ID
  const getById = (id) => products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, getById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
