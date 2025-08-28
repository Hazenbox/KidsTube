"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PinModalProps {
  onSuccess: () => void
  onClose: () => void
}

export default function PinModal({ onSuccess, onClose }: PinModalProps) {
  const [pin, setPin] = useState("")
  const [storedPin, setStoredPin] = useState("")
  const [isSettingPin, setIsSettingPin] = useState(false)
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const savedPin = localStorage.getItem("library-pin")
    if (savedPin) {
      setStoredPin(savedPin)
    } else {
      setIsSettingPin(true)
    }
  }, [])

  const handleSubmit = () => {
    if (isSettingPin) {
      if (pin.length !== 4 || confirmPin.length !== 4) {
        setError("PIN must be 4 digits")
        return
      }
      if (pin !== confirmPin) {
        setError("PINs do not match")
        return
      }
      localStorage.setItem("library-pin", pin)
      onSuccess()
    } else {
      if (pin === storedPin) {
        onSuccess()
      } else {
        setError("Incorrect PIN")
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#272727] rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-white text-xl font-medium mb-4 text-center">{isSettingPin ? "Set PIN" : "Enter PIN"}</h2>

        <div className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.slice(0, 4))
                setError("")
              }}
              className="bg-[#0f0f0f] border-[#0f0f0f] text-white text-center text-lg tracking-widest"
              maxLength={4}
            />
          </div>

          {isSettingPin && (
            <div>
              <Input
                type="password"
                placeholder="Confirm PIN"
                value={confirmPin}
                onChange={(e) => {
                  setConfirmPin(e.target.value.slice(0, 4))
                  setError("")
                }}
                className="bg-[#0f0f0f] border-[#0f0f0f] text-white text-center text-lg tracking-widest"
                maxLength={4}
              />
            </div>
          )}

          {error && <p className="text-[#ff0000] text-sm text-center">{error}</p>}

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#d9d9d9] text-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-black bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#ff0000] hover:bg-[#e23325] text-white"
              disabled={pin.length !== 4 || (isSettingPin && confirmPin.length !== 4)}
            >
              {isSettingPin ? "Set PIN" : "Unlock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
