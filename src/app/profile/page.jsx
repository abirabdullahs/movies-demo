"use client";

import React, { useContext, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { AuthContext } from "@/app/Context/Context";
import { ProductContext } from "@/app/Context/ProductProvider";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { products } = useContext(ProductContext);

  const user = auth?.user;

  const name = session?.user?.name || user?.name || null;
  const email = session?.user?.email || user?.email || null;
  const photo = session?.user?.image || user?.photoURL || null;

  const myProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    if (!email) return [];
    return products.filter((p) => (p.ownerEmail || p.owner || p.email) && String((p.ownerEmail || p.owner || p.email)).toLowerCase() === String(email).toLowerCase());
  }, [products, email]);

  const handleSignOut = async () => {
    if (session) return signOut({ callbackUrl: '/' });
    if (auth?.signOutUser) {
      await auth.signOutUser();
      // reload to ensure client state resets
      location.href = '/';
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6 flex gap-6 items-center">
        <div>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">{(name || email || "?").charAt(0)}</div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{name || email || "Profile"}</h1>
          {email && <p className="text-sm text-gray-600">{email}</p>}
          {user?.uid && <p className="text-xs text-gray-500 mt-1">UID: {user.uid}</p>}
          <div className="mt-4 flex gap-2">
            <button onClick={handleSignOut} className="btn btn-outline">Sign out</button>
            <Link href="/add-product" className="btn btn-primary">Add Product</Link>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">My Products</h2>
        {myProducts.length === 0 ? (
          <div className="p-6 bg-white shadow rounded">No products found. <Link href="/add-product" className="text-primary underline">Add one</Link>.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProducts.map((p) => (
              <article key={p.id || p._id} className="bg-white shadow rounded p-4">
                <div className="flex gap-3">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title} className="w-24 h-24 object-cover rounded" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded" />
                  )}
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.short || p.description}</p>
                    <div className="mt-2 flex gap-2">
                      <Link href={`/products/${p.id || p._id}`} className="text-sm text-primary underline">View</Link>
                      <Link href="/manage-products" className="text-sm text-gray-600 underline">Manage</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
