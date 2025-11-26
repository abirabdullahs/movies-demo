"use client";

import React, { useState, useEffect } from "react";
import { AuthContext } from "./Context";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    setUser({ uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName, photoURL: fbUser.photoURL });
    return fbUser;
  };

  const signOutUser = async () => {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) setUser({ uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName, photoURL: fbUser.photoURL });
      else setUser(null);
      // mark loading as finished after first auth state resolution
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const authInfo = {
    googleSignIn,
    user,
    setUser,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
