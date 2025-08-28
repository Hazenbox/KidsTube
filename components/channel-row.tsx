interface Channel {
  name: string
  avatar: string
  isActive: boolean
}

interface ChannelRowProps {
  channels: Channel[]
}

export default function ChannelRow({ channels }: ChannelRowProps) {
  return (
    <div className="px-4 py-3 border-b border-[#272727]">
      <div className="flex items-center gap-4 overflow-x-auto">
        {channels.map((channel, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-black rounded-full grid grid-cols-2 gap-0.5 p-1">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
              </div>
              {channel.isActive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#5ca4f8] rounded-full border-2 border-[#0f0f0f]"></div>
              )}
            </div>
            <span className="text-white text-xs text-center">{channel.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="w-12 h-12 bg-[#272727] rounded-full flex items-center justify-center">
            <span className="text-[#5ca4f8] text-lg font-bold">All</span>
          </div>
        </div>
      </div>
    </div>
  )
}
