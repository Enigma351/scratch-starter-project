import React from 'react';
import { Play } from 'lucide-react';

//Header

export default function Header({ onPlay, isPlaying }) {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Sprite Scratch
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Interact with animations
          </p>
        </div>

        <button
          onClick={onPlay}
          disabled={isPlaying}
          className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition
            ${isPlaying
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white`}
        >
          <Play size={18} />
          {isPlaying ? 'Running...' : 'Run'}
        </button>
      </div>
    </header>
  );
}
