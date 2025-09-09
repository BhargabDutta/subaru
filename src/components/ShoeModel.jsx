import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ShoeModel({ sectionIndex, isMobile, variant }) {
  const groupRef = useRef();
  const [sceneObj, setSceneObj] = useState(null);

  // ✅ Load all models at top level
  const redModel = useGLTF("/models/nike.glb");
  const blueModel = useGLTF("/models/blue_nike_2.glb");
  const greenModel = useGLTF("/models/blue_nike_1.glb");
  const yellowModel = useGLTF("/models/nike_air_zoom.glb");

  // Base rotations to normalize all models
const baseRotations = {
    red: [0, 0, 0],
    blue: [0, 0, 0],
    green: [0, 0, 0],  // Adjust this until it visually matches others
    yellow: [0, Math.PI, 0],
  };
  

  // ✅ Update sceneObj when variant changes
  useEffect(() => {
    let selected;
    switch (variant) {
      case "blue":
        selected = blueModel;
        break;
      case "green":
        selected = greenModel;
        break;
      case "yellow":
        selected = yellowModel;
        break;
      case "red":
      default:
        selected = redModel;
        break;
    }

    // Clone to create a new instance
    if (selected && selected.scene) {
      setSceneObj(selected.scene.clone());
    }
  }, [variant, redModel, blueModel, greenModel, yellowModel]);

  // Transforms per section
  const desktopTransforms = [
    { position: [0, -0.2, 0], rotation: [0, 0, 0], scale: 2 },
    { position: [-2, -0.2, 0], rotation: [0, 1, 0], scale: 2 },
    { position: [2, 0, 0], rotation: [1, -1, 0.5], scale: 2 },
    { position: [0, -0.25, 0], rotation: [-0.1, Math.PI, 0], scale: 1.8 },
  ];
  
  const mobileTransforms = [
    { position: [0, -0.1, 0], rotation: [0, 0, 0], scale: 2 },
    { position: [0, -0.1, 0], rotation: [1, 0, 0], scale: 2.5 },
    { position: [0, 0, 0], rotation: [0.5, -0.5, 0.2], scale: 3 },
    { position: [0, -0.15, 0], rotation: [0, Math.PI, 0], scale: 1 },
  ];
  const transforms = isMobile ? mobileTransforms : desktopTransforms;
  // const current = transforms[sectionIndex] || transforms[0];  

  const scaleFactor = isMobile ? 0.7 : 1;
  const current = transforms[sectionIndex] || transforms[0];

  useFrame((state) => {
    if (!groupRef.current) return;

    // Lerp position
    const targetPos = new THREE.Vector3(...current.position).multiplyScalar(isMobile ? 0.6 : 1);
    groupRef.current.position.lerp(targetPos, 0.1);

    // Get base rotation for current variant
    const baseRot = baseRotations[variant] || [0, 0, 0];

    // Combine section rotation + base rotation
    const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
            current.rotation[0] + baseRot[0],
            current.rotation[1] + baseRot[1],
            current.rotation[2] + baseRot[2]
        )
    );
    groupRef.current.quaternion.slerp(targetQuat, 0.08);

    // Lerp scale
    const targetScale = new THREE.Vector3(
      current.scale * scaleFactor,
      current.scale * scaleFactor,
      current.scale * scaleFactor
    );
    groupRef.current.scale.lerp(targetScale, 0.08);

    // Idle wobble
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z += Math.sin(t / 1.8) * 0.003;
  });

  if (!sceneObj) return null;

  return (
    <>
      <group ref={groupRef} key={variant}>
        <primitive object={sceneObj} dispose={null} />
      </group>
      <OrbitControls />
    </>
  );
}

// Preload models
useGLTF.preload("/models/blue_nike_1.glb");
useGLTF.preload("/models/blue_nike_2.glb");
useGLTF.preload("/models/nike.glb");
useGLTF.preload("/models/nike_air_zoom.glb");
