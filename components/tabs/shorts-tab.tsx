"use client"

import { useState } from "react"
import FilterChips from "@/components/filter-chips"
import ShortsCard from "@/components/shorts-card"

const filters = [
  { id: "compass", label: "", icon: "compass", active: false },
  { id: "all", label: "All", active: true },
  { id: "under10", label: "Under 10 min", active: false },
  { id: "music", label: "Music", active: false },
  { id: "manga", label: "Manga", active: false },
]

const shorts = [
  {
    id: "1",
    title: "Config 2022 Opening Keynote - Dylan Field",
    views: "1.6M",
    thumbnail: "config keynote short",
  },
  {
    id: "2",
    title: "Config 2022 Opening Keynote - Dylan Field",
    views: "892K",
    thumbnail: "config keynote short 2",
  },
  {
    id: "3",
    title: "Config 2022 Opening Keynote - Dylan Field",
    views: "2.1M",
    thumbnail: "config keynote short 3",
  },
]

export default function ShortsTab() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex flex-col h-full">
      {/* Filter Chips */}
      <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} hasCompass={true} />

      {/* Featured Video */}
      <div className="px-4 mb-4">
        <div className="relative bg-[#272727] rounded-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-[#272727] to-[#0f0f0f] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff0000] rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            12:40
          </div>
        </div>

        <div className="flex items-start gap-3 mt-3">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-black rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-medium line-clamp-2">Config 2022 Opening Keynote - Dylan Field</h3>
            <p className="text-[#d9d9d9] text-xs mt-1">Figma • 437K views • 7 days ago</p>
          </div>
        </div>
      </div>

      {/* Shorts Section */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#ff0000] rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
          </div>
          <h2 className="text-white text-lg font-medium">Shorts</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {shorts.map((short) => (
            <ShortsCard key={short.id} short={short} />
          ))}
        </div>
      </div>
    </div>
  )
}
