"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      router.push("/en/dashboard");
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="flex w-1/2  items-center justify-center bg-[#f3f2ed]">
        <div className="flex w-1/2 items-center justify-center">
          <div className="w-[450px]">
            <h1 className="mb-3 text-center text-[45px] font-bold text-[#333]">
              {t("title")}
            </h1>

            <input
              placeholder={t("email")}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[14px] border border-[#ccc] p-4 text-[15px] outline-none transition focus:border-[#5f7d69] focus:shadow-[0_0_8px_rgba(95,125,105,0.3)]"
            />
            <br />
            <br />

            <input
              placeholder={t("password")}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-[14px] border border-[#ccc] p-4 text-[15px] outline-none transition focus:border-[#5f7d69] focus:shadow-[0_0_8px_rgba(95,125,105,0.3)]"
            />
            <br />
            <br />

            <button className="w-full rounded-[14px] bg-[#5f7d69] p-4 text-lg text-white transition hover:-translate-y-1 hover:opacity-90">
              {t("button")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
