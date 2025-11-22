import React, { useState, useRef } from "react";
import Header from "./components/Header";
import BlockPalette from "./components/BlockPalette";
import Canvas from "./components/Canvas";
import ActionPanel from "./components/ActionPanel";
import SpriteList from "./components/SpriteList";
import { SPRITE_COLORS } from "./utils/constants";
import { findCollisionPairs } from "./utils/collisions";

export default function App() {
  const [sprites, setSprites] = useState([
    {
      id: "1",
      name: "Cat",
      position: { x: 120, y: 180 }, // left
      rotation: 0,
      message: "",
      messageTimeout: null,
      color: SPRITE_COLORS[0],
      scale: 1,
    },
    {
      id: "2",
      name: "Dog",
      position: { x: 420, y: 180 }, // right, same horizontal line
      rotation: 0,
      message: "",
      messageTimeout: null,
      color: SPRITE_COLORS[1],
      scale: 1,
    },
  ]);

  const [selectedSprite, setSelectedSprite] = useState("1");
  const [actionBlocks, setActionBlocks] = useState({ "1": [], "2": [] });

  const [isPlaying, setIsPlaying] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const executionState = useRef({});

  const addSprite = () => {
    const newId = Date.now().toString();
    const newSprite = {
      id: newId,
      name: `Sprite ${sprites.length + 1}`,
      position: { x: 150, y: 180 }, 
      rotation: 0,
      message: "",
      messageTimeout: null,
      color: SPRITE_COLORS[sprites.length % SPRITE_COLORS.length],
      scale: 1,
    };
    setSprites((p) => [...p, newSprite]);
    setActionBlocks((p) => ({ ...p, [newId]: [] }));
    setSelectedSprite(newId);
  };

  const deleteSprite = (id) => {
    if (sprites.length <= 1) return;
    setSprites((p) => p.filter((s) => s.id !== id));
    setActionBlocks((p) => {
      const copy = { ...p };
      delete copy[id];
      return copy;
    });
    if (selectedSprite === id && sprites.length > 1) {
      setSelectedSprite(sprites[0].id);
    }
  };

  const duplicateSprite = (id) => {
    const base = sprites.find((s) => s.id === id);
    if (!base) return;
    const newId = Date.now().toString();
    const copy = {
      ...base,
      id: newId,
      name: `${base.name} Copy`,
      position: { x: base.position.x + 40, y: base.position.y },
    };
    setSprites((p) => [...p, copy]);
    setActionBlocks((p) => ({ ...p, [newId]: [...(p[id] || [])] }));
  };

  // Block helpers
 
  const createBlock = (t) => ({
    id: Date.now().toString() + Math.random(),
    type: t.type,
    value: t.defaultValue,
    x: t.defaultX,
    y: t.defaultY,
    text: t.defaultText,
    duration: t.defaultDuration,
  });

  const handleDragStart = (e, template) => {
    setDraggedBlock(createBlock(template));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = () => {
    if (!draggedBlock) return;
    setActionBlocks((prev) => ({
      ...prev,
      [selectedSprite]: [...(prev[selectedSprite] || []), draggedBlock],
    }));
    setDraggedBlock(null);
  };

  const updateBlock = (id, field, value) => {
    setActionBlocks((prev) => {
      const list = (prev[selectedSprite] || []).map((b) =>
        b.id === id ? { ...b, [field]: value } : b
      );
      return { ...prev, [selectedSprite]: list };
    });
  };

  const removeBlock = (id) => {
    setActionBlocks((prev) => ({
      ...prev,
      [selectedSprite]: (prev[selectedSprite] || []).filter((b) => b.id !== id),
    }));
  };

  // Swap logic (Option B)
 
  const makePairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

  const fullSwapAnimations = (idA, idB) => {
    setActionBlocks((prev) => {
      const blocksA = prev[idA] || [];
      const blocksB = prev[idB] || [];
      return { ...prev, [idA]: [...blocksB], [idB]: [...blocksA] };
    });

    const run = executionState.current;
    if (!run[idA] || !run[idB]) return;

    const tempBlocks = run[idA].blocks;
    run[idA].blocks = run[idB].blocks;
    run[idB].blocks = tempBlocks;

    run[idA].blockIndex = 0;
    run[idB].blockIndex = 0;

    run[idA].repeatStack = [];
    run[idB].repeatStack = [];

    run.swappedPairs = run.swappedPairs || new Set();
    run.swappedPairs.add(makePairKey(idA, idB));
  };

  //helpers
 
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const stepMove = async (spriteId, totalDistance) => {
    const step = 6; 
    const steps = Math.max(1, Math.ceil(Math.abs(totalDistance) / step));
    const perStepDistance = totalDistance / steps;

    for (let i = 0; i < steps; i++) {
      setSprites((prev) => {
        const list = prev.map((s) => ({ ...s })); // shallow copy of sprites
        const sp = list.find((x) => x.id === spriteId);
        if (!sp) return prev;
        const rad = (sp.rotation * Math.PI) / 180;
        sp.position.x += Math.cos(rad) * perStepDistance;
        sp.position.y += Math.sin(rad) * perStepDistance;
        return list;
      });

      await sleep(60);

      const curr = executionState.current;
      const currentSprites = getSpritesSnapshot();
      const hits = findCollisionPairs(currentSprites);

      if (hits.length > 0) {
        for (let [i, j] of hits) {
          const a = currentSprites[i].id;
          const b = currentSprites[j].id;
          if (a === spriteId || b === spriteId) {
            const key = makePairKey(a, b);
            curr.swappedPairs = curr.swappedPairs || new Set();
            if (!curr.swappedPairs.has(key)) {
              fullSwapAnimations(a, b);
            }
            return;
          }
        }
      }
    }
  };

  
  const getSpritesSnapshot = () => {
    return sprites.map((s) => ({ ...s }));
  };

 
  // Main execution
 
  const executeActions = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    executionState.current = {};
    const run = executionState.current;

    sprites.forEach((s) => {
      run[s.id] = {
        blocks: [...(actionBlocks[s.id] || [])],
        blockIndex: 0,
        repeatStack: [],
      };
    });
    run.swappedPairs = new Set();

    const runners = sprites.map((s) => runSpriteLoop(s.id));
    await Promise.all(runners);

    setIsPlaying(false);
  };

  const runSpriteLoop = async (spriteId) => {
    const state = executionState.current[spriteId];
    if (!state) return;

    while (state.blockIndex < state.blocks.length) {
      const block = state.blocks[state.blockIndex];

      if (!block) {
        state.blockIndex++;
        continue;
      }

      if (block.type === "repeat") {
        state.repeatStack.push({
          count: Math.max(1, block.value || 1),
          current: 0,
          startIndex: state.blockIndex,
        });
        state.blockIndex++;
        continue;
      }

      
      if (block.type === "move") {
        await stepMove(spriteId, block.value || 0);
      } else if (block.type === "turn") {
        setSprites((prev) =>
          prev.map((sp) =>
            sp.id === spriteId ? { ...sp, rotation: sp.rotation + (block.value || 0) } : sp
          )
        );
        await sleep(250);
      } else if (block.type === "goto") {
        setSprites((prev) =>
          prev.map((sp) =>
            sp.id === spriteId
              ? { ...sp, position: { x: block.x ?? 0, y: block.y ?? 0 } }
              : sp
          )
        );
        await sleep(300);
      } else if (block.type === "say" || block.type === "think") {
        setSprites((prev) =>
          prev.map((sp) =>
            sp.id === spriteId ? { ...sp, message: block.text || "" } : sp
          )
        );

        const duration = (block.duration || 1) * 1000;
        setTimeout(() => {
          setSprites((p) => p.map((sp) => (sp.id === spriteId ? { ...sp, message: "" } : sp)));
        }, duration);
        await sleep(duration);
      } else {

        await sleep(150);
      }

      const currentState = executionState.current[spriteId];
      currentState.blockIndex++;

      while (currentState.repeatStack.length > 0) {
        const top = currentState.repeatStack[currentState.repeatStack.length - 1];
        top.current++;
        if (top.current < top.count) {
          currentState.blockIndex = top.startIndex + 1;
          break;
        } else {
          currentState.repeatStack.pop();
        }
      }
    }
  };

 
  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Header onPlay={executeActions} isPlaying={isPlaying} />

      <div className="flex-1 flex overflow-hidden">
        <BlockPalette onDragStart={handleDragStart} />

        <main className="flex-1 flex flex-col">
          <Canvas
            sprites={sprites}
            selectedSprite={selectedSprite}
            onSpriteClick={setSelectedSprite}
          />

          <SpriteList
            sprites={sprites}
            selectedSprite={selectedSprite}
            onSelectSprite={setSelectedSprite}
            onAddSprite={addSprite}
            onDeleteSprite={deleteSprite}
            onDuplicateSprite={duplicateSprite}
          />
        </main>

        <ActionPanel
          sprite={sprites.find((s) => s.id === selectedSprite)}
          blocks={actionBlocks[selectedSprite] || []}
          onDrop={handleDrop}
          onUpdateBlock={updateBlock}
          onRemoveBlock={removeBlock}
        />
      </div>
    </div>
  );
}
