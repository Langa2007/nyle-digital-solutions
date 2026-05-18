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

function CircuitGrid({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const rows: THREE.Vector3[][] = [];
    const size = 18;
    const step = 1.6;

    for (let i = -size; i <= size; i += 2) {
      rows.push([
        new THREE.Vector3(-size, 0, i * step),
        new THREE.Vector3(size, 0, i * step),
      ]);
      rows.push([
        new THREE.Vector3(i * step, 0, -size),
        new THREE.Vector3(i * step, 0, size),
      ]);
    }

    return rows;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    group.current.position.z = ((clock.elapsedTime * 1.5) % 3.2) - 1.6;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -1.05 + mouse.y * 0.05,
      0.04,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      mouse.x * 0.035,
      0.04,
    );
  });

  return (
    <group ref={group} position={[0, -4.2, -7]}>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={isDark ? '#38bdf8' : '#2563eb'}
          transparent
          opacity={index % 3 === 0 ? 0.18 : 0.08}
          lineWidth={0.65}
        />
      ))}
    </group>
  );
}

function DataConstellation({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => {
        const angle = index * 0.86;
        const radius = 3.4 + (index % 7) * 0.36;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(index * 1.71) * 1.8,
          Math.sin(angle) * radius - 4.5,
        );
      }),
    [],
  );

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.035 + mouse.x * 0.16;
    group.current.rotation.x = mouse.y * 0.08;
  });

  return (
    <group ref={group} position={[0, 0.4, -2]}>
      {nodes.map((node, index) => (
        <Float
          key={`node-${index}`}
          speed={1.2 + (index % 4) * 0.15}
          rotationIntensity={0.2}
          floatIntensity={0.55}
        >
          <mesh position={node}>
            <icosahedronGeometry args={[index % 5 === 0 ? 0.08 : 0.045, 1]} />
            <meshStandardMaterial
              color={index % 4 === 0 ? '#fbbf24' : isDark ? '#67e8f9' : '#1d4ed8'}
              emissive={index % 4 === 0 ? '#b45309' : '#0ea5e9'}
              emissiveIntensity={isDark ? 0.9 : 0.35}
              roughness={0.32}
            />
          </mesh>
        </Float>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`link-${index}`}
          points={[node, nodes[index + 1]]}
          color={isDark ? '#7dd3fc' : '#2563eb'}
          transparent
          opacity={0.16}
          lineWidth={0.45}
        />
      ))}
    </group>
  );
}

function FloatingGeometry({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.06 + mouse.x * 0.2;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} floatIntensity={0.8} rotationIntensity={0.25}>
        <mesh position={[-4.9, 2.7, -5.5]} rotation={[0.7, 0.1, 0.4]}>
          <torusKnotGeometry args={[0.62, 0.14, 120, 12]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={isDark ? 0.6 : 0.24}
            metalness={0.35}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.35} floatIntensity={0.7} rotationIntensity={0.45}>
        <mesh position={[5.2, 1.6, -6.2]} rotation={[0.4, 0.8, 0.2]}>
          <octahedronGeometry args={[0.86, 0]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1d4ed8"
            emissiveIntensity={isDark ? 0.7 : 0.25}
            metalness={0.5}
            roughness={0.24}
          />
        </mesh>
      </Float>
      <Float speed={0.95} floatIntensity={0.55} rotationIntensity={0.32}>
        <mesh position={[3.6, -2.2, -4.8]} rotation={[0.2, 0.9, 0.8]}>
          <dodecahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial
            color="#14b8a6"
            emissive="#0f766e"
            emissiveIntensity={isDark ? 0.55 : 0.2}
            roughness={0.28}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#f8fafc']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#eff6ff', 8, 26]} />
      <ambientLight intensity={isDark ? 0.5 : 0.85} />
      <directionalLight position={[4, 6, 3]} intensity={isDark ? 1.8 : 1.15} />
      <pointLight position={[-5, 2, -2]} color="#22d3ee" intensity={90} distance={12} />
      <pointLight position={[5, -1, -3]} color="#fbbf24" intensity={36} distance={9} />
      <Stars
        radius={42}
        depth={24}
        count={isDark ? 900 : 280}
        factor={isDark ? 2.2 : 1.1}
        saturation={0.6}
        fade
        speed={0.25}
      />
      <Sparkles
        count={52}
        scale={[11, 4.5, 9]}
        size={isDark ? 2.2 : 1.3}
        speed={0.35}
        color={isDark ? '#93c5fd' : '#2563eb'}
        opacity={isDark ? 0.5 : 0.24}
      />
      <CircuitGrid isDark={isDark} />
      <DataConstellation isDark={isDark} />
      <FloatingGeometry isDark={isDark} />
    </>
  );
}

export default function Nyle3DBackground() {
  const resolvedTheme = useMountedTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0.2, 8.2], fov: 52 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene isDark={isDark} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.20),transparent_28%),radial-gradient(circle_at_86%_28%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.28),rgba(248,250,252,0.72)_68%,rgba(248,250,252,0.98))] dark:bg-[radial-gradient(circle_at_16%_10%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.16),rgba(2,6,23,0.72)_72%,rgba(2,6,23,0.98))]" />
    </div>
  );
}
