'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function useMountedTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? resolvedTheme : 'dark';
}

// ─── Aurora Rings (gentle slow-spinning coloured tori) ────────────────────────
function AuroraRings({ isDark }: { isDark: boolean }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) { r1.current.rotation.z = t * 0.04; r1.current.rotation.x = t * 0.02; }
    if (r2.current) { r2.current.rotation.z = -t * 0.03; r2.current.rotation.y = t * 0.025; }
    if (r3.current) { r3.current.rotation.x = t * 0.035; r3.current.rotation.z = t * 0.015; }
  });

  return (
    <group position={[0, 0, -8]}>
      <mesh ref={r1}>
        <torusGeometry args={[9.5, 0.06, 8, 200]} />
        <meshStandardMaterial
          color={isDark ? '#22d3ee' : '#3b82f6'}
          emissive={isDark ? '#0891b2' : '#1d4ed8'}
          emissiveIntensity={isDark ? 2.8 : 1.2}
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh ref={r2} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[11.5, 0.045, 8, 220]} />
        <meshStandardMaterial
          color={isDark ? '#a78bfa' : '#8b5cf6'}
          emissive={isDark ? '#7c3aed' : '#6d28d9'}
          emissiveIntensity={isDark ? 2.2 : 0.9}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh ref={r3} rotation={[0.6, 1.2, 0.8]}>
        <torusGeometry args={[14.0, 0.035, 8, 240]} />
        <meshStandardMaterial
          color={isDark ? '#34d399' : '#10b981'}
          emissive={isDark ? '#059669' : '#047857'}
          emissiveIntensity={isDark ? 1.8 : 0.7}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// ─── Floating Crystal Shards (background depth) ──────────────────────────────
