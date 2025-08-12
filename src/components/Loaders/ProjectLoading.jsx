import React from 'react'

function ProjectLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      {/* Title Loading */}
      <div className="mb-8">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-1 w-20 bg-gray-200"></div>
      </div>

      {/* Image Loading */}
      <div className="mb-8 h-64 bg-gray-200 rounded-lg"></div>

      {/* Buttons Loading */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
      </div>

      {/* Tags Loading */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>

      {/* Description Loading */}
      <div className="mb-8 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Contact Loading */}
      <div className="border-t pt-6">
        <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default ProjectLoading