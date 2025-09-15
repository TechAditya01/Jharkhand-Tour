"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface VRTourProps {
  imageUrl: string
}

export function VRTour({ imageUrl }: VRTourProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    try {
      // Scene setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
      camera.position.set(0, 0, 0.1)

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      mount.appendChild(renderer.domElement)

      // Sphere geometry for 360 pano
      const geometry = new THREE.SphereGeometry(500, 60, 40)
      geometry.scale(-1, 1, 1)
      let texture: THREE.Texture | null = null
      let textureLoaded = false
      texture = new THREE.TextureLoader().load(
        imageUrl,
        () => {
          textureLoaded = true
          console.log("Texture loaded successfully:", imageUrl)
        },
        undefined,
        (err) => {
          textureLoaded = false
          console.error("Failed to load texture for VR image:", imageUrl, err)
          mount.innerHTML = '<div style="color:red;text-align:center;margin-top:2em">Failed to load VR image.</div>'
        }
      )
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // Mouse controls
      let isUserInteracting = false
      let lon = 0, lat = 0, phi = 0, theta = 0
      let onPointerDownPointerX = 0, onPointerDownPointerY = 0, onPointerDownLon = 0, onPointerDownLat = 0

      function onPointerDown(event: MouseEvent) {
        isUserInteracting = true
        onPointerDownPointerX = event.clientX
        onPointerDownPointerY = event.clientY
        onPointerDownLon = lon
        onPointerDownLat = lat
      }
      function onPointerMove(event: MouseEvent) {
        if (isUserInteracting) {
          lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon
          lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat
        }
      }
      function onPointerUp() {
        isUserInteracting = false
      }
      mount.addEventListener("pointerdown", onPointerDown)
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", onPointerUp)

      // Animation loop
      function animate() {
        lat = Math.max(-85, Math.min(85, lat))
        phi = THREE.MathUtils.degToRad(90 - lat)
        theta = THREE.MathUtils.degToRad(lon)
        camera.lookAt(new THREE.Vector3(
          500 * Math.sin(phi) * Math.cos(theta),
          500 * Math.cos(phi),
          500 * Math.sin(phi) * Math.sin(theta)
        ))
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()

      // Cleanup
      return () => {
        mount.removeChild(renderer.domElement)
        mount.removeEventListener("pointerdown", onPointerDown)
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", onPointerUp)
      }
    } catch (err) {
      mount.innerHTML = '<div style="color:red;text-align:center;margin-top:2em">VR viewer failed to render.</div>'
      console.error("VR viewer failed to render:", err)
    }
  }, [imageUrl])

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "500px", borderRadius: "12px", overflow: "hidden" }}
      className="my-4"
    >
      <div className="text-xs text-gray-400 text-center mt-2">VR viewer mounted: {imageUrl}</div>
      {/* Fallback error message for debugging */}
      {!imageUrl && (
        <div className="text-red-500 text-center mt-8">Image not found or failed to load.</div>
      )}
    </div>
  )
}
