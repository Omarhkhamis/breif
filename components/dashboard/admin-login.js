"use client";

import { AlertCircle, LoaderCircle, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus("loading");
      setMessage("");

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر تسجيل الدخول.");
      }

      window.location.href = "/dashboard";
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-blue-700 text-white">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold">تسجيل دخول الأدمن</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">Brief Agency Dashboard</p>
        </div>

        {message ? (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {message}
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">الإيميل</span>
            <span className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                autoComplete="email"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none"
                dir="ltr"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">كلمة المرور</span>
            <span className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock className="h-4 w-4 text-slate-400" />
              <input
                autoComplete="current-password"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none"
                dir="ltr"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </span>
          </label>

          <button
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-extrabold text-white shadow-sm hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-55"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            )}
            دخول
          </button>
        </form>
      </section>
    </main>
  );
}
