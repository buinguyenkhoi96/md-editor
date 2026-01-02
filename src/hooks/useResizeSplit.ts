import { useState, useEffect, useRef } from 'react'

interface UseResizeSplitOptions {
  viewMode: 'split' | 'edit' | 'preview'
  initialPosition?: number
  minPosition?: number
  maxPosition?: number
}

export function useResizeSplit({
  viewMode,
  initialPosition = 50,
  minPosition = 20,
  maxPosition = 80
}: UseResizeSplitOptions) {
  const [splitPosition, setSplitPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current || viewMode !== 'split') return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      const clamped = Math.max(minPosition, Math.min(maxPosition, percentage))
      setSplitPosition(clamped)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, viewMode, minPosition, maxPosition])

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  return {
    splitPosition,
    isDragging,
    containerRef,
    handleResizeStart
  }
}

