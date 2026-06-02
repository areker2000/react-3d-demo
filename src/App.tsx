import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState } from 'react';

interface MaterialConfig {
  color: string;
  roughness: number;
  metalness: number;
  name: string;
}

const MATER_LIST: Record<string, MaterialConfig> = {
  cyber: { name: '科幻金屬', color: '#00f3ff', roughness: 0.1, metalness: 0.8 },
  nordic: {
    name: '北歐陶瓷',
    color: '#ffffff',
    roughness: 0.6,
    metalness: 0.1,
  },
};

function RotatingBox({ materialConfig }: { materialConfig: MaterialConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={materialConfig.color}
        roughness={materialConfig.roughness}
        metalness={materialConfig.metalness}
      />
    </mesh>
  );
}

function App() {
  const [currentMat, setCurrentMat] =
    useState<keyof typeof MATER_LIST>('cyber');

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10, // 確保 UI 按鈕在 3D 畫布上方
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>材質切換器</h3>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>
          目前選擇：{MATER_LIST[currentMat].name}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentMat('cyber')}
            style={{
              padding: '8px 16px',
              backgroundColor: currentMat === 'cyber' ? '#00f3ff' : '#333',
              color: currentMat === 'cyber' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            科幻金屬
          </button>
          <button
            onClick={() => setCurrentMat('nordic')}
            style={{
              padding: '8px 16px',
              backgroundColor: currentMat === 'nordic' ? '#fff' : '#333',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            北歐陶瓷
          </button>
        </div>
      </div>

      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RotatingBox materialConfig={MATER_LIST[currentMat]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;

//
