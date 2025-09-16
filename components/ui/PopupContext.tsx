"use client"

import * as React from "react"
import { Popup } from "./Popup"

interface PopupContextType {
  showPopup: (title: React.ReactNode, description?: React.ReactNode) => void
  hidePopup: () => void
}

const PopupContext = React.createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState<React.ReactNode>(null)
  const [description, setDescription] = React.useState<React.ReactNode>(null)

  const showPopup = (title: React.ReactNode, description?: React.ReactNode) => {
    setTitle(title)
    setDescription(description)
    setIsOpen(true)
  }

  const hidePopup = () => {
    setIsOpen(false)
  }

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      <Popup isOpen={isOpen} title={title} description={description} onClose={hidePopup} />
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const context = React.useContext(PopupContext)
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}
