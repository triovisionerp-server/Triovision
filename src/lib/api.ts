import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import axios from "axios";

const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || "/api";
const api = axios.create({ 
  baseURL: API_BASE, 
  timeout: 15000, 
  headers: { 
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json" 
  } 
});

export default api;

export type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};
