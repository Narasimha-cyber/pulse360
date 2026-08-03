"use client"
import { useState, useEffect } from 'react'

export default function IntroModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('intro_shown_v2')
    if(!visited) {
      setTimeout(() => setShow(true), 500)
      localStorage.setItem('intro_shown_v2', 'true')
    }
  }, [])

  if(!show) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-3 text-red-600">AP News Live 🔥</h2>
        <p className="mb-6 text-gray-600">Real-time News, AP Top 10, and Live Visitors</p>
        <button
          onClick={() => setShow(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Start Reading
        </button>
      </div>
    </div>
  )
}
