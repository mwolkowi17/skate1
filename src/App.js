
import React, { Suspense} from 'react'
import { Canvas,useFrame} from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Park } from './Park_loader'
import { useRef, useState } from 'react'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  function Loader() {
    return <Html center style={{ color: 'black' }}>loading...</Html>
  }

  return (

    <Canvas camera={{ fov: 75, near: 0.1, far: 80, position: [0, 0, 0] }}>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        maxDistance={40}
      />
      <Suspense fallback={<Loader />}>
        <ambientLight />
        <Box position={[-1.2, 0, 0]} />
      </Suspense>
    </Canvas>
  )
}