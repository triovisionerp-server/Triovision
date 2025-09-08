// src/components/RegisterPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { AnimatedBackground } from "./AnimatedBackground";
import { FloatingShapes } from "./FloatingShapes";
import { LoginBranding } from "./LoginBranding";
import { MobileBranding } from "./MobileBranding";
import { Additional3DElements } from "./Additional3DElements";
import { MechanicalEngineer3D } from "./MechanicalEngineer3D";
import { Card } from "./ui/card";

/**
 * Simple RegisterPage that composes your existing pieces.
 * The RegisterForm component (frontend/src/components/RegisterForm.tsx) provides the OTP flow.
 */
export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LoginBranding />

          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <Card className="relative overflow-hidden backdrop-blur-xl bg-white/95 border border-white/10 shadow-2xl">
                <div className="p-6">
                  {/* RegisterForm handles Trio ID, Username, Email->Send OTP->Verify, Password, Register */}
                  <RegisterForm />
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="font-semibold text-primary underline"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* decorative 3D element on the right like on login page */}
          <div className="hidden lg:flex justify-center">
            <MechanicalEngineer3D />
          </div>
        </div>

        <MobileBranding />
      </div>

      <Additional3DElements />
    </div>
  );
}
