"use client"
import Home from "./pages";
import { useState, useEffect } from "react";
import MazeGame from "./pages/MazeGame";

function RetroChat() {
  const messages = [
    { id: 1, sender: "Alice", text: "Hey Mounika! 🎉 Happy Birthday! 🥳" },
    { id: 2, sender: "Bob", text: "Wishing you all the best today 💚" },
    { id: 3, sender: "Charlie", text: "Have a blast and enjoy your day! 🎂" },
    { id: 4, sender: "Diana", text: "Can’t wait to celebrate together soon!" },
    { id: 5, sender: "Eve", text: "Stay awesome and keep shining! ✨" },
  ];

  const [displayedMsgs, setDisplayedMsgs] = useState<typeof messages>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setDisplayedMsgs((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="retro-chat p-4 bg-black text-green-400 font-mono rounded-lg shadow-lg max-w-sm h-[600px] flex flex-col">
      <div className="chat-header border-b border-green-600 pb-2 mb-4 text-center font-bold text-lg">
        Friend's Chat
      </div>
      <div className="chat-messages flex-1 overflow-y-auto space-y-4">
      {displayedMsgs.filter(Boolean).map(({ id, sender, text }) => (
  <div key={`${id}-${sender}`} className="message ...">
    <span className="font-bold">{sender}: </span>
    <span>{text}</span>
  </div>
))}


      </div>
      <div className="chat-input mt-4 text-sm text-green-700 italic text-center">
        Retro chat simulation
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-green-400 font-mono">
      {/* Left + Center container */}
      <div className="flex flex-col md:flex-row flex-1 overflow-auto">
        {/* Left: MazeGame */}
        <div className="flex-[1] p-4 md:p-6 border-b md:border-b-0 md:border-r border-green-600 overflow-auto">
          <MazeGame />
        </div>

        {/* Center: Home */}
        <div className="flex-[2] p-4 md:p-6 overflow-auto">
          <Home />
        </div>
      </div>

      {/* Right: Retro chat sidebar */}
      <div className="w-full md:w-[320px] p-4 md:p-6 border-t md:border-t-0 md:border-l border-green-600 overflow-auto">
        <RetroChat />
      </div>
    </div>
  );
}


