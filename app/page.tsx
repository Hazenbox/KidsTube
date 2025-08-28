"use client"

import { useState, useEffect } from "react"
import { Search, Bell, Cast, MoreVertical } from "lucide-react"
import Image from "next/image"
import BottomNavigation from "@/components/bottom-navigation"
import HomeTab from "@/components/tabs/home-tab"
import ShortsTab from "@/components/tabs/shorts-tab"
import SubscriptionsTab from "@/components/tabs/subscriptions-tab"
import LibraryTab from "@/components/tabs/library-tab"
import PinModal from "@/components/pin-modal"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [showPinModal, setShowPinModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Register service worker for PWA
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          // Add a small delay to ensure the app is fully loaded
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          })

          console.log("[v0] Service Worker registered successfully:", registration)
        } catch (error) {
          console.log("[v0] Service Worker registration failed:", error)
          // Don't throw error - PWA should work without service worker
        }
      }
    }

    registerServiceWorker()
  }, [])

  const handleTabChange = (tab: string) => {
    if (tab === "library" && !isAuthenticated) {
      setShowPinModal(true)
      return
    }
    setActiveTab(tab)
  }

  const handlePinSuccess = () => {
    setIsAuthenticated(true)
    setShowPinModal(false)
    setActiveTab("library")
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />
      case "shorts":
        return <ShortsTab />
      case "subscriptions":
        return <SubscriptionsTab />
      case "library":
        return isAuthenticated ? <LibraryTab /> : <HomeTab />
      default:
        return <HomeTab />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 17h20v2H2zm1.15-4.05L4 11l.85 1.95L6.8 13l-1.95.85L4 15.8l-.85-1.95L1.2 13l1.95-.85zM6.5 3L8 6.5 11.5 8 8 9.5 6.5 13 5 9.5 1.5 8 5 6.5 6.5 3zm5.5 6L13 11.5 16.5 13 13 14.5 11.5 18 10 14.5 6.5 13 10 11.5 11.5 9z"
              fill="white"
            />
          </svg>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-full bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/icons/youtube-logo-main.svg" alt="YouTube" width={90} height={20} className="object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <Search size={20} />
          <Bell size={20} />
          <Cast size={20} />
          <MoreVertical size={20} />
        </div>
      </div>

      <main className="flex-1 pb-16 overflow-hidden">{renderActiveTab()}</main>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {showPinModal && <PinModal onSuccess={handlePinSuccess} onClose={() => setShowPinModal(false)} />}
    </div>
  )
}
