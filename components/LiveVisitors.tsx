"use client"
import { useState, useEffect } from 'react'

export default function LiveVisitors() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 50) + 30)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, Math.random() * 10000 + 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold animate-pulse">
      <span className="w-2 h-2 bg-white rounded-full"></span>
      {count} Live Visitors
    </div>
  )
}
