"use client"

import { useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import * as THREE from "three"

export function ARVRSection() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // Add a simple cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial({ color: 0x00b894 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Animation loop
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>AR/VR 3D Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mountRef}
          style={{ width: "100%", height: "400px" }}
          className="rounded-lg border"
        />
        <p className="mt-4 text-gray-600 text-sm">
          Interact with a 3D object powered by Three.js. Extend this section for AR/VR features!
        </p>
      </CardContent>
    </Card>
  )
}
