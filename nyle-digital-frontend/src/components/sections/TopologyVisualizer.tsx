'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  Line,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Server, Laptop, Cpu, Database, Activity } from 'lucide-react';

// Define systems in our topology
export interface SystemNode {
  id: string;
  label: string;
  type: 'client' | 'balancer' | 'worker' | 'database';
  position: [number, number, number];
  status: 'healthy' | 'warning' | 'critical';
  icon: any;
  metrics: {
    cpu: string;
    ram: string;
    latency: string;
    throughput: string;
  };
}

interface TopologyVisualizerProps {
  onSelectNode: (node: SystemNode) => void;
  selectedNodeId?: string;
}

const systemNodes: SystemNode[] = [
  {
    id: 'client-web',
    label: 'Web Client Interface',
    type: 'client',
    position: [-2.6, 1.15, 0],
    status: 'healthy',
    icon: Laptop,
    metrics: { cpu: '4%', ram: '280MB', latency: '12ms', throughput: '120 req/s' },
  },
  {
    id: 'client-mobile',
    label: 'iOS/Android App',
    type: 'client',
    position: [-2.6, -1.15, 0],
    status: 'healthy',
    icon: Laptop,
    metrics: { cpu: '2%', ram: '142MB', latency: '18ms', throughput: '95 req/s' },
  },
  {
    id: 'load-balancer',
    label: 'Cloud Ingress Balancer',
    type: 'balancer',
    position: [0, 0, 0],
    status: 'healthy',
    icon: Shield,
    metrics: { cpu: '12%', ram: '1.2GB', latency: '2ms', throughput: '215 req/s' },
  },
  {
    id: 'api-worker',
    label: 'NextJS Server API',
    type: 'worker',
    position: [2.6, 1.3, 0],
    status: 'healthy',
    icon: Cpu,
    metrics: { cpu: '28%', ram: '2.4GB', latency: '16ms', throughput: '115 req/s' },
  },
  {
    id: 'db-master',
    label: 'Postgres DB (Master)',
    type: 'database',
    position: [2.6, -1.25, 0],
    status: 'warning',
    icon: Database,
    metrics: { cpu: '76%', ram: '7.8GB', latency: '64ms', throughput: '100 req/s' },
  },
];

