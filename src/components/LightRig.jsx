// src/components/LightRig.jsx
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LightRig({ sectionIndex, isMobile }) {
  const lightRefs = useRef([]);   // [DirLight, DirLight, ...]
  const targetRefs = useRef([]);  // [Object3D, Object3D, ...]

  // Helper to scale for mobile
  const s = (v) => (isMobile ? v * 0.8 : v);

  // 📦 Per-section, per-light configs:
  // Each section is an array of light configs; each light has { position, target, intensity, color }
  const sections = useMemo(() => ([
    // Section 0 (3 lights)
    [
     
      { position: [s(0), s(43),  s(-10)], target: [0, 0, 0],   intensity: 0.01, color: "#ffffff" },
      { position: [s(0), s(-13),  s(0)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
    ],
    // Section 1 (2 lights)
    [
      { position: [s( 10), s(3),  s(-1)], target: [0, 0, 0],   intensity: 1.4, color: "#fff7e6" },
      { position: [s( -6), s(2),  s(-6)], target: [0, 0.5, 0], intensity: 0.6, color: "#e6f0ff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(0), s(13),  s(-10)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(0), s(13),  s(-10)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(0), s(13),  s(-10)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(-6), s(13),  s(-10)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(6), s(13),  s(0)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(6), s(13),  s(0)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(6), s(13),  s(0)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(0), s(13),  s(0)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    [
      { position: [s(0), s(13),  s(3)], target: [0, 0, 0],   intensity: 1, color: "#ffffff" },
      { position: [s(0), s(-13),  s(0)], target: [0, 0, 0],   intensity: 2.5, color: "red" },
 
      // no 3rd light -> will auto-fade (see fallback below)
    ],
    // …add sections as needed
  ]), [isMobile]);

  // Clamp to valid section
  const idx = Math.max(0, Math.min(sectionIndex, sections.length - 1));
  const currentLights = sections[idx];

  // How many lights to render in the scene (you can set a max, e.g. 4)
  const LIGHT_COUNT = Math.max(...sections.map(sec => sec.length), 3); // ensure at least 3 if you want A/B/C

  // Make sure each directional light *uses* its own target object
  useEffect(() => {
    lightRefs.current.forEach((l, i) => {
      if (l && targetRefs.current[i]) l.target = targetRefs.current[i];
    });
  }, []);

  // Reusable temp
  const v3 = new THREE.Vector3();
  const lerp = THREE.MathUtils.lerp;

  useFrame(() => {
    for (let i = 0; i < LIGHT_COUNT; i++) {
      const l = lightRefs.current[i];
      const t = targetRefs.current[i];
      if (!l) continue;

      // Use config if present; otherwise fade this light out smoothly
      const cfg = currentLights[i] ?? {
        position: [0, 5, 5],
        target: [0, 0, 0],
        intensity: 0,          // fades off when not used in this section
        color: "#ffffff",
      };

      // position
      v3.set(...cfg.position);
      l.position.lerp(v3, 0.1);

      // intensity
      l.intensity = lerp(l.intensity, cfg.intensity, 0.1);

      // color
      (l.color || (l.color = new THREE.Color())).lerp(new THREE.Color(cfg.color), 0.1);

      // target (aim)
      if (t && cfg.target) {
        v3.set(...cfg.target);
        t.position.lerp(v3, 0.1);
        l.target.updateMatrixWorld?.();
      }
    }
  });

  return (
    <>
      {/* Targets */}
      {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
        <object3D
          key={`target-${i}`}
          ref={(el) => (targetRefs.current[i] = el)}
          position={[0, 0, 0]}
        />
      ))}

      {/* Lights */}
      {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
        <directionalLight
          key={`light-${i}`}
          ref={(el) => (lightRefs.current[i] = el)}
          castShadow
          // start with something sane; they'll lerp to config
          intensity={0}
          color="#ffffff"
        />
      ))}
    </>
  );
}
