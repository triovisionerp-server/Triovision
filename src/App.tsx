import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1>Frontend sanity check</h1>
        <p>If you see this, React and Vite are running.</p>
        <p>
          Links:
          <br />
          <a href="/login">/login (SPA route)</a> — full navigation
          <br />
          <a href="/register">/register (SPA route)</a>
        </p>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}