'use client';

import { motion } from 'framer-motion';
import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Smartphone,
  Workflow,
} from 'lucide-react';

const orbitNodes = [
  {
    label: 'Web',
    icon: Code2,
    className: 'left-[4%] top-[18%]',
    accent: 'from-blue-500 to-cyan-300',
  },
  {
    label: 'Mobile',
    icon: Smartphone,
    className: 'right-[4%] top-[20%]',
    accent: 'from-teal-400 to-emerald-300',
  },
  {
    label: 'Cloud',
    icon: Cloud,
    className: 'bottom-[16%] left-[11%]',
    accent: 'from-amber-300 to-orange-400',
  },
  {
    label: 'Data',
    icon: Database,
    className: 'bottom-[13%] right-[12%]',
    accent: 'from-fuchsia-400 to-rose-300',
  },
];

export default function Nyle3DScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px] [perspective:1200px]">
      <motion.div
        initial={{ opacity: 0, rotateX: 18, rotateY: -18, y: 28 }}
        animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="nyle-scene-shell absolute inset-0"
      >
        <div className="nyle-orbit nyle-orbit-one" />
        <div className="nyle-orbit nyle-orbit-two" />
        <div className="nyle-orbit nyle-orbit-three" />

        <motion.div
          animate={{ rotateY: [0, 12, 0, -12, 0], rotateX: [0, -5, 3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="nyle-core"
        >
          <div className="nyle-core-face nyle-core-front">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                Nyle OS
              </span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-100">
                Live
              </span>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
                <Boxes className="h-8 w-8" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">Build</p>
                <p className="mt-1 text-sm text-slate-300">Launch-ready platforms</p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {['Discovery', 'Design', 'Delivery'].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <div className="h-2 flex-1 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: '20%' }}
                      animate={{ width: `${72 + index * 8}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.25 + index * 0.15,
                        ease: 'easeOut',
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300"
                    />
                  </div>
                  <span className="w-16 text-right text-xs text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="nyle-core-face nyle-core-side" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="nyle-flow-card left-[15%] top-[7%]"
        >
          <Workflow className="h-5 w-5 text-amber-200" />
          <span>Automation</span>
        </motion.div>

        {orbitNodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.label}
              animate={{ y: [0, index % 2 === 0 ? -12 : 12, 0] }}
              transition={{
                duration: 4.5 + index * 0.35,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`nyle-orbit-node ${node.className}`}
            >
              <div className={`rounded-2xl bg-gradient-to-br ${node.accent} p-[1px]`}>
                <div className="flex items-center gap-2 rounded-2xl bg-slate-950/88 px-4 py-3 text-white backdrop-blur">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-semibold">{node.label}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
