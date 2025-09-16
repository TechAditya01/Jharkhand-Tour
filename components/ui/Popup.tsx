"use client"

import * as React from "react"

interface PopupProps {
  isOpen: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  onClose: () => void
  children?: React.ReactNode
}

export function Popup({ isOpen, title, description, onClose, children }: PopupProps) {
  React.useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed top-16 right-4 z-50 w-96 bg-white rounded-lg shadow-lg p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
    >
      {title && (
        <h2 id="popup-title" className="text-lg font-semibold mb-2">
          {title}
        </h2>
      )}
      {description && (
        <p id="popup-description" className="mb-4 text-gray-700">
          {description}
        </p>
      )}
      <>
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          style={{ position: "absolute" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mt-6">{children}</div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            Close
          </button>
        </div>
      </>
    </div>
  )
}
