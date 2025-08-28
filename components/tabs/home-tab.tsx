"use client"

import { useState } from "react"
import VideoCard from "@/components/video-card"
import ChannelRow from "@/components/channel-row"
import FilterChips from "@/components/filter-chips"

const channels = [
  { name: "Kola Bear", avatar: "checkered pattern avatar", isActive: true },
  { name: "Kola Bear", avatar: "checkered pattern avatar", isActive: true },
  { name: "Kola Bear", avatar: "checkered pattern avatar", isActive: true },
  { name: "Kola Bear", avatar: "checkered pattern avatar", isActive: true },
  { name: "Kola", avatar: "checkered pattern avatar", isActive: false },
]

const videos = [
  {
    id: "1",
    title: "Config 2022 Opening Keynote - Dylan Field",
    channel: "Figma",
    views: "437K views",
    timestamp: "7 days ago",
    duration: "12:40",
    thumbnail: "config 2022 keynote thumbnail",
  },
  {
    id: "2",
    title: "How to use Figma for beginners",
    channel: "Design Course",
    views: "1.2M views",
    timestamp: "2 weeks ago",
    duration: "15:30",
    thumbnail: "figma tutorial thumbnail",
  },
  {
    id: "3",
    title: "Material Design 3 Overview",
    channel: "Google Design",
    views: "890K views",
    timestamp: "1 week ago",
    duration: "8:45",
    thumbnail: "material design 3 thumbnail",
  },
]

const filters = [
  { id: "all", label: "All", active: true },
  { id: "today", label: "Today", active: false },
  { id: "continue", label: "Continue watching", active: false },
  { id: "unwatched", label: "Unwatched", active: false },
]

export default function HomeTab() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex flex-col h-full">
      {/* Channel Row */}
      <ChannelRow channels={channels} />

      {/* Filter Chips */}
      <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Video Feed */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
