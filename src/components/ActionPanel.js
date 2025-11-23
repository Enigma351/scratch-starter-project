import React from "react";
import { Trash2 } from "lucide-react";

export default function ActionPanel({
  sprite,
  blocks,
  onDrop,
  onUpdateBlock,
  onRemoveBlock,
}) {
  return (
    <aside
      className="w-full md:w-80 lg:w-96 bg-slate-900/70 backdrop-blur border-l border-slate-700 p-4 
                 overflow-y-auto max-h-[40vh] md:max-h-none"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="mb-4">
        <h3 className="text-slate-200 font-semibold text-lg">
          Actions:{" "}
          <span className="text-slate-400">{sprite?.name || "Select a sprite"}</span>
        </h3>

        <p className="text-slate-500 text-xs mt-1">
          {blocks.length} block{blocks.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-full"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-200 text-sm font-medium capitalize flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    block.type === "say" || block.type === "think"
                      ? "bg-blue-400"
                      : "bg-green-400"
                  }`}
                ></span>
                {block.type}
              </span>

              <button
                onClick={() => onRemoveBlock(block.id)}
                className="text-red-400 hover:text-red-300 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {block.type === "move" && (
              <div className="space-y-1">
                <label className="text-slate-400 text-xs">Steps</label>
                <input
                  type="number"
                  value={block.value}
                  onChange={(e) =>
                    onUpdateBlock(block.id, "value", Number(e.target.value))
                  }
                  className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                />
              </div>
            )}

            {block.type === "turn" && (
              <div className="space-y-1">
                <label className="text-slate-400 text-xs">Degrees</label>
                <input
                  type="number"
                  value={block.value}
                  onChange={(e) =>
                    onUpdateBlock(block.id, "value", Number(e.target.value))
                  }
                  className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                />
              </div>
            )}

            {block.type === "goto" && (
              <div className="flex gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-slate-400 text-xs">X</label>
                  <input
                    type="number"
                    value={block.x}
                    onChange={(e) =>
                      onUpdateBlock(block.id, "x", Number(e.target.value))
                    }
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-slate-400 text-xs">Y</label>
                  <input
                    type="number"
                    value={block.y}
                    onChange={(e) =>
                      onUpdateBlock(block.id, "y", Number(e.target.value))
                    }
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {block.type === "repeat" && (
              <div className="space-y-1">
                <label className="text-slate-400 text-xs">Times</label>
                <input
                  type="number"
                  value={block.value}
                  onChange={(e) =>
                    onUpdateBlock(block.id, "value", Number(e.target.value))
                  }
                  className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                />
              </div>
            )}

            {(block.type === "say" || block.type === "think") && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-xs">Message</label>
                  <input
                    type="text"
                    value={block.text}
                    onChange={(e) =>
                      onUpdateBlock(block.id, "text", e.target.value)
                    }
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-xs">Duration (sec)</label>
                  <input
                    type="number"
                    value={block.duration}
                    onChange={(e) =>
                      onUpdateBlock(block.id, "duration", Number(e.target.value))
                    }
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded border border-slate-700 text-sm outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="text-center py-10 border border-dashed border-slate-700 rounded-lg bg-slate-800/40">
            <p className="text-slate-400 text-sm font-medium">Drop blocks here</p>
            <p className="text-slate-500 text-xs mt-1">Start building actions</p>
          </div>
        )}
      </div>
    </aside>
  );
}
