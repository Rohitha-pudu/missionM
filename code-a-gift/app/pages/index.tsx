"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TerminalLayout from "../components/TerminalLayout";
import SpecialMessage from "./message";
import TimelinePopup from "./TimelinePopup";

function useTypedText(text: string, speed: number = 70) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);
  return displayed;
}

function TypedLine({ text, speed = 70 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="text-green-300 whitespace-pre-line font-mono">{displayed}</p>;
}

export default function Home() {
  const router = useRouter();

  const [command, setCommand] = useState("");
  const [started, setStarted] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (command.trim().toLowerCase() === "start") {
        setStarted(true);
        setCommand("");
      } else {
        alert("Unknown command. Please type 'start' and press Enter.");
        setCommand("");
      }
    }
  };

  useEffect(() => {
    if (started) {
      const timers = [
        setTimeout(() => setLoadingStep(1), 1000),
        setTimeout(() => setLoadingStep(2), 3000),
        setTimeout(() => setLoadingStep(3), 4500),
      ];
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [started]);

  const typedLine = useTypedText(
    "Initializing birthday mission... 🎉 Loading chaos and chutney memories...",
    35
  );

  useEffect(() => {
    const typing = new Audio("/typing.mp3");
    typing.volume = 0.5;
    typing.play().catch((e) => console.warn("Typing sound not autoplaying:", e));
  }, []);

  const handleStartGame = () => {
    const music = new Audio("/retro.mp3");
    music.volume = 0.2;
    music.loop = true;
    music.play();
    router.push("/levels/1");
  };

  // ✨ Glitter trail cursor effect
  useEffect(() => {
    let lastTime = 0;
    const trail: HTMLSpanElement[] = [];

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("span");
      sparkle.innerHTML = '<span style="color: #FF0000;">&#10084;</span>';

      sparkle.style.position = "fixed";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.pointerEvents = "none";
      sparkle.style.fontSize = `${Math.random() * 8 + 10}px`;
      sparkle.style.opacity = "1";
      sparkle.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      sparkle.style.zIndex = "9999";
      sparkle.style.transform = "translateY(0px)";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.style.opacity = "0";
        sparkle.style.transform = `translateY(-10px) rotate(${Math.random() * 20 - 10}deg)`;
      }, 0);

      setTimeout(() => {
        sparkle.remove();
      }, 700);

      trail.push(sparkle);
      if (trail.length > 50) {
        const old = trail.shift();
        old?.remove();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 60) {
        createSparkle(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trail.forEach((el) => el.remove());
    };
  }, []);
  const [glitchMessage, setGlitchMessage] = useState("");

useEffect(() => {
  if (loadingStep >= 3) {
    const messages = [
      "ACCESS GRANTED TO MEMORY VAULT...",
      "INITIALIZING FRIENDSHIP PROTOCOL...",
      "DECODING HIDDEN LAUGHTER SEQUENCES...",
      "BOOTING CHAOS ENGINE...",
      "RETRIEVING SILLY SNAPSHOTS...",
      "CONNECTING TO MOUNIKA_MAINFRAME...",
      "DEPLOYING BIRTHDAY BLISS MODULE..."
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setGlitchMessage(randomMsg);
      setTimeout(() => setGlitchMessage(""), 1200);
    }, 2500);

    setTimeout(() => clearInterval(interval), 8000); // Stop after ~8s
    return () => clearInterval(interval);
  }
}, [loadingStep]);



  return (
    <TerminalLayout>
      <div className="max-w-4xl mx-auto px-6 py-10 font-mono text-green-400">
        {!started && (
          <div>
            <p className="text-green-400 text-sm">
              user@code-a-gift:~$ <span className="blink">_</span>
            </p>
            <input
              type="text"
              autoFocus
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-black text-green-400 border border-green-600 px-2 py-1 w-full max-w-xs focus:outline-none font-mono"
              placeholder="Type 'start' and press Enter"
              spellCheck={false}
              autoComplete="off"
            />
            <style jsx>{`
              .blink {
                animation: blink 1s step-start 0s infinite;
              }
              @keyframes blink {
                50% {
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )}

        {started && (
          <motion.div
            className="space-y-12 px-6 py-10 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {loadingStep < 3 && (
              <div className="text-green-400 font-mono text-sm">
                {loadingStep >= 1 && <p>Initializing  Mission  Mounika... 🎉</p>}
                {loadingStep >= 2 && <p>Entering Mounika Kingdom...</p>}
              </div>
            )}

            {loadingStep >= 3 && (
              <>
                <div className="text-green-400 text-sm font-mono">
                  <p>user@code-a-gift:~$ ./start_birthday_script.sh</p>
                  <p>{typedLine}</p>
                </div>
                {glitchMessage && (
  <motion.div
    className="fixed top-8 left-1/2 -translate-x-1/2 text-green-300 font-mono text-sm sm:text-base bg-black/80 px-4 py-2 border border-green-600 rounded shadow-md z-50 glitch"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2 }}
  >
    {glitchMessage}
  </motion.div>
)}

                <SpecialMessage />
              <motion.img
  src="/pic3.jpg"
  alt="Her smiling image"
  className="w-[700px] h-[400px] rounded-xl shadow-xl border border-green-500 object-cover"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
/>


                <motion.div
                  className="bg-black border border-green-600 text-green-300 rounded-lg p-6 text-center text-lg font-mono shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <pre className="whitespace-pre-wrap leading-snug">
{`   _____  ___  ____  _____ 
  / ___/ / _ \\|  _ \\| ____|
 | |    | | | | |_) |  _|  
 | |___ | |_| |  _ <| |___ 
  \\____| \\___/|_| \\_\\_____|  

Welcome Mounika Mehar  21 Levels of Madness Begin...
`}
                  </pre>
                </motion.div>

                <TimelinePopup />

                <motion.button
                  onClick={handleStartGame}
                  className="border px-8 py-4 text-lg bg-black text-green-300 hover:bg-green-700 transition rounded-xl mt-10 font-mono shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </TerminalLayout>
  );
}
