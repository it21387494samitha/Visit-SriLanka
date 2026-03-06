'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Points>(null);

  // Sri Lanka coordinates (roughly 7.8731° N, 80.7718° E)
  const sriLankaPosition = useMemo(() => {
    const lat = (7.8731 * Math.PI) / 180;
    const lon = (80.7718 * Math.PI) / 180;
    const radius = 2.05;
    return new THREE.Vector3(
      radius * Math.cos(lat) * Math.sin(lon),
      radius * Math.sin(lat),
      radius * Math.cos(lat) * Math.cos(lon)
    );
  }, []);

  // Create wireframe geometry for the globe
  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 48, 48);
    return geo;
  }, []);

  // Create dot pattern on sphere
  const dotPositions = useMemo(() => {
    const positions: number[] = [];
    const count = 2000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 2.01 * Math.cos(theta) * Math.sin(phi);
      const y = 2.01 * Math.sin(theta) * Math.sin(phi) * -1 + 2.01 * Math.cos(phi) * 0;
      const z = 2.01 * Math.cos(theta) * Math.sin(phi) * 0 + 2.01 * Math.cos(phi);
      positions.push(
        2.01 * Math.cos(theta) * Math.sin(phi),
        2.01 * Math.cos(phi),
        2.01 * Math.sin(theta) * Math.sin(phi)
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Main globe wireframe */}
      <mesh ref={meshRef} geometry={wireframeGeometry}>
        <meshBasicMaterial
          color="#0d9488"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Dot layer */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#14b8a6"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Globe surface - subtle */}
      <Sphere args={[1.98, 64, 64]}>
        <meshPhongMaterial
          color="#0a0a0a"
          transparent
          opacity={0.6}
          shininess={10}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#14b8a6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Sri Lanka marker - pulsing dot */}
      <mesh position={sriLankaPosition}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Sri Lanka glow ring */}
      <mesh position={sriLankaPosition}>
        <ringGeometry args={[0.06, 0.1, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#14b8a6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} color="#14b8a6" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#0ea5e9" />

        <GlobeMesh />
        <FloatingParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </div>
  );
}
