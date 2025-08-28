"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Video {
  id: string
  title: string
  description: string
  link: string
  thumbnail: string
  addedAt: string
}

interface VideoModalProps {
  video?: Video | null
  onSave: (video: Omit<Video, "id" | "addedAt">) => void
  onClose: () => void
}

export default function VideoModal({ video, onSave, onClose }: VideoModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (video) {
      setTitle(video.title)
      setDescription(video.description)
      setLink(video.link)
    }
  }, [video])

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    if (!link.trim()) {
      setError("YouTube link is required")
      return
    }
    if (!isValidYouTubeUrl(link)) {
      setError("Please enter a valid YouTube URL")
      return
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
      thumbnail: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#272727] rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-white text-xl font-medium mb-4">{video ? "Edit Video" : "Add Video"}</h2>

        <div className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Title *</label>
            <Input
              placeholder="Enter video title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError("")
              }}
              className="bg-[#0f0f0f] border-[#0f0f0f] text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Description</label>
            <Textarea
              placeholder="Enter video description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#0f0f0f] border-[#0f0f0f] text-white resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">YouTube Link *</label>
            <Input
              placeholder="https://youtube.com/watch?v=..."
              value={link}
              onChange={(e) => {
                setLink(e.target.value)
                setError("")
              }}
              className="bg-[#0f0f0f] border-[#0f0f0f] text-white"
            />
          </div>

          {error && <p className="text-[#ff0000] text-sm">{error}</p>}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#d9d9d9] text-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-black bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-[#ff0000] hover:bg-[#e23325] text-white">
              {video ? "Update" : "Add"} Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
