"use client"

const subscriptions = [
  {
    id: "1",
    name: "Figma",
    avatar: "figma logo",
    subscribers: "1.2M",
    recentVideos: [
      { title: "Config 2022 Highlights", views: "500K", timestamp: "2 days ago" },
      { title: "Design System Updates", views: "300K", timestamp: "1 week ago" },
    ],
  },
  {
    id: "2",
    name: "Google Design",
    avatar: "google design logo",
    subscribers: "890K",
    recentVideos: [
      { title: "Material You Deep Dive", views: "750K", timestamp: "3 days ago" },
      { title: "Accessibility in Design", views: "420K", timestamp: "5 days ago" },
    ],
  },
]

export default function SubscriptionsTab() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4">
        <h1 className="text-white text-xl font-medium mb-4">Subscriptions</h1>

        <div className="space-y-6">
          {subscriptions.map((channel) => (
            <div key={channel.id} className="space-y-3">
              {/* Channel Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5ca4f8] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{channel.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{channel.name}</h3>
                  <p className="text-[#d9d9d9] text-sm">{channel.subscribers} subscribers</p>
                </div>
                <button className="bg-[#ff0000] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Subscribed
                </button>
              </div>

              {/* Recent Videos */}
              <div className="space-y-2 ml-13">
                {channel.recentVideos.map((video, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-20 h-12 bg-[#272727] rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm line-clamp-2">{video.title}</h4>
                      <p className="text-[#d9d9d9] text-xs">
                        {video.views} views • {video.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
