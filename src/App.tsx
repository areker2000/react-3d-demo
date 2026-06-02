import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import { Model } from '../Model';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Stage
          intensity={0.5}
          environment="city"
          adjustCamera
          shadows={{ type: 'contact', bias: -0.0001 }}
        >
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Stage>
        <OrbitControls makeDefault enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default App;

//
