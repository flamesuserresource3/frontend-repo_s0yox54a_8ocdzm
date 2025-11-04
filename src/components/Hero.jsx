import React from 'react'
import Spline from '@splinetool/react-spline'
import { Search } from 'lucide-react'

const Hero = ({ searchQuery, onSearchChange }) => {
  return (
    <section className="relative w-full h-[320px] overflow-hidden bg-white">
      <Spline
        scene="https://prod.spline.design/mWY-FNsBVpRvZHS5/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Soft gradient vignette to enhance text readability without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          MedTok — Short, high-yield medical videos
        </h1>
        <p className="mt-2 text-slate-600 text-center text-sm max-w-md">
          Learn faster with bite-sized clips from physicians and top educators.
        </p>

        <div className="mt-4 w-full max-w-sm">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-full border border-slate-200 px-3 py-2 shadow-sm">
            <Search className="h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search topics or doctors"
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
