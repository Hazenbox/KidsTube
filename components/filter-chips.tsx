"use client"

import Image from "next/image"

interface Filter {
  id: string
  label: string
  icon?: string
  active: boolean
}

interface FilterChipsProps {
  filters: Filter[]
  activeFilter: string
  onFilterChange: (filterId: string) => void
  hasCompass?: boolean
}

export default function FilterChips({ filters, activeFilter, onFilterChange, hasCompass = false }: FilterChipsProps) {
  return (
    <div className="px-4 py-3 border-b border-[#272727]">
      <div className="flex items-center gap-3 overflow-x-auto">
        {hasCompass && (
          <button className="flex-shrink-0 w-10 h-8 bg-[#272727] rounded-full flex items-center justify-center">
            <Image src="/icons/explore.png" alt="Explore" width={16} height={16} className="object-contain" />
          </button>
        )}
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3a3a3a]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
