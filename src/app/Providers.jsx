"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import ProductProvider from "./Context/ProductProvider";
import AuthProvider from "./Context/AuthProvider";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ProductProvider>{children}</ProductProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
