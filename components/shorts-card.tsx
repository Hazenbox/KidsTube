interface ShortsCardProps {
  short: {
    id: string
    title: string
    views: string
    thumbnail: string
  }
}

export default function ShortsCard({ short }: ShortsCardProps) {
  return (
    <div className="space-y-2">
      <div className="relative bg-[#272727] rounded-lg overflow-hidden aspect-[9/16]">
        <div className="w-full h-full bg-gradient-to-br from-[#272727] to-[#0f0f0f] flex items-center justify-center">
          <div className="w-12 h-12 bg-[#ff0000] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-l-6 border-l-white border-t-3 border-t-transparent border-b-3 border-b-transparent ml-0.5"></div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">{short.title}</h3>
        <p className="text-[#d9d9d9] text-xs">{short.views} views</p>
      </div>
    </div>
  )
}
