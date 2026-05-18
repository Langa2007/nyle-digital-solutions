'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  Line,
  MeshDistortMaterial,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import { Code2, Database, Globe2, ShieldCheck } from 'lucide-react';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const serviceNodes = [
  { label: 'WebGL UI', icon: Code2, position: [-2.6, 1.2, 0.8] },
  { label: 'Cloud Mesh', icon: Globe2, position: [2.5, 1.05, 0.4] },
  { label: 'Secure Data', icon: Database, position: [-2.2, -1.25, 0.2] },
  { label: 'Launch Ops', icon: ShieldCheck, position: [2.1, -1.3, 0.7] },
];

function CoreSystem() {
  const core = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const points = useMemo(
    () => serviceNodes.map((node) => new THREE.Vector3(...node.position)),
    [],
  );

  useFrame(({ clock }) => {
    if (core.current) {
      core.current.rotation.y = clock.elapsedTime * 0.22;
      core.current.rotation.x = Math.sin(clock.elapsedTime * 0.55) * 0.08;
    }

    if (ring.current) {
      ring.current.rotation.z = clock.elapsedTime * 0.35;
    }
  });

  return (
    <group>
      <group ref={core}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.1, 3]} />
          <MeshDistortMaterial
            color="#2563eb"
            distort={0.22}
            speed={1.2}
            metalness={0.55}
            roughness={0.22}
            emissive="#0f172a"
            emissiveIntensity={0.18}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.64, 0.012, 16, 160]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.2} />
        </mesh>
        <mesh rotation={[1.1, 0.3, 0.4]}>
          <torusGeometry args={[1.92, 0.01, 16, 160]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.75} />
        </mesh>
      </group>

      {serviceNodes.map((node, index) => {
        const Icon = node.icon;
        const position = new THREE.Vector3(...node.position);

        return (
          <Float
            key={node.label}
            speed={1.25 + index * 0.2}
            floatIntensity={0.45}
            rotationIntensity={0.12}
          >
            <group position={position}>
              <mesh castShadow>
                <boxGeometry args={[0.42, 0.42, 0.42]} />
                <meshStandardMaterial
                  color={index % 2 === 0 ? '#22d3ee' : '#14b8a6'}
                  emissive={index % 2 === 0 ? '#0891b2' : '#0f766e'}
                  emissiveIntensity={0.55}
                  metalness={0.35}
                  roughness={0.25}
                />
              </mesh>
              <Html center distanceFactor={7.8} transform>
                <div className="nyle-3d-label">
                  <Icon className="h-4 w-4" />
                  <span>{node.label}</span>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}

      {points.map((point, index) => (
        <Line
          key={index}
          points={[new THREE.Vector3(0, 0, 0), point]}
          color={index % 2 === 0 ? '#7dd3fc' : '#5eead4'}
          transparent
          opacity={0.48}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function PlatformDeck() {
  return (
    <group position={[0, -2.05, -0.2]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[3.7, 4.35, 0.22, 8]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.45}
          roughness={0.34}
          emissive="#082f49"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <torusGeometry args={[3.38, 0.014, 16, 160]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.1} />
      </mesh>
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 8;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 2.75, 0.26, Math.sin(angle) * 2.75]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.18, 0.08, 0.72]} />
            <meshStandardMaterial color="#1e293b" emissive="#2563eb" emissiveIntensity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Nyle3DScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-visible">
      <Canvas
        shadows
        camera={{ position: [0, 0.55, 6.4], fov: 43 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} castShadow />
        <pointLight position={[-3, 2.2, 2]} color="#22d3ee" intensity={55} distance={8} />
        <pointLight position={[3, -1.5, 3]} color="#fbbf24" intensity={32} distance={7} />
        <Environment preset="city" />
        <Sparkles count={72} scale={[5.8, 4.4, 3.8]} size={2.2} speed={0.42} color="#93c5fd" />
        <PresentationControls
          global
          cursor
          speed={1.35}
          zoom={0.92}
          rotation={[0, -0.18, 0]}
          polar={[-0.32, 0.32]}
          azimuth={[-0.45, 0.45]}
        >
          <Float speed={1.15} floatIntensity={0.25} rotationIntensity={0.12}>
            <CoreSystem />
            <PlatformDeck />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
