import {useEffect, useRef} from 'react'
import * as THREE from 'three'
import s from './LorenzAttractor.module.css'

interface LorenzAttractorProps {
	isActive?: boolean
	lyapunov?: number
	snr?: number
	spectralDeviation?: number
}

export const LorenzAttractor = ({
	isActive = true,
	lyapunov = 2.5,
	snr = 30,
	spectralDeviation = 50,
}: LorenzAttractorProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const sceneRef = useRef<THREE.Scene | null>(null)
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
	const animationFrameRef = useRef<number | null>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current
		const scene = new THREE.Scene()
		sceneRef.current = scene

		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000,
		)
		camera.position.z = 60

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
		})
		renderer.setSize(container.clientWidth, container.clientHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		container.appendChild(renderer.domElement)
		rendererRef.current = renderer

		const sigma = 10 + lyapunov * 2
		const rho = 28 + (snr / 50) * 10
		const beta = 8 / 3
		const dt = 0.005 + (spectralDeviation / 100) * 0.003

		let x = 0.1
		let y = 0
		let z = 0

		const points: THREE.Vector3[] = []
		const maxPoints = 5000

		const geometry = new THREE.BufferGeometry()

		const particleMaterial = new THREE.PointsMaterial({
			size: 0.15 + (snr / 50) * 0.1,
			vertexColors: true,
			transparent: true,
			opacity: 0.9,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
		})

		const particleSystem = new THREE.Points(geometry, particleMaterial)
		scene.add(particleSystem)

		const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3)
		scene.add(ambientLight)

		const rotationSpeed = 0.003 + (spectralDeviation / 100) * 0.007

		const animate = () => {
			if (!isActive) {
				if (animationFrameRef.current) {
					cancelAnimationFrame(animationFrameRef.current)
				}
				return
			}

			const dx = sigma * (y - x)
			const dy = x * (rho - z) - y
			const dz = x * y - beta * z

			x += dx * dt
			y += dy * dt
			z += dz * dt

			points.push(new THREE.Vector3(x, y, z))

			if (points.length > maxPoints) {
				points.shift()
			}

			const positions = new Float32Array(points.length * 3)
			const colors = new Float32Array(points.length * 3)

			const color1 = new THREE.Color(0x00ffff)
			const color2 = new THREE.Color(0x00ffaa)
			const color3 = new THREE.Color(0x0088ff)

			points.forEach((point, i) => {
				positions[i * 3] = point.x
				positions[i * 3 + 1] = point.y
				positions[i * 3 + 2] = point.z

				const t = i / points.length
				let color: THREE.Color

				if (spectralDeviation > 70) {
					color = color1.clone().lerp(color3, t)
				} else {
					color = color1.clone().lerp(color2, t)
				}

				colors[i * 3] = color.r
				colors[i * 3 + 1] = color.g
				colors[i * 3 + 2] = color.b
			})

			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
			geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

			const time = Date.now() * 0.001
			particleSystem.rotation.x = Math.sin(time * 0.3) * 0.3
			particleSystem.rotation.y += rotationSpeed
			particleSystem.rotation.z = Math.cos(time * 0.2) * 0.15

			const scale = 1 + Math.sin(time * 2) * 0.05 * (lyapunov / 3)
			particleSystem.scale.set(scale, scale, scale)

			renderer.render(scene, camera)
			animationFrameRef.current = requestAnimationFrame(animate)
		}

		animate()

		const handleResize = () => {
			if (!container) return

			camera.aspect = container.clientWidth / container.clientHeight
			camera.updateProjectionMatrix()
			renderer.setSize(container.clientWidth, container.clientHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
			renderer.dispose()
			geometry.dispose()
			particleMaterial.dispose()
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement)
			}
		}
	}, [isActive, lyapunov, snr, spectralDeviation])

	return <div ref={containerRef} className={s.container} />
}
