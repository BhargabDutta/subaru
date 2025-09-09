// src/components/ShoeCanvas.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import ShoeModel from "./ShoeModel";

export default function ShoeCanvas({ sectionIndex, isMobile, variant }) {
  return (
    <Canvas
      className="canvas-pointer-none fixed inset-0 -z-10 h-ful w-full"
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <ShoeModel sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
