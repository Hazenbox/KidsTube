"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VideoModal from "@/components/video-modal"

interface Video {
  id: string
  title: string
  description: string
  link: string
  thumbnail: string
  addedAt: string
}

export default function LibraryTab() {
  const [videos, setVideos] = useState<Video[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)

  useEffect(() => {
    const savedVideos = localStorage.getItem("library-videos")
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos))
    }
  }, [])

  const saveVideos = (newVideos: Video[]) => {
    setVideos(newVideos)
    localStorage.setItem("library-videos", JSON.stringify(newVideos))
  }

  const handleAddVideo = (videoData: Omit<Video, "id" | "addedAt">) => {
    const newVideo: Video = {
      ...videoData,
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
    }
    saveVideos([...videos, newVideo])
  }

  const handleEditVideo = (videoData: Omit<Video, "id" | "addedAt">) => {
    if (!editingVideo) return

    const updatedVideos = videos.map((video) => (video.id === editingVideo.id ? { ...video, ...videoData } : video))
    saveVideos(updatedVideos)
    setEditingVideo(null)
  }

  const handleDeleteVideo = (id: string) => {
    const updatedVideos = videos.filter((video) => video.id !== id)
    saveVideos(updatedVideos)
  }

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#272727]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-medium">Library</h1>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#ff0000] hover:bg-[#e23325] text-white rounded-full w-12 h-12 p-0"
          >
            <Image src="/icons/add.png" alt="Add" width={24} height={24} className="object-contain" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Image
            src="/icons/search.png"
            alt="Search"
            width={16}
            height={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 object-contain opacity-70"
          />
          <Input
            placeholder="Search your videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#272727] border-[#272727] text-white pl-10 rounded-full"
          />
        </div>
      </div>

      {/* Video List */}
      <div className="flex-1 overflow-y-auto">
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-[#272727] rounded-full flex items-center justify-center mb-4">
              <Image src="/icons/add.png" alt="Add" width={32} height={32} className="object-contain opacity-70" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No videos yet</h3>
            <p className="text-[#d9d9d9] text-sm mb-4">Add your favorite YouTube videos to keep them organized</p>
            <Button onClick={() => setShowModal(true)} className="bg-[#ff0000] hover:bg-[#e23325] text-white">
              Add First Video
            </Button>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-[#272727] rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="w-24 h-16 bg-[#0f0f0f] rounded flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/icons/youtube-logo.png"
                      alt="Video"
                      width={24}
                      height={18}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-[#d9d9d9] text-sm line-clamp-2 mb-2">{video.description}</p>
                    <p className="text-[#5ca4f8] text-xs truncate">{video.link}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setEditingVideo(video)
                        setShowModal(true)
                      }}
                      className="p-2 text-[#d9d9d9] hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-2 text-[#d9d9d9] hover:text-[#ff0000]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showModal && (
        <VideoModal
          video={editingVideo}
          onSave={editingVideo ? handleEditVideo : handleAddVideo}
          onClose={() => {
            setShowModal(false)
            setEditingVideo(null)
          }}
        />
      )}
    </div>
  )
}
