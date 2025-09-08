import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const isBlocked = failedAttempts >= 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isBlocked) return;
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res?.data;
      const success = !!data?.success || res.status === 200;

      if (success) {
        // optionally backend returns token in data.token or data.data.token
        const token = data?.token || data?.data?.token || "";
        if (token) {
          localStorage.setItem("token", token);
          // set auth header for future requests
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setFailedAttempts(0);
        navigate("/dashboard");
      } else {
        setFailedAttempts((p) => p + 1);
      }
    } catch (err: any) {
      // treat network/server error as failed attempt
      setFailedAttempts((p) => p + 1);
    } finally {
      setIsLoading(false);
      setPassword("");
    }
  }

  function openSupport() {
    const name = email || "User";
    const msg = `Hello Support Team,\nThis is ${name}.\nI need help with my ERP login. Please assist.\nThank you.`;
    const waLink = `https://wa.me/917981085020?text=${encodeURIComponent(msg)}`;
    window.open(waLink, "_blank");
  }

  return (
    <form id="loginBox" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full -mt-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 mb-2 rounded-lg bg-black flex items-center justify-center" />
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">Sign in to your Triovision ERP Dashboard</p>
      </div>

      <label className="text-sm font-medium">Email Address</label>
      <Input
        id="username"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isBlocked}
        className="mb-4"
      />

      <label className="text-sm font-medium">Password</label>
      <div className="relative mb-3">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isBlocked}
        />
        <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
        <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-muted-foreground">Forgot password?</button>
      </div>

      <Button id="loginBtn" type="submit" className="w-full mb-4" disabled={isBlocked || isLoading}>
        {isLoading ? "Signing in..." : "Sign In →"}
      </Button>

      <div className="text-center text-sm">
        Register?{" "}
        <button type="button" onClick={() => navigate("/register")} className="font-semibold text-primary underline">
          Create an account
        </button>
      </div>

      {isBlocked && (
        <div className="mt-4 text-center">
          <div className="text-sm text-red-600 mb-2">Too many failed attempts. Login disabled.</div>
          <Button type="button" onClick={openSupport} className="w-full">Contact Administrator</Button>
        </div>
      )}
    </form>
  );
}