function CrystalShards({ isDark }: { isDark: boolean }) {
  const shards = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        -6 - Math.random() * 10,
      ] as [number, number, number],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.12 + Math.random() * 0.28,
      color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a78bfa' : '#34d399',
      emissive: i % 3 === 0 ? '#0891b2' : i % 3 === 1 ? '#7c3aed' : '#059669',
      speed: 0.6 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={0.6} rotationIntensity={0.3}>
          <mesh position={s.pos} rotation={s.rot} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.emissive}
              emissiveIntensity={isDark ? 1.6 : 0.55}
              metalness={0.7}
              roughness={0.05}
              transparent
              opacity={isDark ? 0.55 : 0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// ─── Constellation Web (connected nodes in far background) ───────────────────
function ConstellationWeb({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => {
      const angle = i * 1.12;
      const r = 5.5 + (i % 6) * 0.7;
      return new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(i * 1.9) * 2.8,
        Math.sin(angle) * r - 8,
      );
    }), []);

  const linePoints = useMemo(() => {
    const pts: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (nodes[i].distanceTo(nodes[i + 1]) < 5) {
        pts.push([nodes[i], nodes[i + 1]]);
      }
    }
    return pts;
  }, [nodes]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.018 + pointer.x * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.04 + pointer.y * 0.04;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={0.7 + (i % 4) * 0.2} floatIntensity={0.25}>
          <mesh position={node}>
            <sphereGeometry args={[i % 5 === 0 ? 0.07 : 0.04, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#fbbf24' : isDark ? '#38bdf8' : '#3b82f6'}
              emissive={i % 3 === 0 ? '#d97706' : '#0ea5e9'}
              emissiveIntensity={isDark ? 1.4 : 0.5}
            />
          </mesh>
        </Float>
      ))}
      {linePoints.map(([a, b], i) => {
        // Render thin line as a thin box between two points
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const len = a.distanceTo(b);
        const dir = new THREE.Vector3().subVectors(b, a).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.004, 0.004, len, 4]} />
            <meshStandardMaterial
              color={isDark ? '#38bdf8' : '#2563eb'}
              emissive={isDark ? '#0284c7' : '#1d4ed8'}
              emissiveIntensity={0.9}
              transparent
              opacity={isDark ? 0.18 : 0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Interactive Hex Floor Grid ───────────────────────────────────────────────
function HexFloor({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const hexes = useMemo(() => {
    const items = [];
    const cols = 14;
    const rows = 14;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 1.75 + (r % 2) * 0.875;
        const z = (r - rows / 2) * 1.52;
        items.push({ x, z, idx: r * cols + c });
      }
    }
    return items;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const mx = pointer.x * 5;
    const mz = pointer.y * 5;
    const children = groupRef.current.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      const x = child.userData.x;
      const z = child.userData.z;
      const dist = Math.sqrt(x * x + z * z);
      const pdist = Math.sqrt((x - mx) ** 2 + (z - mz) ** 2);
      const wave = Math.sin(dist * 0.38 - t * 1.3) * 0.4;
      const hover = Math.max(0, 1.8 - pdist * 0.4) * 0.55;
      child.position.y = wave + hover;
      const s = 0.055 + (wave + hover) * 0.04;
      child.scale.set(s, s + hover * 0.08, s);
      const mat = child.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (isDark ? 0.7 : 0.25) + hover * 1.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -6, -4]} rotation={[0.3, 0.15, 0]}>
      {hexes.map((h) => (
        <mesh key={h.idx} position={[h.x, 0, h.z]} userData={{ x: h.x, z: h.z }}>
          <cylinderGeometry args={[0.72, 0.72, 0.12, 6]} />
          <meshStandardMaterial
            color={isDark ? '#0f172a' : '#e0f2fe'}
            emissive={isDark ? '#0ea5e9' : '#2563eb'}
            emissiveIntensity={isDark ? 0.7 : 0.25}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function SignalPrisms({ isDark }: { isDark: boolean }) {
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);
  const p3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (p1.current) {
      p1.current.position.set(
        Math.sin(t * 0.22) * 7,
        Math.cos(t * 0.18) * 3 + 1,
        -5 + Math.sin(t * 0.14) * 2,
      );
      p1.current.rotation.y = t * 0.18;
    }
    if (p2.current) {
      p2.current.position.set(
        Math.cos(t * 0.17) * 8,
        Math.sin(t * 0.25) * 3 - 1,
        -4 + Math.cos(t * 0.19) * 2,
      );
      p2.current.rotation.x = t * 0.16;
    }
    if (p3.current) {
      p3.current.position.set(
        Math.sin(t * 0.13 + 2) * 6,
        Math.cos(t * 0.21 + 1) * 4,
        -7 + Math.sin(t * 0.11) * 3,
      );
      p3.current.rotation.z = -t * 0.14;
    }
  });

  const prismMat = (color: string, emissive: string) => (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={isDark ? 2.2 : 0.7}
      transparent
      opacity={isDark ? 0.18 : 0.1}
    />
  );

  return (
    <>
      <mesh ref={p1} scale={[1.8, 0.16, 1.8]}>
        <octahedronGeometry args={[1, 0]} />
        {prismMat('#22d3ee', '#0891b2')}
      </mesh>
      <mesh ref={p2} scale={[2.3, 0.12, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        {prismMat('#a78bfa', '#7c3aed')}
      </mesh>
      <mesh ref={p3} scale={[1.4, 0.18, 1.4]}>
        <octahedronGeometry args={[1, 0]} />
        {prismMat('#34d399', '#059669')}
      </mesh>
    </>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <color attach="background" args={[isDark ? '#020617' : '#f0f9ff']} />
      <fog attach="fog" args={[isDark ? '#020617' : '#eff6ff', 14, 35]} />

      <ambientLight intensity={isDark ? 0.35 : 0.75} />
      <directionalLight position={[6, 8, 4]} intensity={isDark ? 1.8 : 1.0} />
      <pointLight position={[-8, 4, -4]} color="#22d3ee" intensity={isDark ? 120 : 40} distance={20} />
      <pointLight position={[8, -3, -5]} color="#a78bfa" intensity={isDark ? 90 : 30} distance={18} />
      <pointLight position={[0, 6, -6]} color="#fbbf24" intensity={isDark ? 60 : 20} distance={15} />

      <Stars
        radius={55}
        depth={35}
        count={isDark ? 1200 : 300}
        factor={isDark ? 2.2 : 0.8}
        saturation={0.6}
        fade
        speed={0.15}
      />

      <Sparkles
        count={80}
        scale={[18, 8, 14]}
        size={isDark ? 2.8 : 1.4}
        speed={0.25}
        color={isDark ? '#38bdf8' : '#3b82f6'}
        opacity={isDark ? 0.65 : 0.25}
      />
      <Sparkles
        count={40}
        scale={[14, 6, 10]}
        size={isDark ? 2.2 : 1.0}
        speed={0.35}
        color={isDark ? '#f9a8d4' : '#a78bfa'}
        opacity={isDark ? 0.45 : 0.18}
      />

      <AuroraRings isDark={isDark} />
      <CrystalShards isDark={isDark} />
      <ConstellationWeb isDark={isDark} />
      <HexFloor isDark={isDark} />
      <SignalPrisms isDark={isDark} />
    </>
  );
}

export default function Nyle3DBackground() {
  const resolvedTheme = useMountedTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* WebGL canvas */}
      <Canvas
        camera={{ position: [0, 1, 9.5], fov: 52 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene isDark={isDark} />
      </Canvas>

      {/* Aurora beam shafts */}
      <div className="site-beam site-beam-one" />
      <div className="site-beam site-beam-two" />
      <div className="site-beam site-beam-three" />

      {/* Subtle scanline texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 3px)',
          opacity: isDark ? 0.55 : 0.22,
          mixBlendMode: isDark ? 'overlay' : 'multiply',
        }}
      />

      {/* Colour-wash + vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? `
                radial-gradient(ellipse 80% 55% at 15% 12%, rgba(34,211,238,0.13) 0%, transparent 55%),
                radial-gradient(ellipse 70% 50% at 88% 20%, rgba(167,139,250,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 60% 45% at 50% 85%, rgba(52,211,153,0.08) 0%, transparent 50%),
                linear-gradient(180deg, rgba(2,6,23,0.05) 0%, rgba(2,6,23,0.38) 65%, rgba(2,6,23,0.88) 100%)
              `
            : `
                radial-gradient(ellipse 80% 55% at 15% 12%, rgba(59,130,246,0.11) 0%, transparent 55%),
                radial-gradient(ellipse 70% 50% at 88% 20%, rgba(139,92,246,0.08) 0%, transparent 50%),
                radial-gradient(ellipse 60% 45% at 50% 85%, rgba(16,185,129,0.06) 0%, transparent 50%),
                linear-gradient(180deg, rgba(240,249,255,0.15) 0%, rgba(240,249,255,0.58) 65%, rgba(240,249,255,0.92) 100%)
              `,
        }}
      />
    </div>
  );
}
