import React from 'react';

//Canvas

export default function Canvas({ sprites, onSpriteClick, selectedSprite }) {
  return (
    <div className="flex-1 relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.25) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />
      </div>

      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className="absolute transition-all duration-200 ease-out"
          style={{
            left: sprite.position.x,
            top: sprite.position.y,
            transform: `rotate(${sprite.rotation}deg) scale(${sprite.scale})`,
          }}
        >
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform ${
                selectedSprite === sprite.id
                  ? 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-slate-900'
                  : 'ring-2 ring-white/20'
              } hover:scale-105 active:scale-95`}
              style={{ backgroundColor: sprite.color }}
              onClick={() => onSpriteClick(sprite.id)}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-semibold text-xl">
                {sprite.name[0]}
              </div>
            </div>

            
            {sprite.message && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-slate-900 px-3 py-1.5 rounded-md shadow-lg text-sm">
                {sprite.message}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white"></div>
              </div>
            )}
          </div>
        </div>
      ))}

      {sprites.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-slate-300/60 text-center">
            <p className="text-xl mb-1">No sprites yet</p>
            <p className="text-xs">Add one to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}
