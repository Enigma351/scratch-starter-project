import React from 'react';
import { Play } from 'lucide-react';

// Header

export default function Header({ onPlay, isPlaying }) {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-4 sm:px-6 py-4 shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold text-white">
            Sprite Scratch
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Interact with animations
          </p>
        </div>

        {/* Play Button */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className={`
            flex items-center justify-center gap-2 
            px-4 sm:px-5 py-2 rounded-md text-sm font-medium transition
            w-full sm:w-auto
            ${
              isPlaying
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white
          `}
        >
          <Play size={18} />
          {isPlaying ? 'Running...' : 'Run'}
        </button>
      </div>
    </header>
  );
}
