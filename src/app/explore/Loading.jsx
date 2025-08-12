import React from 'react'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[95vh]">
      {/* Circular spinner */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      
      {/* Loading text with fading animation */}
      <p className="text-gray-600 text-lg font-medium">
        <span className="animate-pulse [animation-delay:0ms]">L</span>
        <span className="animate-pulse [animation-delay:150ms]">o</span>
        <span className="animate-pulse [animation-delay:300ms]">a</span>
        <span className="animate-pulse [animation-delay:450ms]">d</span>
        <span className="animate-pulse [animation-delay:600ms]">i</span>
        <span className="animate-pulse [animation-delay:750ms]">n</span>
        <span className="animate-pulse [animation-delay:900ms]">g</span>
        <span className="animate-pulse [animation-delay:1050ms]">.</span>
        <span className="animate-pulse [animation-delay:1200ms]">.</span>
        <span className="animate-pulse [animation-delay:1350ms]">.</span>
      </p>
    </div>
  )
}

export default Loading