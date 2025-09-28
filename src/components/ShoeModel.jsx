import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ShoeModel({
  sectionIndex,
  isMobile,
  modelPath = "/models/monster_energy_drink.glb", // <-- change this or pass prop
}) {
  const groupRef = useRef();
  const [sceneObj, setSceneObj] = useState(null);

  // Load single model
  const gltf = useGLTF(modelPath);

  // Base rotations to normalize the model if needed
  const baseRotation = [0, 0, 0];

  // When model loads, clone its scene for safe mutation
  useEffect(() => {
    if (gltf && gltf.scene) {
      setSceneObj(gltf.scene.clone());
    }
  }, [gltf]);

  // (Optional) simple traversal log to inspect materials/textures
  useEffect(() => {
    if (!sceneObj) return;
    console.groupCollapsed("[ShoeModel] scene traversal");
    sceneObj.traverse((child) => {
      if (child.isMesh) {
        console.log("Mesh:", child.name || "(no name)");
        const mat = child.material;
        if (!mat) console.log(" -> no material");
        else if (Array.isArray(mat)) mat.forEach((m, i) => console.log(` material[${i}]:`, m));
        else console.log(" material:", mat, " map:", mat.map);
      }
    });
    console.groupEnd();
  }, [sceneObj]);

  // Transforms per section (keep your existing values)
  const desktopTransforms = [
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 10 },
    { position: [-2, -1, 0], rotation: [1, 0, -0.5], scale: 20 },
    { position: [2, 1, 0], rotation: [0, -2.5, 0], scale: 25 },
    { position: [-2, 0, 0], rotation: [1, -4, -1], scale: 15 },
    { position: [0, -1.5, 0], rotation: [0,0,1.55], scale: 25 },
    { position: [0, -1.5, 0], rotation: [2,0,1.55], scale: 25 },
    { position: [0, -1.5, 0], rotation: [4,0,1.55], scale: 25 },
    { position: [0, -1.5, 0], rotation: [6,0,1.55], scale: 25 },
    { position: [0, -1.5, 0], rotation: [8,0,1.55], scale: 25 },
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 10 },
    { position: [0, 0, 0], rotation: [0, -2.3, -1], scale: 15 },
  ];

  const mobileTransforms = [
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 10 },
    { position: [-1, -1, 0], rotation: [1, 0, -0.5], scale: 20 },
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 25 },
    { position: [0, 0, 0], rotation: [1, -4, -1], scale: 15 },
    { position: [0, -1.5, 0], rotation: [0,0,1.55], scale: 10 },
    { position: [0, -1.5, 0], rotation: [2,0,1.55], scale: 10 },
    { position: [0, -1.5, 0], rotation: [4,0,1.55], scale: 10 },
    { position: [0, -1.5, 0], rotation: [6,0,1.55], scale: 10 },
    { position: [0, -1.5, 0], rotation: [8,0,1.55], scale: 10 },
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 10 },
    { position: [0, 0, 0], rotation: [0, -2.3, 0], scale: 12 },
  ];

  const transforms = isMobile ? mobileTransforms : desktopTransforms;
  const scaleFactor = isMobile ? 0.7 : 1;
  // const current = transforms[sectionIndex] || transforms[0];
  const safeIndex = Math.max(0, Math.min(sectionIndex, transforms.length - 1));
const current = transforms[safeIndex];


  useFrame((state) => {
    if (!groupRef.current) return;

    // Lerp position
    const targetPos = new THREE.Vector3(...current.position).multiplyScalar(isMobile ? 0.6 : 1);
    groupRef.current.position.lerp(targetPos, 0.1);

    // Combine section rotation + base rotation
    const targetQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        current.rotation[0] + baseRotation[0],
        current.rotation[1] + baseRotation[1],
        current.rotation[2] + baseRotation[2]
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
      <group ref={groupRef} key={modelPath}>
        <primitive object={sceneObj} dispose={null} />
      </group>
      <OrbitControls />
    </>
  );
}

// Preload the default model (optional)
useGLTF.preload("/models/monster_energy_drink.glb");
