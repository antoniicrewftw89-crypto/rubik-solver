import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { FACE_COLORS } from '../utils/cubeNotation';
import { parseMove, stickerColor } from '../utils/cubeEngine';

const GAP = 1.0;        // separación entre centros de cubies
const CUBIE = 0.95;     // lado del cubie (deja un pequeño hueco de plástico)
const STICKER = 0.8;    // lado del sticker
const AXIS_INDEX = { x: 0, y: 1, z: 2 };

// Las 6 direcciones de cara con la geometría del sticker para cada eje.
const STICKER_DIRS = [
  { dir: [1, 0, 0],  args: [0.05, STICKER, STICKER] },
  { dir: [-1, 0, 0], args: [0.05, STICKER, STICKER] },
  { dir: [0, 1, 0],  args: [STICKER, 0.05, STICKER] },
  { dir: [0, -1, 0], args: [STICKER, 0.05, STICKER] },
  { dir: [0, 0, 1],  args: [STICKER, STICKER, 0.05] },
  { dir: [0, 0, -1], args: [STICKER, STICKER, 0.05] },
];

// Las 26 posiciones visibles (todas menos el centro oculto 0,0,0).
const CUBIE_POSITIONS = [];
for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++)
      if (x || y || z) CUBIE_POSITIONS.push([x, y, z]);

function Cubie({ pos, state }) {
  const [x, y, z] = pos;
  return (
    <group position={[x * GAP, y * GAP, z * GAP]}>
      {/* Plástico negro redondeado */}
      <RoundedBox args={[CUBIE, CUBIE, CUBIE]} radius={0.11} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color="#0c0d12" roughness={0.45} metalness={0.15} />
      </RoundedBox>

      {/* Stickers de color en las caras exteriores */}
      {STICKER_DIRS.map(({ dir, args }) => {
        const key = stickerColor(state, pos, dir);
        if (!key) return null;
        const color = FACE_COLORS[key];
        return (
          <mesh key={dir.join()} position={[dir[0] * 0.49, dir[1] * 0.49, dir[2] * 0.49]}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.12} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

const easeInOut = t => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

// Modelo del cubo: separa los cubies de la capa en rotación dentro de un group
// que gira durante la animación; el resto permanece estático.
function CubeModel({ state, animMove, animId, onAnimDone, speed }) {
  const layerRef = useRef();
  const progress = useRef(0);
  const doneRef = useRef(false);

  const meta = useMemo(() => (animMove ? parseMove(animMove) : null), [animMove]);

  useEffect(() => {
    progress.current = 0;
    doneRef.current = false;
    if (layerRef.current) layerRef.current.rotation.set(0, 0, 0);
  }, [animId, animMove]);

  useFrame((_, delta) => {
    if (!meta || !layerRef.current) return;
    const duration = 0.5 / (speed || 1);
    progress.current = Math.min(1, progress.current + delta / duration);
    const angle = THREE.MathUtils.degToRad(meta.angleDeg) * easeInOut(progress.current);
    layerRef.current.rotation[meta.axis] = angle;
    if (progress.current >= 1 && !doneRef.current) {
      doneRef.current = true;
      onAnimDone?.();
    }
  });

  const inLayer = p => {
    if (!meta) return false;
    return meta.layers.includes(Math.round(p[AXIS_INDEX[meta.axis]]));
  };

  return (
    <group>
      {CUBIE_POSITIONS.filter(p => !inLayer(p)).map(p => (
        <Cubie key={p.join()} pos={p} state={state} />
      ))}
      <group ref={layerRef}>
        {CUBIE_POSITIONS.filter(inLayer).map(p => (
          <Cubie key={p.join()} pos={p} state={state} />
        ))}
      </group>
    </group>
  );
}

export default function CubeViewer({
  cubeState,
  animMove = null,
  animId = 0,
  onAnimDone,
  speed = 1,
  autoRotate = true,
  tall = false,
}) {
  return (
    <div className="cube-viewer-wrap">
      <div className={`cube-canvas ${tall ? 'tall' : ''}`}>
        <Canvas shadows camera={{ position: [4.6, 4, 5.6], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 8, 6]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-6, 2, -4]} intensity={0.4} color="#8ab4ff" />
          <pointLight position={[0, -6, 0]} intensity={0.3} color="#22d3ee" />

          <CubeModel state={cubeState} animMove={animMove} animId={animId} onAnimDone={onAnimDone} speed={speed} />

          <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={9} blur={2.6} far={4} />
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={13}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
          />
        </Canvas>
      </div>
    </div>
  );
}
