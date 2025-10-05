// src/components/ModelCanvas.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Model from "./Model";
import LightRig from "./LightRig";
import BloomController from "./BloomController";

export default function ModelCanvas({ sectionIndex, isMobile, variant }) {

    // Per-section Bloom settings (edit/extend to match your sections)
    const bloomConfigs = useMemo(() => ([
      // 0: hero — punchier glow
      { mipmapBlur: true, luminanceThreshold: 0, intensity: 0, radius: 0 },
      // 1: features — subtler
      { mipmapBlur: true, luminanceThreshold: 0, intensity: 0, radius: 0 },
      // 2: materials
      { mipmapBlur: true, luminanceThreshold: 0.18, intensity: 0.6, radius: 0.8 },
      // 3: cta
      { mipmapBlur: true, luminanceThreshold: 0.22, intensity: 0.7, radius: 0.9 },
      // ...add entries for all sections; the last one will be reused if you index past it
    ]), []);

  return (
    <Canvas
    dpr={[1, 2]} // or even [1, 3] on high-end screens
  gl={{ antialias: true }}
  onCreated={({ gl }) => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }}
      className="canvas-pointer-none fixed inset-0 h-full w-full"
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0} color="#ffffff" />
      {/* <directionalLight position={[0, 13, -20]} intensity={0.1} color="#ffffff" /> */}
      <LightRig sectionIndex={sectionIndex} isMobile={isMobile} />

      <Suspense fallback={null}>
        <Model sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
        <Preload all />
      </Suspense>
      {/* Post FX */}
      <BloomController sectionIndex={sectionIndex} configs={bloomConfigs} />
    </Canvas>
  );
}
