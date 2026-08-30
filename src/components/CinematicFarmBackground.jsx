import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CinematicFarmBackground({ isLanding = false }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(true)

  useEffect(() => {
    // Ensure video is muted and starts playing for strict browser autoplay policies
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().then(() => setVideoLoaded(true)).catch(() => {})
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !containerRef.current || !videoRef.current) return

    // Subtle mouse parallax using GSAP
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const xNorm = (e.clientX / innerWidth - 0.5) * 2  // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2 // -1 to 1

      // Parallax strength (15px maximum shift)
      const moveX = xNorm * -15
      const moveY = yNorm * -12

      gsap.to(videoRef.current, {
        x: moveX,
        y: moveY,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Base Dark Green Fallback ── */}
      <div className="absolute inset-0 bg-[#10251B]" />

      {/* ── Fullscreen Cinematic Video with GSAP Parallax ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        onPlay={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out"
        style={{
          opacity: videoLoaded ? (isLanding ? 0.60 : 0.40) : 0,
          transform: 'scale(1.08)',
          filter: isLanding ? 'contrast(1.05) saturate(1.1)' : 'contrast(1.02) saturate(1.05)',
        }}
      >
        <source src="https://v1.pinimg.com/videos/iht/720p/d2/52/ef/d252efcbfa5e25e81343ef42eee0d8f2.mp4" type="video/mp4" />
        <source src="/farm-bg.mp4" type="video/mp4" />
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* ── Layer 1: Readability Gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: isLanding
            ? 'linear-gradient(180deg, rgba(16,37,27,0.60) 0%, rgba(24,53,40,0.45) 50%, rgba(16,37,27,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(245,241,232,0.72) 0%, rgba(245,241,232,0.58) 50%, rgba(245,241,232,0.78) 100%)',
        }}
      />

      {/* ── Layer 2: Warm Agricultural Glow Orbs ── */}
      <div
        className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15]"
        style={{ background: 'radial-gradient(circle, #4F8A5B 0%, #10251B 70%)' }}
      />
      <div
        className="absolute bottom-0 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #B7D7D0 0%, #2A6B97 70%)' }}
      />
      <div
        className="absolute top-[40%] left-[35%] w-[600px] h-[450px] rounded-full blur-[130px] opacity-[0.05]"
        style={{ background: '#8B6B45' }}
      />

      {/* ── Layer 3: Soft Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(16,37,27,0.25) 100%)',
        }}
      />

      {/* ── Layer 4: Fine Film Grain Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  )
}
