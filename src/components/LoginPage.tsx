import { LoginForm } from './LoginForm';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';
import { LoginBranding } from './LoginBranding';
import { MobileBranding } from './MobileBranding';
import { Additional3DElements } from './Additional3DElements';
import { MechanicalEngineer3D } from './MechanicalEngineer3D';

export function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LoginBranding />

          {/* Keep only the single login card (LoginForm) - removed duplicate header/lock */}
          <div className="flex justify-center lg:justify-center xl:justify-end">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>

          <div className="flex-shrink-0">
            <MechanicalEngineer3D />
          </div>
        </div>

        <MobileBranding />
      </div>

      <Additional3DElements />
    </div>
  );
}