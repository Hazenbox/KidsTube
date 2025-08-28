"use client"

import Image from "next/image"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    {
      id: "home",
      label: "Home",
      activeIcon: "/icons/home-active.svg",
      inactiveIcon: "/icons/home-inactive.svg",
    },
    {
      id: "shorts",
      label: "Shorts",
      activeIcon: "/icons/shorts-active.svg",
      inactiveIcon: "/icons/shorts-inactive.svg",
    },
    {
      id: "create",
      label: "",
      activeIcon: "/icons/add.png",
      inactiveIcon: "/icons/add.png",
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      activeIcon: "/icons/subscriptions-active.svg",
      inactiveIcon: "/icons/subscriptions-inactive.svg",
    },
    {
      id: "library",
      label: "Library",
      activeIcon: "/icons/library-active.svg",
      inactiveIcon: "/icons/library-inactive.svg",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#272727] px-2 py-1">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isCreateButton = tab.id === "create"

          if (isCreateButton) {
            return (
              <button key={tab.id} className="flex flex-col items-center justify-center p-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={tab.activeIcon || "/placeholder.svg"}
                    alt="Add"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 ${
                isActive ? "text-white" : "text-[#d9d9d9]"
              }`}
            >
              <Image
                src={isActive ? tab.activeIcon : tab.inactiveIcon}
                alt={tab.label}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-xs mt-1 truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </nav>
  )
}
