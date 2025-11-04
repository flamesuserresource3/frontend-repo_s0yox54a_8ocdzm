import React, { useEffect, useState } from 'react'

const OnboardingModal = ({ open, onClose, categories, onSave }) => {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (!open) setSelected([])
  }, [open])

  const toggle = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            Choose your interests
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Select topics you want to learn. Your home feed will prioritize these.
          </p>
        </div>

        <div className="p-5 grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={`rounded-xl border px-3 py-2 text-sm text-left transition ${
                selected.includes(cat)
                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="p-5 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800"
          >
            Not now
          </button>
          <button
            onClick={() => {
              onSave(selected)
              onClose()
            }}
            className="px-4 py-2 rounded-full bg-teal-500 text-white font-medium"
            disabled={selected.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal
