'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  MeshDistortMaterial,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SandboxCanvasProps {
  meshType: 'blob' | 'torus' | 'icosahedron' | 'wave' | 'card';
  wireframe: boolean;
  roughness: number;
  metalness: number;
  distort: number;
  themeColor: 'blue' | 'teal' | 'violet' | 'amber';
}

const colorMap = {
  blue: { base: '#2563eb', glow: '#60a5fa', emissive: '#1d4ed8' },
  teal: { base: '#0d9488', glow: '#2dd4bf', emissive: '#0f766e' },
  violet: { base: '#7c3aed', glow: '#c084fc', emissive: '#5b21b6' },
  amber: { base: '#d97706', glow: '#fbbf24', emissive: '#92400e' },
};

function GeometryRenderer({
  meshType,
  wireframe,
  roughness,
  metalness,
  distort,
  themeColor,
}: SandboxCanvasProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Group>(null);
  const colors = colorMap[themeColor];

  // Animate standard shapes
  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      if (meshType === 'blob') {
        // Blob gets faster/more distorted on pointer proximity
        const pointerDist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
        const factor = THREE.MathUtils.lerp(1, 2.5, 1 - Math.min(pointerDist, 1));
        meshRef.current.rotation.y = time * 0.15 * factor;
        meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.1;
      } else if (meshType === 'card') {
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.45;
        meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.15;
      } else {
        meshRef.current.rotation.y = time * 0.25;
        meshRef.current.rotation.x = time * 0.15;
      }
    }
  });

  // Calculate grid positions for the wave
  const gridItems = useMemo(() => {
    const items = [];
    const size = 11;
    const spacing = 0.45;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const posX = (x - size / 2) * spacing;
        const posZ = (z - size / 2) * spacing;
        items.push({ x: posX, z: posZ, idx: x * size + z });
      }
    }
    return items;
  }, []);

  // Animate the digital wave field
  useFrame(({ clock, pointer }) => {
    if (meshType !== 'wave' || !pointsRef.current) return;
    const time = clock.getElapsedTime();
    const children = pointsRef.current.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      const x = child.position.x;
      const z = child.position.z;
      
      // Wave height calculation based on distance from center + pointer interaction
      const distFromCenter = Math.sqrt(x * x + z * z);
      const pointerDist = Math.sqrt((x - pointer.x * 2.5) * (x - pointer.x * 2.5) + (z - pointer.y * 2.5) * (z - pointer.y * 2.5));
      
      const waveVal = Math.sin(distFromCenter * 1.5 - time * 2.4) * 0.32;
      const pointerVal = Math.max(0, 1 - pointerDist * 0.8) * 0.45;

      child.position.y = waveVal + pointerVal;
      
      // Pulse scale slightly based on height
      const currentScale = 0.08 + (waveVal + pointerVal) * 0.04;
      child.scale.set(currentScale, currentScale, currentScale);
    }
  });

  // Calculate icosahedron vertices for custom node rendering
  const icosahedronVertices = useMemo(() => {
    const tempGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const pos = tempGeo.attributes.position;
    const vertices: THREE.Vector3[] = [];
    
    // De-duplicate vertices to only draw unique nodes
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const x = Number(pos.getX(i).toFixed(3));
      const y = Number(pos.getY(i).toFixed(3));
      const z = Number(pos.getZ(i).toFixed(3));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        vertices.push(new THREE.Vector3(x, y, z));
      }
    }
    tempGeo.dispose();
    return vertices;
  }, []);

  if (meshType === 'blob') {
    return (
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color={colors.base}
          distort={distort * 0.34}
          speed={1.5}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          emissive={colors.emissive}
          emissiveIntensity={0.3}
        />
      </mesh>
    );
  }

  if (meshType === 'torus') {
    return (
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.0, 0.32, 120, 16]} />
        <meshStandardMaterial
          color={colors.base}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          emissive={colors.emissive}
          emissiveIntensity={0.6}
        />
      </mesh>
    );
  }

  if (meshType === 'icosahedron') {
    return (
      <group>
        {/* Main wireframe core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color={colors.base}
            wireframe={true}
            roughness={0.1}
            metalness={0.9}
            emissive={colors.emissive}
            emissiveIntensity={0.85}
          />
        </mesh>
        
        {/* Render actual physical nodes at vertices */}
        <group ref={pointsRef}>
          {icosahedronVertices.map((v, i) => (
            <mesh key={i} position={v}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial
                color={colors.glow}
                emissive={colors.glow}
                emissiveIntensity={1.4}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </group>
    );
  }

  if (meshType === 'wave') {
    return (
      <group ref={pointsRef} position={[0, -0.4, 0]} rotation={[0.2, 0.4, 0]}>
        {gridItems.map((item) => (
          <mesh key={item.idx} position={[item.x, 0, item.z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors.base}
              emissive={colors.glow}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.85}
              wireframe={wireframe}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (meshType === 'card') {
    return (
      <group ref={meshRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.5, 0.08]} />
          <meshStandardMaterial
            color={colors.base}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            emissive={colors.emissive}
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Holographic smart chip */}
        <mesh position={[-0.8, 0.2, 0.046]}>
          <boxGeometry args={[0.35, 0.3, 0.01]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.1}
            metalness={0.9}
            emissive="#b45309"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* HTML typography layer overlayed on the 3D card */}
        <Html position={[0, 0, 0.05]} center transform distanceFactor={2.6}>
          <div className="w-[280px] h-[168px] p-5 flex flex-col justify-between select-none pointer-events-none text-white font-mono rounded-xl bg-transparent">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-blue-200">
                Nyle Digital Core
              </span>
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 text-[9px] font-bold">
                N
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs tracking-wider text-slate-300">SYSTEM ACCESS CARD</div>
              <div className="text-sm tracking-widest font-semibold text-white">4082 9102 8841 0029</div>
            </div>
            <div className="flex justify-between items-end text-[8px] text-slate-400">
              <div>
                <div className="text-[6px] text-slate-500 font-sans uppercase">Holder</div>
                <div className="font-semibold tracking-wider text-white">DEVELOPER SANDBOX</div>
              </div>
              <div>
                <div className="text-[6px] text-slate-500 font-sans uppercase">Expires</div>
                <div className="font-semibold text-white">NEVER</div>
              </div>
            </div>
          </div>
        </Html>
      </group>
    );
  }

  return null;
}

export default function SandboxCanvas(props: SandboxCanvasProps) {
  const isWave = props.meshType === 'wave';
  const colors = colorMap[props.themeColor];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950/60 border border-slate-800/80 shadow-2xl backdrop-blur-md">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.0], fov: 46 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} castShadow />
        <pointLight position={[-4, 3, 2]} color={colors.glow} intensity={35} distance={10} />
        <pointLight position={[4, -3, 3]} color={colors.base} intensity={25} distance={8} />
        
        <Environment preset="city" />
        
        <Sparkles count={55} scale={[4.5, 4.0, 3.5]} size={2.0} speed={0.4} color={colors.glow} />
        
        <PresentationControls
          global
          cursor
          speed={1.4}
          zoom={0.95}
          rotation={[0, 0, 0]}
          polar={[-0.4, 0.4]}
          azimuth={[-0.6, 0.6]}
        >
          <Float speed={1.2} floatIntensity={isWave ? 0.05 : 0.25} rotationIntensity={isWave ? 0.05 : 0.15}>
            <GeometryRenderer {...props} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
