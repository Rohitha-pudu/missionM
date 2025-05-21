"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timelineData = [
  {
    date: "Feb 2025",
    text: "She said 'chaat' but ended up ordering pizza. Classic.",
    image: "/feb.jpg",
  },
  {
    date: "March 2025",
    text: "You laughed for 13 mins over 'chunchu moham'. Unbeatable record.",
    video: "/march.mp4",
  },
  {
    date: "April 2025",
    text: "Survived midnights of code and midnight snacks 🍜",
    image: "/april.jpg",
  },
  {
    date: "May 2025",
    text: "And now... The chaos reaches peak on her birthday 🎉",
    image: "/may.jpg",
  },
];

// Helper typed text effect inside timeline popup
function TypedLine({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="text-green-300 font-mono whitespace-pre-line">{displayed}</p>;
};

// The correct answer for the riddle — you can customize this:
const correctRiddleAnswer = "code";

export default function TimelinePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Show the "downloaded" button after some time
  useEffect(() => {
    const timer = setTimeout(() => setDownloaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const startDownloadAnimation = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setAccessGranted(true);
    }, 2500);
  };

  const handleUnlock = () => {
    if (answer.trim().toLowerCase() === correctRiddleAnswer) {
      setError(false);
      startDownloadAnimation();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setAccessGranted(false);
    setIsDownloading(false);
    setAnswer("");
    setError(false);
  };

  return (
    <div className="mt-10 flex justify-center">
      {!showPopup && (
        <motion.button
          onClick={() => downloaded && setShowPopup(true)}
          disabled={!downloaded}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black border border-green-500 text-green-400 px-8 py-3 rounded font-mono hover:bg-green-800 hover:text-white transition shadow-lg"
        >
          {!downloaded ? (
            <motion.span
              key="downloading"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 360 }}
            >
              Downloading timeline data...
            </motion.span>
          ) : (
            "🔐 Unlock Timeline"
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black border-2 border-green-500 rounded-lg p-6 max-w-3xl w-full text-green-300 font-mono shadow-lg relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {!accessGranted && !isDownloading && (
                <>
                  <p className="mb-4 text-lg">
                    Solve this riddle to unlock the timeline:
                  </p>
                  <p className="mb-6 italic text-green-400">
                    "I am the language without words but full of logic.<br />
                    Without me, your code-a-gift wouldn’t be magic.<br />
                    What am I?"
                  </p>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setError(false);
                    }}
                    className="w-full px-4 py-2 mb-2 bg-black border border-green-600 rounded text-green-300 font-mono focus:outline-none focus:border-green-400"
                    placeholder="Enter your answer here"
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-600 font-bold mb-2 text-center">❌ Access Denied! Try again.</p>
                  )}
                  <button
                    onClick={handleUnlock}
                    className="w-full bg-green-600 text-black py-3 rounded hover:bg-green-700 transition font-bold"
                  >
                    🔓 Unlock Timeline
                  </button>
                </>
              )}

              {isDownloading && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="tracking-wide text-green-400 font-mono">
                    Downloading timeline... 100%
                  </p>
                  <motion.div
                    className="w-full h-6 border border-green-600 rounded overflow-hidden bg-black relative"
                    initial={{ width: "0%" }}
                    animate={{
                      width: ["0%", "100%", "90%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut",
                      repeat: 0,
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-green-400"
                      style={{ width: "100%" }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              )}

              {accessGranted && !isDownloading && (
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
                  {timelineData.map((entry, i) => (
                    <motion.div
                      key={i}
                      className="border-l-4 border-green-500 pl-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 1.2 }}
                    >
                      <h3 className="text-green-300 font-bold text-lg mb-1">{entry.date}</h3>
                      <TypedLine text={entry.text} />
                      {entry.image && (
                        <img
                          src={entry.image}
                          alt={entry.date}
                          className="rounded mt-3 border border-green-500 shadow-md"
                        />
                      )}
                      {entry.video && (
                        <video
                          src={entry.video}
                          className="rounded mt-3 border border-green-500 shadow-md"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-green-400 hover:text-green-100 text-xl font-bold font-mono"
                title="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
