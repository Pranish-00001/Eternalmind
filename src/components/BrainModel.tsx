import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Generate the Texture Atlas for our characters
function createAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  ctx.clearRect(0, 0, 1024, 1024);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  for (let i = 0; i < 64; i++) {
    const char = chars[i % chars.length];
    const x = (i % 8) * (1024 / 8) + (1024 / 16);
    const y = Math.floor(i / 8) * (1024 / 8) + (1024 / 16);
    ctx.fillText(char, x, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  // Important for precise point-rendering text lookup without mipmap blur bleeding
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.flipY = false;
  return texture;
}

// 2. Algorithm to generate a stylised brain shape
function generateBrainPositions(count: number) {
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  let i = 0;

  const scaleFactor = 2.5;

  const pushPoint = (x: number, y: number, z: number) => {
    if (i >= count) return;
    positions[i * 3] = x * scaleFactor;
    positions[i * 3 + 1] = y * scaleFactor;
    positions[i * 3 + 2] = z * scaleFactor;
    randoms[i] = Math.random();
    i++;
  }

  const sampleHemisphere = (sign: number) => {
    const theta = Math.random() * 2.0 * Math.PI;
    const phi = Math.acos(Math.random() * 2.0 - 1.0);
    const r = 0.6 + Math.pow(Math.random(), 0.5) * 0.4;

    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.cos(phi);
    let z = r * Math.sin(phi) * Math.sin(theta);

    x *= 0.55;
    y *= 0.8;
    z *= 1.1;

    x += sign * 0.3;

    if (z > 0.2) {
      const taper = 1.0 - (z - 0.2) * 0.3;
      x *= taper;
    }

    if (z < -0.4) {
      y *= 1.05;
      x *= 1.1;
    }

    if (y < 0.0 && z > -0.6 && z < 0.4) {
      x += sign * 0.15 * Math.abs(y);
    }

    const fissureGap = 0.03;
    if (sign === -1 && x > -fissureGap) x = -fissureGap;
    if (sign === 1 && x < fissureGap) x = fissureGap;

    const freq = 6.0;
    const n1 = Math.sin(x*freq + Math.cos(y*freq + z*freq));
    const n2 = Math.cos(y*freq + Math.sin(z*freq + x*freq));
    const n3 = Math.sin(z*freq + Math.cos(x*freq + y*freq));
    const fold = (n1 + n2 + n3) * 0.03;

    const len = Math.sqrt(x*x + y*y + z*z) || 1.0;
    x += (x/len) * fold;
    y += (y/len) * fold;
    z += (z/len) * fold;

    const tilt = 0.15;
    const tempY = y * Math.cos(tilt) - z * Math.sin(tilt);
    const tempZ = y * Math.sin(tilt) + z * Math.cos(tilt);

    pushPoint(x, tempY, tempZ);
  };

  const sampleCerebellum = () => {
    const theta = Math.random() * 2.0 * Math.PI;
    const phi = Math.acos(Math.random() * 2.0 - 1.0);
    const r = 0.5 + Math.pow(Math.random(), 0.5) * 0.5;

    let x = r * Math.sin(phi) * Math.cos(theta) * 0.6;
    let y = r * Math.cos(phi) * 0.3;
    let z = r * Math.sin(phi) * Math.sin(theta) * 0.4;

    y -= 0.65;
    z -= 0.55;

    const fold = Math.cos(y * 40.0 + Math.sin(x*10.0)) * 0.02;
    x += x * fold;
    z += z * fold;

    const tilt = 0.15;
    const tempY = y * Math.cos(tilt) - z * Math.sin(tilt);
    const tempZ = y * Math.sin(tilt) + z * Math.cos(tilt);
    
    pushPoint(x, tempY, tempZ);
  };

  const sampleBrainStem = () => {
    const theta = Math.random() * 2.0 * Math.PI;
    const height = Math.random() * 2.0 - 1.0;
    const r = 0.15 + Math.random() * 0.1;

    let x = r * Math.cos(theta);
    let z = r * Math.sin(theta);
    let y = height * 0.35 - 0.8;

    z -= 0.2;

    if (y < -0.9) {
      const medullaTaper = 1.0 - Math.abs(y + 0.9) * 2.0;
      x *= Math.max(0.3, medullaTaper);
      z *= Math.max(0.3, medullaTaper);
    }

    const fold = Math.sin(theta * 6.0) * 0.02;
    x += Math.cos(theta) * fold;
    z += Math.sin(theta) * fold;

    const tilt = 0.15;
    const tempY = y * Math.cos(tilt) - z * Math.sin(tilt);
    const tempZ = y * Math.sin(tilt) + z * Math.cos(tilt);

    pushPoint(x, tempY, tempZ);
  }

  while (i < count) {
    const r = Math.random();
    if (r < 0.42) sampleHemisphere(-1);
    else if (r < 0.84) sampleHemisphere(1);
    else if (r < 0.94) sampleCerebellum();
    else sampleBrainStem();
  }

  return { positions, randoms };
}

// 3. Custom shaders for interaction and appearance
const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uHover;
  uniform float uSize;

  attribute float aRandom;
  varying float vRandom;
  varying vec3 vPos;

  void main() {
    vRandom = aRandom;
    vec3 pos = position;

    // Breathing effect over time
    float breathing = sin(uTime * 2.0 + pos.y * 3.0) * 0.02;
    pos += normalize(pos) * breathing;

    // Mouse Interaction
    float dist = distance(pos, uMouse);
    float radius = 7.0; // Huge radius of effect

    if (dist < radius) {
      vec3 dir = normalize(pos - uMouse);
      
      // Add random chaotic noise to the direction so it disperses like a cloud, not just a sphere surface
      vec3 noiseDir = normalize(vec3(
        sin(aRandom * 123.4), 
        cos(aRandom * 456.7), 
        sin(aRandom * 789.1)
      ));
      
      vec3 finalDir = normalize(dir + noiseDir * 0.8);
      
      float force = pow((radius - dist) / radius, 1.2); // Slower falloff, hits more particles harder
      pos += finalDir * force * 22.0 * uHover; // Massive explosion factor
    }

    vPos = pos;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Attenuate point size by distance relative to camera
    gl_PointSize = uSize * (1.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;

  varying float vRandom;
  varying vec3 vPos;

  void main() {
    // We deterministically map each point's random assigned attribute to one of 64 cells.
    float index = floor(vRandom * 64.0);
    float col = mod(index, 8.0);
    float row = floor(index / 8.0);

    // Calculate sub-uv coordinate within the 8x8 grid.
    vec2 uv = gl_PointCoord;
    uv.x = (uv.x + col) / 8.0;
    uv.y = (uv.y + row) / 8.0;

    // Sample the character texture
    vec4 texColor = texture2D(uTexture, uv);
    if (texColor.a < 0.1) discard;

    // Create a color gradient based on height and random variance
    float mixVal = smoothstep(-1.2, 0.8, vPos.y) + (vRandom - 0.5) * 0.4;
    vec3 finalColor = mix(uColor1, uColor2, clamp(mixVal, 0.0, 1.0));

    // Exaggerate local intensity for a neon effect
    finalColor *= 1.3;

    // Holographic pulsing effect
    float pulse = 0.6 + 0.4 * sin(uTime * 2.0 + vRandom * 15.0 + vPos.y * 5.0);
    finalColor *= pulse;

    gl_FragColor = vec4(finalColor, texColor.a * (0.6 + 0.4 * pulse));
  }
`;

export default function BrainModel() {
  const { viewport } = useThree();
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Interaction memory structures
  const targetMouse = useRef(new THREE.Vector3(999, 999, 999));
  const currentMouse = useRef(new THREE.Vector3(999, 999, 999));
  const isHovering = useRef(0.0);
  
  // Constants
  const particleCount = 45000;
  
  // Memoize geometry generations so they do not get recalculated on renders
  const texture = useMemo(() => createAtlas(), []);
  const { positions, randoms } = useMemo(() => generateBrainPositions(particleCount), []);
  
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  const pointSize = Math.min(45.0 * dpr, 80.0);

  useFrame((state) => {
    if (!shaderMaterialRef.current) return;
    
    // Animate Y rotation of the whole particle group starting from 0 (perfect default profile view)
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }

    // Animate time
    shaderMaterialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // Lerp mouse positions for fluid spring-like repulsion
    currentMouse.current.lerp(targetMouse.current, 0.08);
    shaderMaterialRef.current.uniforms.uMouse.value.copy(currentMouse.current);

    // Lerp the hover state so particles gradually return when the cursor leaves the bounds
    shaderMaterialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      shaderMaterialRef.current.uniforms.uHover.value,
      isHovering.current,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      {/* 
        A transparent protective boundary sphere that acts as the interaction surface. 
        It sits precisely encompassing the brain to grab raycasted intersections smoothly.
      */}
      <mesh
        onPointerMove={(e) => {
          targetMouse.current.copy(e.point);
          isHovering.current = 1.0;
        }}
        onPointerOut={() => {
          isHovering.current = 0.0;
        }}
      >
        <sphereGeometry args={[7.0, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* The Particle System itself */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aRandom" count={particleCount} array={randoms} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          ref={shaderMaterialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector3() },
            uHover: { value: 0 },
            uSize: { value: pointSize },
            uTexture: { value: texture },
            uColor1: { value: new THREE.Color("#D4AF37") }, // Gold
            uColor2: { value: new THREE.Color("#FFF2C8") }, // Light highlight gold
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </group>
  );
}
