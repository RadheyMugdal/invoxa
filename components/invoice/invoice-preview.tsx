"use client"

import { type InvoiceData } from "@/types/invoice"
import { InvoiceTemplate } from "./invoice-template"
import { useEffect, useRef, useState } from "react"

interface InvoicePreviewProps {
  invoice: InvoiceData
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const container = containerRef.current
      const invoice = container.firstElementChild as HTMLElement
      if (!invoice) return
      // A4 dimensions in mm to px (1mm ≈ 3.78px)
      const a4Width = 210 * 3.78
      const a4Height = 297 * 3.78
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      // Add padding consideration (32px for padding)
      const availableWidth = containerWidth - 32
      const availableHeight = containerHeight - 32
      const scaleX = availableWidth / a4Width
      const scaleY = availableHeight / a4Height
      const newScale = Math.min(scaleX, scaleY)
      setScale(newScale)
    }
    updateScale()
    const resizeObserver = new ResizeObserver(updateScale)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])
  return (
    <div ref={containerRef} className="flex items-center justify-center overflow-hidden h-full w-full ">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}>
        <InvoiceTemplate invoice={invoice} />
      </div>
    </div>
  )
}
