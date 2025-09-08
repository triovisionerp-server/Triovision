import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, ArrowRight } from "lucide-react";

export function RegisterForm() {
  const navigate = useNavigate();

  // Trio ID default to "Trio"
  const [trioId, setTrioId] = useState("Trio");
  const [username, setUsername] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [canonicalEmail, setCanonicalEmail] = useState(""); // exact email used for send/verify
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // normalize but DO NOT blindly append domain here except when user explicitly types '@'
  function normalizeEmailInput(raw: string) {
    if (!raw) return "";
    let v = raw.trim();
    v = v.replace(/\.+$/g, ""); // trim trailing dots
    if (!v) return "";
    if (v.includes("@")) {
      if (v.endsWith("@triovisioninternational")) v = v + ".com";
      return v.toLowerCase();
    }
    // return as-is (local part) — backend may append domain
    return v.toLowerCase();
  }

  const canSendOtp = !!emailLocal && !emailLocal.includes(" ");

  // when user types in email input, auto-complete domain when they type '@'
  function handleEmailChange(raw: string) {
    let v = raw;
    // if user just typed '@' at the end, auto-complete domain
    if (v.endsWith("@")) {
      v = v + "triovisioninternational.com";
    } else if (v.includes("@triovisioninternational") && !v.includes(".com")) {
      // if user typed '@triovisioninternational' (without .com) append .com
      v = v.replace(/@triovisioninternational$/, "@triovisioninternational.com");
    }
    setEmailLocal(v);

    // if username is empty, set it from the local part of the email
    if (!username) {
      const local = v.split("@")[0] || v;
      if (local) setUsername(local);
    }

    // clear OTP-related state if input changed after sending OTP
    if (otpSent) {
      setOtpSent(false);
      setOtp("");
      setOtpVerified(false);
      setMsg("");
      setErr("");
      setCanonicalEmail("");
    }
  }

  async function handleSendOtp() {
    setMsg("");
    setErr("");
    if (!canSendOtp) {
      setErr("Enter a valid email or local part.");
      return;
    }

    const emailToUse = normalizeEmailInput(emailLocal);
    if (!emailToUse) {
      setErr("Invalid email.");
      return;
    }

    // store exact email used for verify
    setCanonicalEmail(emailToUse);

    try {
      setOtpLoading(true);
      console.debug("send-otp ->", { email: emailToUse, userName: username });
      // include userName in the request as requested
      const res = await api.post("/otp/send-otp", { email: emailToUse, userName: username });
      console.debug("send-otp res:", res?.status, res?.data);
      if (res?.data?.success || res?.status === 200) {
        setOtpSent(true);
        setMsg(res?.data?.message || "OTP sent to your email.");
      } else {
        setErr(res?.data?.message || "Failed to send OTP.");
      }
    } catch (e: any) {
      console.error("Send OTP error:", e?.response || e);
      if (e?.response) setErr(e.response?.data?.message || "Send OTP failed (server).");
      else if (e?.request) setErr("Send OTP failed: No response from server (CORS or network).");
      else setErr(`Send OTP failed: ${e?.message || "unknown"}`);
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setMsg("");
    setErr("");
    if (!otp.trim()) {
      setErr("Enter the OTP.");
      return;
    }
    if (!canonicalEmail) {
      setErr("Please send OTP first.");
      return;
    }

    try {
      setOtpLoading(true);
      console.debug("verify-otp ->", canonicalEmail, otp);
      const res = await api.post("/otp/verify-otp", { email: canonicalEmail, otp: otp.trim(), userName: username });
      console.debug("verify-otp res:", res?.status, res?.data);
      if (res?.data?.success || res?.status === 200) {
        setOtpVerified(true);
        setMsg(res?.data?.message || "Email verified.");
      } else {
        setErr(res?.data?.message || "Invalid OTP.");
      }
    } catch (e: any) {
      console.error("Verify OTP error:", e?.response || e);
      if (e?.response) setErr(e.response?.data?.message || "Verify OTP failed (server).");
      else if (e?.request) setErr("Verify OTP failed: No response from server (CORS or network).");
      else setErr(`Verify OTP failed: ${e?.message || "unknown"}`);
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    const pwdInput = (e.target as HTMLFormElement).querySelector("#reg-password") as HTMLInputElement | null;
    const password = pwdInput?.value || "";

    if (!otpVerified) {
      setErr("Please verify your email first.");
      return;
    }
    if (!trioId.trim() || !username.trim()) {
      setErr("Please fill all fields.");
      return;
    }
    if (password.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const emailToSend = canonicalEmail || normalizeEmailInput(emailLocal);
      console.debug("register ->", { userId: trioId, userName: username, email: emailToSend });
      const res = await api.post("/auth/register", {
        userId: trioId.trim(),
        userName: username.trim(),
        email: emailToSend,
        password,
      });
      console.debug("register res:", res?.status, res?.data);
      if (res?.data?.success || res?.status === 200) {
        setMsg(res?.data?.message || "Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setErr(res?.data?.message || "Registration failed.");
      }
    } catch (e: any) {
      console.error("Register error:", e?.response || e);
      if (e?.response) setErr(e.response?.data?.message || "Registration failed (server).");
      else if (e?.request) setErr("Registration failed: No response from server (CORS or network).");
      else setErr(`Registration failed: ${e?.message || "unknown"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto -mt-4">
      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/95 border border-white/10 shadow-2xl">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-extrabold mb-1">Create an account</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="trioId">Trio User ID</Label>
              <Input id="trioId" value={trioId} onChange={(e) => setTrioId(e.target.value)} required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="emailLocal">Trio Email</Label>
              <div className="flex gap-2 items-center mt-1">
                <Input
                  id="emailLocal"
                  value={emailLocal}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="full email or local part"
                />
                <Button type="button" onClick={handleSendOtp} disabled={!canSendOtp || otpLoading}>
                  {otpLoading ? "Sending…" : otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
                  <Button type="button" onClick={handleVerifyOtp} disabled={!otp || otpLoading}>
                    {otpLoading ? "Verifying…" : "Verify"}
                  </Button>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="reg-password">Create Password</Label>
              <Input id="reg-password" type="password" placeholder="Min 8 characters" disabled={!otpVerified} className="mt-1" />
            </div>

            <div>
              <Button type="submit" disabled={!otpVerified || loading} className="w-full">
                {loading ? "Registering…" : <>Register <ArrowRight className="w-4 h-4 inline ml-2" /></>}
              </Button>
            </div>

            {(msg || err) && (
              <div className={`text-center font-medium mt-3 ${err ? "text-red-600" : "text-green-600"}`}>
                {err || msg}
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}