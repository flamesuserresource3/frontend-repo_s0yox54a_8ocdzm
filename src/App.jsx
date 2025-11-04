import React, { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import CategoryTabs from './components/CategoryTabs'
import OnboardingModal from './components/OnboardingModal'
import VideoFeed from './components/VideoFeed'

const ALL_CATEGORIES = [
  'Anatomy',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Emergency Medicine',
  'Pharmacology',
  'Radiology',
  'Pulmonology',
  'Dermatology',
]

function App() {
  const [openOnboarding, setOpenOnboarding] = useState(false)
  const [interests, setInterests] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('For You')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('medtok_interests')
    if (stored) {
      setInterests(JSON.parse(stored))
    } else {
      setOpenOnboarding(true)
    }
  }, [])

  const saveInterests = (list) => {
    setInterests(list)
    localStorage.setItem('medtok_interests', JSON.stringify(list))
  }

  // Keep selected tab valid
  useEffect(() => {
    if (selectedCategory !== 'For You' && selectedCategory !== 'All') {
      if (!ALL_CATEGORIES.includes(selectedCategory)) {
        setSelectedCategory('For You')
      }
    }
  }, [selectedCategory])

  const headerTitle = useMemo(() => {
    if (selectedCategory === 'For You') return 'For You'
    if (selectedCategory === 'All') return 'All Topics'
    return selectedCategory
  }, [selectedCategory])

  return (
    <div className="min-h-screen w-full bg-white text-slate-800">
      {/* Hero with DNA Spline and search */}
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Tabs for topic browsing */}
      <CategoryTabs
        categories={ALL_CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Section header */}
      <div className="px-4 pb-2">
        <h2 className="text-lg font-semibold">{headerTitle}</h2>
        <p className="text-xs text-slate-500">
          Clean, mobile-first feed with medical colors and minimal UI
        </p>
      </div>

      {/* TikTok-style vertical video feed */}
      <VideoFeed
        selectedCategory={selectedCategory}
        interests={interests}
        searchQuery={searchQuery}
      />

      {/* Onboarding to choose interests */}
      <OnboardingModal
        open={openOnboarding}
        onClose={() => setOpenOnboarding(false)}
        categories={ALL_CATEGORIES}
        onSave={saveInterests}
      />

      {/* Mobile safe-area padding */}
      <div className="h-6" />
    </div>
  )
}

export default App
