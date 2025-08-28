interface VideoCardProps {
  video: {
    id: string
    title: string
    channel: string
    views: string
    timestamp: string
    duration: string
    thumbnail: string
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="space-y-3">
      {/* Thumbnail */}
      <div className="relative bg-[#272727] rounded-lg overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-[#272727] to-[#0f0f0f] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#ff0000] rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 bg-black rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">{video.title}</h3>
          <p className="text-[#d9d9d9] text-xs">
            {video.channel} • {video.views} • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  )
}
