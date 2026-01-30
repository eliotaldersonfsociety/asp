"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { ISourceOptions, Container } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

export default function NeuralBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = async (container?: Container) => {}

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: {
        color: { value: "transparent" },
      },

      fpsLimit: 60,

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "attract"],
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.6,
            },
          },
          attract: {
            distance: 250,
            duration: 0.4,
            speed: 1,
          },
        },
      },

      particles: {
        number: {
          value: 120,
          density: {
            enable: true,
            value_area: 900,
          },
        },

        color: {
          value: ["#38bdf8", "#818cf8"], // azul + violeta IA
        },

        links: {
          enable: true,
          distance: 160,
          color: "#38bdf8",
          opacity: 0.45,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },

        opacity: {
          value: { min: 0.3, max: 0.8 },
        },

        shape: {
          type: "circle",
        },

        size: {
          value: { min: 1, max: 3 },
        },
      },

      detectRetina: true,
    }),
    []
  )

  if (!init) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Particles
        id="neural-background"
        options={options}
        particlesLoaded={particlesLoaded}
        className="w-full h-full"
      />
    </div>
  )
}
