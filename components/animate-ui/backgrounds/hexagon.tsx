"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type HexagonBackgroundProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  hexagonProps?: React.ComponentProps<"div">
  hexagonSize?: number
  hexagonMargin?: number
}

function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 60,
  hexagonMargin = 4,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize
  const hexagonHeight = hexagonSize * 1.1
  const rowSpacing = hexagonSize * 0.8
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100)
  const computedMarginTop = baseMarginTop + hexagonMargin
  const oddRowMarginLeft = -(hexagonSize / 2)
  const evenRowMarginLeft = hexagonMargin / 2

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  })

  const updateGridDimensions = React.useCallback(() => {
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 3
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 3
    setGridDimensions({ rows, columns })
  }, [rowSpacing, hexagonWidth])

  React.useEffect(() => {
    updateGridDimensions()
    window.addEventListener("resize", updateGridDimensions)
    return () => window.removeEventListener("resize", updateGridDimensions)
  }, [updateGridDimensions])

  return (
    <div data-slot="hexagon-background" className={cn("relative size-full overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 size-full overflow-hidden">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            style={{
              marginTop: computedMarginTop,
              marginLeft: ((rowIndex + 1) % 2 === 0 ? evenRowMarginLeft : oddRowMarginLeft) - 10,
            }}
            className="inline-flex"
          >
            {Array.from({ length: gridDimensions.columns }).map((_, colIndex) => {
              const delay = (rowIndex + colIndex) * 50
              const isGlowing = (rowIndex + colIndex) % 11 === 0
              const isPulsing = (rowIndex + colIndex) % 17 === 0

              return (
                <div
                  key={`hexagon-${rowIndex}-${colIndex}`}
                  {...hexagonProps}
                  style={{
                    width: hexagonWidth,
                    height: hexagonHeight,
                    marginLeft: hexagonMargin,
                    animationDelay: `${delay}ms`,
                    ...hexagonProps?.style,
                  }}
                  className={cn(
                    "relative transition-all duration-1000 ease-in-out",
                    "[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]",
                    "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-slate-700/20 before:transition-all before:duration-700",
                    "after:content-[''] after:absolute after:inset-1 after:bg-slate-800/30 after:transition-all after:duration-500",
                    "after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]",
                    // Hover effects
                    "hover:before:bg-gradient-to-br hover:before:from-cyan-400/30 hover:before:via-blue-500/30 hover:before:to-purple-500/30",
                    "hover:after:bg-slate-700/50 hover:scale-110 hover:z-10",
                    // Special hexagons
                    isGlowing && "before:bg-gradient-to-br before:from-cyan-400/20 before:to-blue-500/20 animate-pulse",
                    isPulsing && "animate-bounce-slow",
                    hexagonProps?.className,
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

export { HexagonBackground, type HexagonBackgroundProps }
