import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

export type Word = { word: string; weight: number };

function spherePoints(count: number, radius: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const offset = 2 / count;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    pts.push([
      Math.cos(phi) * r * radius,
      y * radius,
      Math.sin(phi) * r * radius,
    ]);
  }
  return pts;
}

function WordMesh({
  text,
  size,
  position,
}: {
  text: string;
  size: number;
  position: [number, number, number];
}) {
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.02;
    ref.current.scale.setScalar(hovered ? 1.25 : 1.0);
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text
        fontSize={size}
        anchorX="center"
        anchorY="middle"
        color={hovered ? "#7dd3fc" : "#cfe6ff"}
      >
        {text}
      </Text>
    </group>
  );
}

export function WordCloudScene({ words }: { words: Word[] }) {
  const radius = 6;
  const points = useMemo(
    () => spherePoints(words.length || 1, radius),
    [words.length]
  );

  const sorted = useMemo(
    () => [...words].sort((a, b) => b.weight - a.weight),
    [words]
  );

  const minSize = 0.28;
  const maxSize = 1.1;

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.1} />
      {sorted.map((w, i) => {
        const size = minSize + (maxSize - minSize) * (w.weight || 0);
        return (
          <WordMesh
            key={w.word + i}
            text={w.word}
            size={size}
            position={points[i % points.length]}
          />
        );
      })}
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
