import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Bookmark, Share2, User, CheckCircle2, Play } from 'lucide-react'

const sampleCreators = [
  { id: 'c1', name: 'Dr. Lee', verified: true, specialty: 'Cardiology' },
  { id: 'c2', name: 'MedMastery', verified: false, specialty: 'Anatomy' },
  { id: 'c3', name: 'Dr. Gomez', verified: true, specialty: 'Emergency Medicine' },
]

const sampleVideos = [
  {
    id: 'v1',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    caption: 'ECG basics: Reading P waves to ST segments',
    hashtags: ['#Cardiology', '#ECG'],
    category: 'Cardiology',
    creatorId: 'c1',
    live: false,
  },
  {
    id: 'v2',
    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    caption: 'Brachial plexus made simple',
    hashtags: ['#Anatomy', '#Neuro'],
    category: 'Anatomy',
    creatorId: 'c2',
    live: false,
  },
  {
    id: 'v3',
    src: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    caption: 'Primary survey in trauma: ABCDE',
    hashtags: ['#Emergency', '#ATLS'],
    category: 'Emergency Medicine',
    creatorId: 'c3',
    live: true,
  },
]

const VideoCard = ({ video, onLike, onSave, liked, saved }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const creator = sampleCreators.find((c) => c.id === video.creatorId)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const play = async () => {
      try {
        await el.play()
        setIsPlaying(true)
      } catch (e) {
        setIsPlaying(false)
      }
    }
    play()
  }, [])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play()
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative h-[92vh] snap-start rounded-2xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted
        onClick={togglePlay}
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/40 rounded-full p-4">
            <Play className="text-white h-8 w-8" />
          </div>
        </div>
      )}

      {/* Top overlay: creator + live badge */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
          <div className="h-7 w-7 rounded-full bg-white/90 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-700" />
          </div>
          <div className="text-white text-sm font-medium flex items-center gap-1">
            {creator?.name}
            {creator?.verified && (
              <CheckCircle2 className="h-4 w-4 text-teal-300" />
            )}
          </div>
        </div>

        {video.live && creator?.verified && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
            LIVE
          </span>
        )}
      </div>

      {/* Bottom overlay: caption + actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-black/35 backdrop-blur px-3 py-2 rounded-xl mb-3">
          <p className="text-white text-sm leading-snug">
            {video.caption}
          </p>
          <p className="text-teal-200 text-xs mt-1">
            {video.hashtags.join(' ')}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onLike}
              className={`rounded-full p-2 bg-white/90 ${
                liked ? 'text-rose-600' : 'text-slate-700'
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={onSave}
              className={`rounded-full p-2 bg-white/90 ${
                saved ? 'text-indigo-600' : 'text-slate-700'
              }`}
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'MedTok', text: video.caption })
                } else {
                  alert('Link copied to clipboard!')
                }
              }}
              className="rounded-full p-2 bg-white/90 text-slate-700"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Live button visible only if verified doctor */}
          <div>
            {creator?.verified ? (
              <button className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                Start Live
              </button>
            ) : (
              <button
                disabled
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-500"
              >
                Live (doctors only)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoFeed = ({
  selectedCategory,
  interests,
  searchQuery,
}) => {
  const [likes, setLikes] = useState({})
  const [saved, setSaved] = useState({})
  const [items, setItems] = useState(sampleVideos)
  const containerRef = useRef(null)

  const filtered = useMemo(() => {
    let arr = items
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      arr = arr.filter((v) => {
        const creator = sampleCreators.find((c) => c.id === v.creatorId)
        return (
          v.caption.toLowerCase().includes(q) ||
          v.hashtags.join(' ').toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          creator?.name.toLowerCase().includes(q)
        )
      })
    }
    if (selectedCategory === 'For You' && interests.length > 0) {
      arr = arr.filter((v) => interests.includes(v.category))
    } else if (
      selectedCategory &&
      selectedCategory !== 'All' &&
      selectedCategory !== 'For You'
    ) {
      arr = arr.filter((v) => v.category === selectedCategory)
    }
    return arr
  }, [items, interests, selectedCategory, searchQuery])

  // Simulate infinite scrolling by appending items when near the end
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
        setItems((prev) => [...prev, ...sampleVideos.map((v) => ({ ...v, id: v.id + '-' + (prev.length + Math.random()).toString(36).slice(2, 6) }))])
      }
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-320px-56px)] snap-y snap-mandatory overflow-y-scroll no-scrollbar px-4 pb-6"
    >
      {filtered.map((v) => (
        <div key={v.id} className="mb-4">
          <VideoCard
            video={v}
            liked={Boolean(likes[v.id])}
            saved={Boolean(saved[v.id])}
            onLike={() => setLikes((s) => ({ ...s, [v.id]: !s[v.id] }))}
            onSave={() => setSaved((s) => ({ ...s, [v.id]: !s[v.id] }))}
          />
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="h-full flex items-center justify-center text-slate-500 text-sm">
          No videos match your filters.
        </div>
      )}
    </div>
  )
}

export default VideoFeed
