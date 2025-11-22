import React from 'react';
import { Plus, Trash2, Copy } from 'lucide-react';

//SpriteList

export default function SpriteList({
  sprites,
  selectedSprite,
  onSelectSprite,
  onAddSprite,
  onDeleteSprite,
  onDuplicateSprite,
}) {
  return (
    <div className="h-64 bg-slate-900/80 backdrop-blur-xl border-t border-purple-500/30 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-purple-300 font-semibold text-lg">Manage your Sprites</h3>
          <p className="text-purple-300/60 text-xs mt-1">
            {sprites.length} sprite{sprites.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={onAddSprite}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
        >
          <Plus size={15} />
          Add
        </button>
      </div>

      {/* Sprite Grid */}
      <div className="grid grid-cols-3 gap-3">
        {sprites.map((sprite) => (
          <div
            key={sprite.id}
            onClick={() => onSelectSprite(sprite.id)}
            className={`relative p-3 rounded-xl cursor-pointer transition-colors ${
              selectedSprite === sprite.id
                ? 'bg-slate-800 ring-2 ring-cyan-400 shadow-lg'
                : 'bg-slate-800/50 hover:bg-slate-800 border border-purple-500/20'
            }`}
          >
            {/* Sprite icon bubble */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/20"
                style={{ backgroundColor: sprite.color }}
              >
                <span className="text-white font-bold text-lg">
                  {sprite.name[0]}
                </span>
              </div>

              {/* Sprite details */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{sprite.name}</p>
                <p className="text-purple-300/50 text-xs">
                  ({Math.round(sprite.position.x)}, {Math.round(sprite.position.y)})
                </p>
              </div>
            </div>

            {/* Hover actions */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicateSprite(sprite.id);
                }}
                className="p-1.5 bg-cyan-500 hover:bg-cyan-600 rounded transition-colors"
                title="Duplicate"
              >
                <Copy size={12} className="text-white" />
              </button>

              {sprites.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSprite(sprite.id);
                  }}
                  className="p-1.5 bg-red-500 hover:bg-red-600 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
