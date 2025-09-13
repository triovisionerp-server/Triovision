import { AnimatedBackground } from "./AnimatedBackground";
import { FloatingShapes } from "./FloatingShapes";
import { Additional3DElements } from "./Additional3DElements";
import { MechanicalEngineer3D } from "./MechanicalEngineer3D";
import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:flex justify-center">
            <MechanicalEngineer3D />
          </div>
          <div className="flex justify-center lg:justify-center xl:justify-end">
            <div className="w-full max-w-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      <Additional3DElements />
    </div>
  );
}
export default RegisterPage;
