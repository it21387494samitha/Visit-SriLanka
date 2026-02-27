'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#14b8a6'); // teal
    const color2 = new THREE.Color('#0ea5e9'); // sky
    const color3 = new THREE.Color('#f59e0b'); // amber

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      const colorChoice = Math.random();
      const selectedColor = colorChoice < 0.5 ? color1 : colorChoice < 0.85 ? color2 : color3;
      col[i * 3] = selectedColor.r;
      col[i * 3 + 1] = selectedColor.g;
      col[i * 3 + 2] = selectedColor.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particles that go out of bounds
      if (posArray[i * 3 + 1] > 10) {
        posArray[i * 3] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 1] = -10;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({ count = 50 }: { count?: number }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6); // 2 points per line, 3 coords each
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 16;
      const y1 = (Math.random() - 0.5) * 16;
      const z1 = (Math.random() - 0.5) * 8;
      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 1.5;

      pos[i * 6] = x1;
      pos[i * 6 + 1] = y1;
      pos[i * 6 + 2] = z1;
      pos[i * 6 + 3] = x2;
      pos[i * 6 + 4] = y2;
      pos[i * 6 + 5] = z2;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#14b8a6" transparent opacity={0.06} />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={600} />
        <ConnectionLines count={40} />
      </Canvas>
    </div>
  );
}
