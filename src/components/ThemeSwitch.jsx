'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <p>Loading</p>
  )

  if (resolvedTheme === 'dark') {
    return <div className="border border-black dark:border-white p-2 rounded-md cursor-pointer" onClick={() => setTheme('light')}><FiSun /></div>
  }

  if (resolvedTheme === 'light') {
    return <div className="border border-black dark:border-white p-2 rounded-md cursor-pointer" onClick={() => setTheme('dark')}><FiMoon className="text-black" /></div>
  }

}