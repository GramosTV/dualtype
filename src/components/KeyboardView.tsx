"use client"
import * as THREE from 'three'
import React, { useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements } from '@react-three/fiber'
import { DRACOLoader, KTX2Loader } from 'three-stdlib'

// Typ dla załadowanego modelu
type GLTFResult = GLTF & {
  nodes: {
    'lewa-gura': THREE.Mesh
  }
  materials: {
    Poliigon_PlasticMoldDryBlast_7495_2K: THREE.MeshPhysicalMaterial
  }
}
// Typ instancji zwracanych przez <Merged>
type MergedInstancesType = Record<
  string,
  React.FC<{
    rotation?: [number, number, number]
    scale?: number | [number, number, number]
    material?: THREE.Material
  }>
>

// Define a type for props to avoid using 'any'
type InstancesProps = {
  children: React.ReactNode;
  color?: string;
  [key: string]: React.ReactNode | string | number | undefined;
}

// Kontekst do przechowywania instancji
const ModelContext = createContext<MergedInstancesType | null>(null)

// Komponent do załadowania i udostępnienia instancji
export function Instances({ children, color = '#000000', ...props }: InstancesProps) {
  // Configure Draco loader
  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    return loader;
  }, []);

  // Configure KTX2 loader
  const ktx2Loader = useMemo(() => {
    const loader = new KTX2Loader();
    loader.setTranscoderPath('https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/');
    return loader;
  }, []);

  const { nodes } = useGLTF(
    '/3d/epic/Untitled.gltf',
    true,
    undefined,
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
      loader.setKTX2Loader(ktx2Loader);
    }
  ) as GLTFResult;

  // Create a material with the specified color
  const colorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: color,
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
  }), [color])

  const instances = useMemo(
    () => ({
      LewaGura: nodes['lewa-gura'],
    }),
    [nodes]
  ) 

  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <ModelContext.Provider value={instances as MergedInstancesType}>
          {React.Children.map(children, child => 
            React.isValidElement(child) 
              ? React.cloneElement(child as React.ReactElement<{ colorMaterial?: THREE.Material }>, { colorMaterial })
              : child
          )}
        </ModelContext.Provider>
      )}
    </Merged>
  )
}

// Komponent wyświetlający model
export function Model(props: ThreeElements['group'] & { colorMaterial?: THREE.Material }) {
  const instances = useContext(ModelContext)
  const { colorMaterial, ...restProps } = props

  if (!instances) return null

  return (
    <group {...restProps} dispose={null}>
      {instances.LewaGura && (
        <instances.LewaGura 
          rotation={[1.382, 0.239, -0.048]} 
          scale={[0.024, 0.024, 0.024]} 
          material={colorMaterial} // Use the colorMaterial here
        />
      )}
    </group>
  )
}

// Główny komponent do podglądu
interface KeyboardViewProps {
  color?: string
  board?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

export function KeyboardView({ color = '#000000', board, ...props }: KeyboardViewProps & ThreeElements['group']) {
  // Only pass specific props to Instances, and all props to Model
  return (
    <Instances color={color} board={board}>
      <Model {...props} />
    </Instances>
  )
}

// Wstępne ładowanie modelu
useGLTF.preload(
  '/3d/epic/Untitled.gltf',
  true,
  undefined,
  (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/');
    
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader);
  }
);
