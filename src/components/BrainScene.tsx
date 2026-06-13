import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BrainModel from './BrainModel';

export default function BrainScene() {
  return (
    <div className="w-full h-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ alpha: true }}>
        {/* Subtle lighting in case we inject 3D meshes later, though particles ignore it */}
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <BrainModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxDistance={18}
          minDistance={3}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
