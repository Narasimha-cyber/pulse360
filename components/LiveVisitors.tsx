"use client"
import { useState, useEffect } from 'react'

export default function LiveVisitors() {
  const [count, setCount] = useState(100);

  useEffect(() => {
    const namespace = 'pulse360';
    const key = 'narasimha-live-v2';
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(() => setCount(100))
  }, []);

  return (
    <p style={{fontSize: "14px", color: "#ef4444", fontWeight: "bold", margin: 0}}>
      🔥 {count.toLocaleString('en-IN')} Live Visitors
    </p>
  )
}
