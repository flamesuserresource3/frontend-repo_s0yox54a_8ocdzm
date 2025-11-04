import React from 'react'

const CategoryTabs = ({ categories, selected, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3">
      <div className="flex items-center gap-2 px-4 min-w-max">
        {['For You', 'All', ...categories].map((cat) => {
          const isActive = selected === cat
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors border ${
                isActive
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryTabs
