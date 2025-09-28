// src/components/ShoeCanvas.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import ShoeModel from "./ShoeModel";

export default function ShoeCanvas({ sectionIndex, isMobile, variant }) {
  return (
    <Canvas
      className="canvas-pointer-none fixed inset-0 h-full w-full"
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={20} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={30} color="green" />

      <Suspense fallback={null}>
        <ShoeModel sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
