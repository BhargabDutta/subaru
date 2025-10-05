// src/components/BloomController.jsx
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { MathUtils } from "three";

export default function BloomController({ sectionIndex, configs }) {
  const idx = Math.max(0, Math.min(sectionIndex, configs.length - 1));
  const target = configs[idx];

  const [params, setParams] = useState(() => ({
    luminanceThreshold: target.luminanceThreshold ?? 0.1,
    intensity: target.intensity ?? 0.5,
    radius: target.radius ?? 0.7,
    mipmapBlur: target.mipmapBlur ?? true,
  }));

  const targetRef = useRef(target);
  useEffect(() => { targetRef.current = target; }, [target]);

  useFrame(() => {
    setParams(p => {
      const t = targetRef.current;
      const lerp = MathUtils.lerp;
      const next = {
        mipmapBlur: t.mipmapBlur ?? true, // boolean (no lerp)
        luminanceThreshold: lerp(p.luminanceThreshold, t.luminanceThreshold ?? 0.1, 0.12),
        intensity:          lerp(p.intensity,          t.intensity          ?? 0.5, 0.12),
        radius:             lerp(p.radius,             t.radius             ?? 0.7, 0.12),
      };
      return (next.luminanceThreshold === p.luminanceThreshold &&
              next.intensity === p.intensity &&
              next.radius === p.radius &&
              next.mipmapBlur === p.mipmapBlur)
        ? p : next;
    });
  });

  return (
    <EffectComposer>
      <Bloom
        mipmapBlur={params.mipmapBlur}
        luminanceThreshold={params.luminanceThreshold}
        intensity={params.intensity}
        radius={params.radius}
      />
    </EffectComposer>
  );
}
