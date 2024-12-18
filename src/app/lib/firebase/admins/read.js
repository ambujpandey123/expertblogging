"use client";

import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useAdmin({ uid }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    // Reference to the Firestore document
    const ref = doc(db, `admins/${uid}`);

    // Set up the Firestore listener
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setData(snap.exists() ? snap.data() : null);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    // Cleanup function to unsubscribe
    return () => unsub();
  }, [uid]);

  return {
    data,
    error,
    isLoading,
  };
}
