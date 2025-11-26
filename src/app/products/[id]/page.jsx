import React from "react";
import Link from "next/link";
import ProductDetailsClient from "./ProductDetailsClient";

// Sample products data (same as in ProductProvider for static generation)
const sampleProducts = [
  { id: "1", title: "Acme Wireless Headphones", short: "Comfortable wireless headphones", description: "High-quality audio with up to 30 hours battery life and quick charge.", price: "$89", image: "/assets/headphones.jpg", priority: "normal" },
  { id: "2", title: "Smartwatch Pro", short: "Track your fitness and notifications", description: "Water resistant smartwatch with heart-rate monitor and sleep tracking.", price: "$129", image: "/assets/watch.jpg", priority: "high" },
  { id: "3", title: "Mini Projector", short: "Portable mini projector", description: "1080p support, HDMI input, and compact form factor for travel.", price: "$199", image: "/assets/projector.jpg", priority: "normal" },
  { id: "4", title: "Noise-Cancelling Earbuds", short: "Tiny buds, huge sound", description: "Active noise cancellation and ergonomic fit for long listening sessions.", price: "$59", image: "/assets/earbuds.jpg", priority: "low" },
  { id: "5", title: "USB-C Hub", short: "Expand your laptop ports", description: "Multiple ports including HDMI, USB-A, Ethernet and SD card reader.", price: "$39", image: "/assets/hub.jpg", priority: "low" },
  { id: "6", title: "Ergonomic Keyboard", short: "Comfortable typing", description: "Mechanical switches with ergonomic layout and adjustable tilt.", price: "$79", image: "/assets/keyboard.jpg", priority: "normal" },
];

// Generate static params for all products (enables static generation)
export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: String(product.id),
  }));
}

// Enable ISR (Incremental Static Regeneration) - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export const metadata = {
  title: "Product Details",
  description: "View detailed information about our products",
};

async function getProductData(id) {
  // Try to fetch from server API
  const server = process.env.NEXT_PUBLIC_SERVER || process.env.NEXTAUTH_API_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${server}/api/products/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn(`Failed to fetch product ${id} from API:`, err.message);
  }

  // Fallback to sample products
  return sampleProducts.find((p) => String(p.id) === String(id));
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  console.log(id);
  const product = await getProductData(id);

  console.log(product);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600 mb-4">We couldn&apos;t find the product you&apos;re looking for. Try browsing our catalog or going back.</p>
        <div className="flex gap-2">
          <Link href="/products" className="btn btn-primary">Browse all products</Link>
        </div>
      </main>
    );
  }

  // Pass product data to client component
  return <ProductDetailsClient product={product} />;
}
