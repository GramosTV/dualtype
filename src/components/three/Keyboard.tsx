import * as THREE from 'three';
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useGLTF, useTexture, useProgress, Html } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { DRACOLoader, KTX2Loader } from 'three-stdlib';

// Define the mesh structure for your specific model
interface GLTFResult extends GLTF {
  nodes: {
    BézierCurve: THREE.Mesh;
    'lewa-gura': THREE.Mesh;
    'lewa-gura001': THREE.Mesh;
    Cube001: THREE.Mesh;
  };
  materials: {
    [name: string]: THREE.Material;
  };
}

interface KeyboardProps {
  size?: string;
  board?: string;
}

// Loading component to show progress
const LoadingIndicator = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '1.5em' }}>{Math.round(progress)}% loaded</div>
    </Html>
  );
};

export const Keyboard: React.FC<KeyboardProps> = ({ size, board, ...props }) => {
  const [scale, setScale] = useState(size);
  const [boards, setboards] = useState(board);

  useEffect(() => {
    setScale(size);
    setboards(board);
  }, [size, scale, boards, board]);

  // Configure Draco loader path
  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    return loader;
  }, []);

  // Configure KTX2 loader path
  const ktx2Loader = useMemo(() => {
    const loader = new KTX2Loader();
    loader.setTranscoderPath('https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/');
    return loader;
  }, []);

  // Use generic type parameter instead of type assertion with 'any'
  const { nodes } = useGLTF(
    '/assets/models/object/customczysta2.gltf',
    true, // Load with draco
    undefined,
    (loader) => {
      // Apply the loaders
      loader.setDRACOLoader(dracoLoader);
      loader.setKTX2Loader(ktx2Loader);
    }
  ) as unknown as GLTFResult;

  // Fix texture paths to match your project structure
  const roughness = useTexture(
    '/assets/models/object/Poliigon_BoucleFabricBubbly_7827_Metallic_2K_jpg-Poliigon_BoucleFabricBubbly_7827_Roughness_2K_jpg.png'
  );

  const shader = useTexture('/assets/models/object/Poliigon_BoucleFabricBubbly_7827_Normal.png');

  const base = useTexture('/assets/models/object/Poliigon_BoucleFabricBubbly_7827_BaseColor.jpg');

  const gripMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      roughnessMap: roughness,
      bumpMap: base,
      color: board || '#282828',
      roughness: 0.55,
      bumpScale: 6,
      side: THREE.DoubleSide,
    });

    if (shader) {
      shader.wrapS = THREE.RepeatWrapping;
      shader.wrapT = THREE.RepeatWrapping;
      shader.repeat.set(1, 1);
      shader.needsUpdate = true;
      base.anisotropy = 6;
    }

    if (base) {
      base.wrapS = THREE.RepeatWrapping;
      base.wrapT = THREE.RepeatWrapping;
      base.repeat.set(1, 1);
      base.needsUpdate = true;
      base.anisotropy = 8;
    }

    return material;
  }, [roughness, base, board, shader]);

  const keycaps = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      roughnessMap: base,
      bumpMap: roughness,
      color: size || '#282828',
      roughness: 0.75,
      bumpScale: 6,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    return material;
  }, [roughness, base, size]);

  if (size) {
    keycaps.color = new THREE.Color(size);
  }

  if (board) {
    gripMaterial.color = new THREE.Color(board);
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve.geometry}
          material={keycaps}
          position={[0.165, 2.676, -0.76]}
          rotation={[-0.001, 0.147, -1.567]}
          scale={0.926}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['lewa-gura'].geometry}
          material={gripMaterial}
          position={[0.082, 4.661, -0.76]}
          rotation={[2.426, -1.545, 0.88]}
          scale={0.024}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['lewa-gura001'].geometry}
          material={gripMaterial}
          position={[0.154, 0.757, -0.68]}
          rotation={[2.868, 1.532, 1.849]}
          scale={-0.024}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={keycaps}
          position={[-0.612, 0.903, -0.526]}
          rotation={[2.868, 1.532, 1.849]}
          scale={-1.045}
        />
      </group>
    </Suspense>
  );
};

// Preload with Draco and KTX2 support
useGLTF.preload('/assets/models/object/customczysta2.gltf', true, undefined, (loader) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath('https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/');

  loader.setDRACOLoader(dracoLoader);
  loader.setKTX2Loader(ktx2Loader);
});