// Data packet component simulating requests traversing the channels
function DataPacket({
  start,
  end,
  delay = 0,
  speed = 0.58,
  color = '#38bdf8',
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  delay?: number;
  speed?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime() + delay;
    const progress = (time * speed) % 1.0;
    meshRef.current.position.lerpVectors(start, end, progress);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.065, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Scene({ onSelectNode, selectedNodeId }: TopologyVisualizerProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Group paths and points for data flow
  const paths = useMemo(() => {
    const clients = systemNodes.filter((n) => n.type === 'client');
    const balancer = systemNodes.find((n) => n.type === 'balancer')!;
    const workers = systemNodes.filter((n) => n.type === 'worker' || n.type === 'database');

    const list: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    // Client to Balancer connections
    clients.forEach((c) => {
      list.push({
        start: new THREE.Vector3(...c.position),
        end: new THREE.Vector3(...balancer.position),
      });
    });

    // Balancer to Worker connections
    workers.forEach((w) => {
      list.push({
        start: new THREE.Vector3(...balancer.position),
        end: new THREE.Vector3(...w.position),
      });
    });

    return list;
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[-4, 4, 3]} intensity={18} color="#22d3ee" />
      <pointLight position={[4, -4, 3]} intensity={12} color="#f43f5e" />
      
      {/* Visual Connections (Wires) */}
      {paths.map((path, idx) => (
        <Line
          key={`wire-${idx}`}
          points={[path.start, path.end]}
          color={hoveredNode ? '#2563eb' : '#334155'}
          transparent
          opacity={0.35}
          lineWidth={1.2}
        />
      ))}

      {/* Live Data Packets traversing paths */}
      {paths.map((path, idx) => (
        <group key={`packets-${idx}`}>
          <DataPacket start={path.start} path-id={idx} end={path.end} delay={idx * 0.45} speed={0.55} color="#38bdf8" />
          <DataPacket start={path.start} path-id={idx} end={path.end} delay={idx * 0.45 + 0.5} speed={0.55} color="#2dd4bf" />
        </group>
      ))}

      {/* Nodes rendering */}
      {systemNodes.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNode === node.id;
        const Icon = node.icon;
        const pos = new THREE.Vector3(...node.position);

        let geometryArgs: [number, number, number, number?] = [0.36, 0.36, 0.36];
        let shape: 'box' | 'cylinder' | 'sphere' = 'box';

        if (node.type === 'balancer') {
          shape = 'cylinder';
          geometryArgs = [0.45, 0.45, 0.28, 32];
        } else if (node.type === 'database') {
          shape = 'cylinder';
          geometryArgs = [0.38, 0.38, 0.48, 16];
        } else if (node.type === 'client') {
          shape = 'sphere';
          geometryArgs = [0.24, 16, 16];
        }

        // Color based on status
        let nodeColor = '#3b82f6'; // client
        let glowColor = '#60a5fa';
        if (node.type !== 'client') {
          if (node.status === 'warning') {
            nodeColor = '#d97706';
            glowColor = '#f59e0b';
          } else if (node.status === 'critical') {
            nodeColor = '#e11d48';
            glowColor = '#f43f5e';
          } else {
            nodeColor = '#0d9488';
            glowColor = '#14b8a6';
          }
        }

        return (
          <Float
            key={node.id}
            speed={isHovered ? 2.5 : 1.0}
            floatIntensity={isHovered ? 0.25 : 0.08}
            rotationIntensity={0.05}
          >
            <group
              position={pos}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                setHoveredNode(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'default';
                setHoveredNode(null);
              }}
            >
              {/* Outer selection ring */}
              {(isSelected || isHovered) && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.62, 0.02, 16, 64]} />
                  <meshBasicMaterial color={glowColor} toneMapped={false} />
                </mesh>
              )}

              {/* Main Node Geometry */}
              <mesh castShadow>
                {shape === 'box' && <boxGeometry args={geometryArgs as any} />}
                {shape === 'cylinder' && (
                  <cylinderGeometry args={geometryArgs as any} />
                )}
                {shape === 'sphere' && <sphereGeometry args={geometryArgs as any} />}
                <meshStandardMaterial
                  color={nodeColor}
                  metalness={0.7}
                  roughness={0.2}
                  emissive={nodeColor}
                  emissiveIntensity={isSelected ? 0.95 : isHovered ? 0.65 : 0.2}
                />
              </mesh>

              {/* Float HTML Label */}
              <Html center distanceFactor={7.5} transform>
                <div
                  className={`nyle-3d-label flex items-center gap-2 border-2 border-slate-700 bg-slate-900/90 text-white p-2 rounded-xl transition-all ${
                    isSelected ? 'ring-2 ring-blue-500 scale-105 border-blue-400' : 'opacity-85'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-blue-400 animate-pulse' : 'text-slate-300'}`} />
                  <span className="font-semibold text-xs leading-none">{node.label}</span>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </>
  );
}

export default function TopologyVisualizer(props: TopologyVisualizerProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950/60 border border-slate-800/80 shadow-2xl backdrop-blur-md">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.8], fov: 48 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PresentationControls
          global
          cursor
          speed={1.2}
          zoom={0.96}
          rotation={[0, 0, 0]}
          polar={[-0.25, 0.25]}
          azimuth={[-0.45, 0.45]}
        >
          <Scene {...props} />
        </PresentationControls>
        <Environment preset="city" />
        <Sparkles count={34} scale={[5, 4, 3]} size={1.8} speed={0.3} color="#60a5fa" />
      </Canvas>
    </div>
  );
}
