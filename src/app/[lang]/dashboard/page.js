"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const { lang } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        router.push(`/${lang}/login`);
        return;
      }
      setLoading(false);
    }

    checkAuth();
  }, [router, lang]);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push(`/${lang}/login`);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome to your dashboard</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
