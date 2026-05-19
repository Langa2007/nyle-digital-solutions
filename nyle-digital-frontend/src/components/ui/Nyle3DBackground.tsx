'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles, Stars } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function useMountedTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? resolvedTheme : 'dark';
}

// Sine Flow Field (Undulating glowing matrix grid at the bottom)
function SineFlowField({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate grid positions for the wave
  const gridItems = useMemo(() => {
    const items = [];
    const size = 15;
    const spacing = 1.0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const posX = (x - size / 2) * spacing;
        const posZ = (z - size / 2) * spacing;
        items.push({ x: posX, z: posZ, idx: x * size + z });
      }
    }
    return items;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    const children = groupRef.current.children;

    // React subtly to mouse pointer position
    const mouseX = pointer.x * 3.5;
    const mouseZ = pointer.y * 3.5;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      const x = child.position.x;
      const z = child.position.z;
      
      const distFromCenter = Math.sqrt(x * x + z * z);
      const pointerDist = Math.sqrt((x - mouseX) * (x - mouseX) + (z - mouseZ) * (z - mouseZ));
      
      // Compute sine wave ripple
      const waveVal = Math.sin(distFromCenter * 0.45 - time * 1.5) * 0.65;
      const pointerVal = Math.max(0, 2.0 - pointerDist * 0.5) * 0.45;

      child.position.y = waveVal + pointerVal;
      
      // Animate scales
      const currentScale = 0.08 + (waveVal + pointerVal) * 0.03;
      child.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -4.5, -6]} rotation={[0.4, 0.2, 0]}>
      {gridItems.map((item) => (
        <mesh key={item.idx} position={[item.x, 0, item.z]}>
          <boxGeometry args={[1.0, 1.0, 1.0]} />
          <meshStandardMaterial
            color={isDark ? '#0ea5e9' : '#2563eb'}
            emissive={isDark ? '#22d3ee' : '#3b82f6'}
            emissiveIntensity={isDark ? 0.75 : 0.35}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// Wireframe Core with Glowing Vertex Nodes
function WireframeCore({ isDark, position, scale }: { isDark: boolean; position: [number, number, number]; scale?: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);

  // Calculate unique icosahedron vertices for node placements
  const icosahedronVertices = useMemo(() => {
    const tempGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const pos = tempGeo.attributes.position;
    const vertices: THREE.Vector3[] = [];
    
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

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.12 + pointer.x * 0.15;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.1 + pointer.y * 0.1;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y = time * 0.12 + pointer.x * 0.15;
      nodesRef.current.rotation.x = Math.sin(time * 0.3) * 0.1 + pointer.y * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.1}>
        {/* Wireframe Core Mesh */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color={isDark ? '#0ea5e9' : '#2563eb'}
            wireframe={true}
            roughness={0.1}
            metalness={0.9}
            emissive={isDark ? '#0284c7' : '#1d4ed8'}
            emissiveIntensity={isDark ? 1.2 : 0.55}
          />
        </mesh>

        {/* Small Glowing Spheres at the Vertices */}
        <group ref={nodesRef}>
          {icosahedronVertices.map((v, i) => (
            <mesh key={i} position={v}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshStandardMaterial
                color={isDark ? '#22d3ee' : '#60a5fa'}
                emissive={isDark ? '#22d3ee' : '#3b82f6'}
                emissiveIntensity={isDark ? 1.6 : 0.8}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

// Glowing Connected Data Constellations (reacting to pointer coordinates)
function DataConstellation({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const angle = index * 1.15;
        const radius = 4.2 + (index % 5) * 0.5;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(index * 2.1) * 2.2,
          Math.sin(angle) * radius - 6.0,
        );
      }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.022 + pointer.x * 0.12;
    group.current.rotation.x = pointer.y * 0.06;
  });

  return (
    <group ref={group} position={[0, 0.8, -3]}>
      {nodes.map((node, index) => (
        <Float
          key={`node-${index}`}
          speed={1.0 + (index % 3) * 0.2}
          rotationIntensity={0.15}
          floatIntensity={0.4}
        >
          <mesh position={node}>
            <octahedronGeometry args={[index % 4 === 0 ? 0.08 : 0.05, 0]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? '#fbbf24' : isDark ? '#22d3ee' : '#2563eb'}
              emissive={index % 3 === 0 ? '#d97706' : '#0ea5e9'}
              emissiveIntensity={isDark ? 1.1 : 0.4}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`link-${index}`}
          points={[node, nodes[index + 1]]}
          color={isDark ? '#38bdf8' : '#2563eb'}
          transparent
          opacity={0.14}
          lineWidth={0.5}
        />
      ))}
    </group>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#f8fafc']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#eff6ff', 10, 28]} />
      <ambientLight intensity={isDark ? 0.55 : 0.85} />
      <directionalLight position={[5, 6, 4]} intensity={isDark ? 2.0 : 1.2} />
      <pointLight position={[-6, 3, -3]} color="#22d3ee" intensity={80} distance={15} />
      <pointLight position={[6, -2, -4]} color="#fbbf24" intensity={40} distance={12} />
      
      {/* Dynamic Starfield */}
      <Stars
        radius={48}
        depth={28}
        count={isDark ? 850 : 250}
        factor={isDark ? 2.0 : 0.9}
        saturation={0.5}
        fade
        speed={0.2}
      />
      
      {/* Dynamic Sparkles Floating */}
      <Sparkles
        count={60}
        scale={[12, 5.0, 10]}
        size={isDark ? 2.4 : 1.4}
        speed={0.3}
        color={isDark ? '#38bdf8' : '#2563eb'}
        opacity={isDark ? 0.6 : 0.28}
      />
      
      {/* Interactive Sine Wave Flow Field (Perspective floor matrix) */}
      <SineFlowField isDark={isDark} />
      
      {/* Multi-layered Wireframe Cores positioned at parallax heights */}
      <WireframeCore isDark={isDark} position={[-5.2, 2.5, -6.5]} scale={0.85} />
      <WireframeCore isDark={isDark} position={[5.4, -1.8, -6.8]} scale={0.78} />
      
      {/* Glowing Connection Constellations */}
      <DataConstellation isDark={isDark} />
    </>
  );
}

export default function Nyle3DBackground() {
  const resolvedTheme = useMountedTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene isDark={isDark} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.20),transparent_28%),radial-gradient(circle_at_86%_28%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.28),rgba(248,250,252,0.72)_68%,rgba(248,250,252,0.98))] dark:bg-[radial-gradient(circle_at_16%_10%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.16),rgba(2,6,23,0.72)_72%,rgba(2,6,23,0.98))]" />
    </div>
  );
}
