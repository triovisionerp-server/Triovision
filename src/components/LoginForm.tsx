import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function LoginForm() {
  const navigate = useNavigate();

  // login
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  // forgot modal
  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState<"email" | "otp" | "reset">("email");
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpMsg, setFpMsg] = useState("");
  const [fpErr, setFpErr] = useState("");

  const normEmail = (s: string) => (s || "").trim().toLowerCase();

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/auth/login", { userId, password });
      const data = res?.data;
      const token = data?.token || data?.data?.token || "";
      const ok = res.status === 200 && (!!token || data?.success === true);
      if (!ok) throw new Error(data?.message || "Login failed");

      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setBusy(false);
      setPassword("");
    }
  }

  async function sendResetOtp() {
    setFpErr("");
    setFpMsg("");
    const email = normEmail(fpEmail);
    if (!email) return setFpErr("Enter a valid email.");

    try {
      setBusy(true);
      const r = await api.post("/otp/request-reset", { email });
      if (r?.status === 200 || r?.data?.success) {
        setFpMsg(r?.data?.message || "OTP sent to your email.");
        setFpStep("otp");
      } else {
        setFpErr(r?.data?.message || "Failed to send OTP.");
      }
    } catch (e: any) {
      setFpErr(e?.response?.data?.message || "Send OTP failed.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyResetOtp() {
    setFpErr("");
    setFpMsg("");
    const email = normEmail(fpEmail);
    if (!email) return setFpErr("Enter a valid email.");
    if (!fpOtp.trim()) return setFpErr("Enter OTP.");

    try {
      setBusy(true);
      const r = await api.post("/otp/verify-otp", { email, otp: fpOtp.trim() });
      if (r?.status === 200 || r?.data?.success) {
        setFpMsg(r?.data?.message || "OTP verified.");
        setFpStep("reset");
      } else {
        setFpErr(r?.data?.message || "Invalid OTP.");
      }
    } catch (e: any) {
      setFpErr(e?.response?.data?.message || "OTP verification failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setFpErr("");
    setFpMsg("");

    const form = e.currentTarget as HTMLFormElement;
    const p1 = (form.querySelector("#newPwd") as HTMLInputElement)?.value || "";
    const p2 = (form.querySelector("#newPwd2") as HTMLInputElement)?.value || "";
    if (p1.length < 8) return setFpErr("Password must be at least 8 characters.");
    if (p1 !== p2) return setFpErr("Passwords do not match.");

    try {
      setBusy(true);
      const r = await api.post("/otp/reset-password", {
        email: normEmail(fpEmail),
        otp: fpOtp.trim(),
        newPassword: p1,
      });
      if (r?.status === 200 || r?.data?.success) {
        setFpMsg(r?.data?.message || "Password updated. Please sign in.");
        setTimeout(() => {
          setShowForgot(false);
          setFpStep("email");
          setFpEmail("");
          setFpOtp("");
          setFpErr("");
          setFpMsg("");
        }, 800);
      } else {
        setFpErr(r?.data?.message || "Password reset failed.");
      }
    } catch (e: any) {
      setFpErr(e?.response?.data?.message || "Password reset failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Login card (UI preserved) */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full -mt-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">
            Login with your User ID and Password
          </p>
        </div>

        <form onSubmit={onLogin}>
          <label className="text-sm font-medium">User ID</label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm text-muted-foreground"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full mb-4" disabled={busy}>
            {busy ? "Signing in..." : "Sign In →"}
          </Button>

          <div className="text-center text-sm">
            Register?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-primary underline"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>

            {fpStep === "email" && (
              <>
                <Input
                  type="email"
                  placeholder="Enter your registered email"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button onClick={sendResetOtp} disabled={busy || !fpEmail}>
                    {busy ? "Sending…" : "Send OTP"}
                  </Button>
                  <Button variant="secondary" onClick={() => setShowForgot(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {fpStep === "otp" && (
              <>
                <Input
                  placeholder="Enter OTP"
                  value={fpOtp}
                  onChange={(e) => setFpOtp(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button onClick={verifyResetOtp} disabled={busy || !fpOtp}>
                    {busy ? "Verifying…" : "Verify OTP"}
                  </Button>
                  <Button variant="secondary" onClick={sendResetOtp}>
                    Resend
                  </Button>
                </div>
              </>
            )}

            {fpStep === "reset" && (
              <form onSubmit={doResetPassword} className="space-y-3">
                <Input id="newPwd" type="password" placeholder="New Password" />
                <Input id="newPwd2" type="password" placeholder="Confirm Password" />
                <Button type="submit" disabled={busy}>
                  {busy ? "Saving…" : "Set New Password"}
                </Button>
              </form>
            )}

            {(fpMsg || fpErr) && (
              <div className={`text-center font-medium mt-4 ${fpErr ? "text-red-600" : "text-green-600"}`}>
                {fpErr || fpMsg}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
