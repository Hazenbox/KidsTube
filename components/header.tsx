"use client"

import Image from "next/image"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] border-b border-[#272727]">
      {/* Status bar simulation */}
      <div className="flex items-center">
        <Image src="/icons/youtube-logo.svg" alt="YouTube" width={48} height={48} className="object-contain" />
      </div>

      <div className="flex items-center gap-4">
        <Image src="/icons/cast.png" alt="Cast" width={24} height={24} className="object-contain" />
        <Image src="/icons/notification.png" alt="Notifications" width={24} height={24} className="object-contain" />
        <Image src="/icons/search.png" alt="Search" width={24} height={24} className="object-contain" />
        <Image src="/icons/navigate.png" alt="Menu" width={24} height={24} className="object-contain" />
      </div>
    </header>
  )
}
