"use client";
import { useState, useEffect } from "react";

// Maze config: 0 = open path, 1 = wall, 2 = memory point
const mazeMap = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,2,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,2,0,0,1,0,1],
  [1,1,1,0,1,1,0,1,0,1],
  [1,2,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

// Initial position of avatar
const initialPos = { x: 1, y: 1 };

export default function MazeGame() {
  const [pos, setPos] = useState(initialPos);
  const [collected, setCollected] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // Memory messages for each memory point cell (x,y)
  const memoryPoints: Record<string, string> = {
    "7-1": "Memory 1: Remember our first trip together? 🎒",
    "4-5": "Memory 2: That epic birthday cake! 🎂",
    "1-7": "Memory 3: The surprise party we planned! 🎉",
  };

  // Handle avatar move with arrow keys
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      let newX = pos.x;
      let newY = pos.y;

      if (e.key === "ArrowUp") newY--;
      else if (e.key === "ArrowDown") newY++;
      else if (e.key === "ArrowLeft") newX--;
      else if (e.key === "ArrowRight") newX++;

      // Check boundaries and walls
      if (
        newY >= 0 &&
        newY < mazeMap.length &&
        newX >= 0 &&
        newX < mazeMap[0].length &&
        mazeMap[newY][newX] !== 1
      ) {
        setPos({ x: newX, y: newY });

        // Check if landed on memory point
        if (mazeMap[newY][newX] === 2) {
          const key = `${newX}-${newY}`;
          if (!collected.includes(newY * 10 + newX)) {
            setCollected((prev) => [...prev, newY * 10 + newX]);
            setMessage(memoryPoints[key] || "A special memory!");
            setTimeout(() => setMessage(null), 4000);
          }
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [pos, collected]);

  return (
    <div className="maze-game p-4 bg-black text-green-400 font-mono rounded-lg shadow-lg max-w-md h-[600px] flex flex-col">
      <h2 className="text-center font-bold mb-3">Memory Maze 🎮</h2>
      <div className="maze-grid grid grid-cols-10 gap-0.5 flex-1 select-none">
        {mazeMap.map((row, y) =>
          row.map((cell, x) => {
            const isAvatar = pos.x === x && pos.y === y;
            const isMemory = cell === 2;
            return (
              <div
                key={`${x}-${y}`}
                className={`w-8 h-8 flex items-center justify-center
                  ${cell === 1 ? "bg-green-900" : "bg-green-800"}
                  ${isMemory ? "bg-yellow-600" : ""}
                  ${isAvatar ? "bg-green-400 text-black font-bold" : ""}
                `}
              >
                {isAvatar ? "😊" : isMemory ? "🎁" : ""}
              </div>
            );
          })
        )}
      </div>
      <div className="mt-4 text-center">
        <p>Memories collected: {collected.length} / 3</p>
        {collected.length === 3 && (
          <p className="mt-2 font-bold text-yellow-300">
            🎉 You unlocked the secret surprise! 🎉
          </p>
        )}
      </div>
      {message && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-900 p-3 rounded shadow-lg max-w-sm text-center font-semibold animate-fadeInOut">
          {message}
        </div>
      )}

      <style jsx>{`
        .animate-fadeInOut {
          animation: fadeInOut 4s ease forwards;
        }
        @keyframes fadeInOut {
          0%, 100% {opacity: 0;}
          10%, 90% {opacity: 1;}
        }
      `}</style>
      <p className="mt-3 text-xs italic text-green-600">
        Use arrow keys to move avatar.
      </p>
    </div>
  );
}

