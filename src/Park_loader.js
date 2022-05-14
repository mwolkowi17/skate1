import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Park(props) {
  const group = useRef()
  const { nodes } = useGLTF('/skatepark4.gltf')
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive castShadow receiveShadow object={nodes.Cylinder}
        scale={nodes.Cylinder.scale}
        translateOnAxis={nodes.Cylinder.translation}
        rotation={nodes.Cylinder.rotation}
      /* onClick={() => console.log('clicked')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}*/
      />

      

    </group>
  )
}

useGLTF.preload('/skatepark4.gltf')