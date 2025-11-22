import React from 'react';
import { BLOCK_TEMPLATES } from '../utils/blockTemplates';

//BlockPalette

export default function BlockPalette({ onDragStart }) {
  return (
    <aside className="w-80 bg-slate-900/90 border-r border-slate-700 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Motion Section */}
        <div>
          <h3 className="text-cyan-300 font-semibold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            Motion Blocks
          </h3>

          <div className="space-y-2">
            {BLOCK_TEMPLATES.motion.map((template, idx) => {
              const Icon = template.icon;

              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => onDragStart(e, template)}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-md cursor-move hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-sm font-medium text-white">
                      {template.label}
                    </span>

                    <span className="ml-auto text-xs text-slate-300">
                      {template.type === 'move' && 'steps?'}
                      {template.type === 'turn' && 'degree?'}
                      {template.type === 'goto' && 'x->, y-> '}
                      {template.type === 'repeat' && 'times?'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Looks Section */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            Looks Blocks
          </h3>

          <div className="space-y-2">
            {BLOCK_TEMPLATES.looks.map((template, idx) => {
              const Icon = template.icon;

              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => onDragStart(e, template)}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-md cursor-move hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-sm font-medium text-white">
                      {template.label}
                    </span>

                    <span className="ml-auto text-xs text-slate-300">
                      for how many sec?
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
