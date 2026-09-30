"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

interface NeonCanvasProps {
  text: string;
  fontUrl: string;
  colorHex: string;
}

const NeonSign = ({ text, fontUrl, colorHex }: NeonCanvasProps) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Pulse effect using useFrame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Base intensity + slight flicker/pulse
      const baseIntensity = 3.5;
      const flicker = Math.sin(clock.elapsedTime * 10) * 0.1 + Math.sin(clock.elapsedTime * 30) * 0.05;
      materialRef.current.emissiveIntensity = baseIntensity + flicker;
    }
  });

  const neonColor = useMemo(() => new THREE.Color(colorHex), [colorHex]);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Text Geometry */}
      <Text
        font={fontUrl}
        fontSize={1.2}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
        characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:',.<>?/ "
        maxWidth={8}
        textAlign="center"
        lineHeight={1.2}
      >
        {text || 'Neon'}
        <meshStandardMaterial
          ref={materialRef}
          color="#ffffff" // White core of the neon tube
          emissive={neonColor} // Colored glow
          emissiveIntensity={3.5}
          toneMapped={false} // Crucial for bloom
        />
      </Text>

      {/* Glass tubing representation (subtle translucent overlay) */}
      <Text
        font={fontUrl}
        fontSize={1.2}
        position={[0, 0, 0.02]} // Slightly in front
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
        lineHeight={1.2}
      >
        {text || 'Neon'}
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </Text>
    </group>
  );
};

export default function NeonCanvas({ text, fontUrl, colorHex }: NeonCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ width: '100%', height: '100%', background: '#050507' }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <color attach="background" args={['#050507']} />
      
      <ambientLight intensity={0.2} />
      
      {/* PresentationControls allows the user to rotate and interact with the 3D sign */}
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.1, 0.1]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <NeonSign text={text} fontUrl={fontUrl} colorHex={colorHex} />
        
        {/* Soft floor reflection */}
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.5} 
          scale={20} 
          blur={2.5} 
          far={4.5} 
          color={colorHex} 
        />
      </PresentationControls>

      <Environment preset="night" />

      {/* Postprocessing for realistic bloom and atmosphere */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.8}
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
