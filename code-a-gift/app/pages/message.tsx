"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const correctCode = "2110";

export default function SpecialMessage() {
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const inputsRef = [useRef<HTMLInputElement>(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const timer = setTimeout(() => setDownloaded(true), 3000); // 3s download anim
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError(false);
      if (value && index < 3) inputsRef[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputsRef[index - 1].current?.focus();
      e.preventDefault();
    }
  };

  const startDownloadAnimation = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setAccessGranted(true);
    }, 2500);
  };

  const handleSubmit = () => {
    if (code.join("") === correctCode) {
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
    setCode(["", "", "", ""]);
    setError(false);
  };

  useEffect(() => {
    if (showPopup) inputsRef[0].current?.focus();
  }, [showPopup]);

  return (
    <div className="mt-8 flex justify-center relative">
      {!showPopup && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: downloaded ? 1.05 : 1 }}
          whileTap={{ scale: downloaded ? 0.95 : 1 }}
          className={`relative bg-black border border-green-500 text-green-400 px-6 py-3 rounded
            hover:bg-green-800 hover:text-white transition font-mono flex items-center justify-center
            shadow-lg
            ${downloaded ? "animate-pulse" : "cursor-not-allowed opacity-70"}`}
          onClick={() => downloaded && setShowPopup(true)}
          disabled={!downloaded}
        >
          {/* Notification Badge */}
          {!showPopup && downloaded && (
            <span
              className="absolute -top-2 -right-2 flex items-center justify-center
                bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full shadow-lg
                animate-pulse"
              aria-label="1 new message notification"
            >
              1
            </span>
          )}

          {!downloaded ? (
            <motion.span
              key="downloading"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              Checking Your Messages Mehar...
            </motion.span>
          ) : (
            "&#128236; Special Message Received!"
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black border-2 border-green-500 text-green-400 p-6 rounded-lg shadow-xl w-full max-w-lg space-y-6 font-mono relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {!accessGranted && !isDownloading && (
                <>
                  <p className="text-lg">&#128274; Access to Mounika's birthday message is protected!</p>
                  <p>Enter 4-digit passcode:</p>
                  <div className="flex justify-center space-x-4">
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        ref={inputsRef[i]}
                        className="w-12 h-16 text-center text-3xl bg-black border border-green-600 rounded outline-none text-green-400
                          focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                      />
                    ))}
                  </div>
                  {error && <p className="text-red-400 text-center">Incorrect passcode. Try again.</p>}
                  <button
                    onClick={handleSubmit}
                    className="w-full mt-3 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    &#9989; Unlock
                  </button>
                </>
              )}

              {isDownloading && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-green-400 font-mono tracking-wide">
                    Downloading message... 100%
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
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              )}

              {accessGranted && !isDownloading && (
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 0)" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="text-green-400 text-sm whitespace-pre-line leading-relaxed"
                >
                  <p className="text-lg font-bold mb-2">Message Unlocked!</p>
                  <p>
                    Hey Mounika Mehar 

                    You’re honestly one of the most dedicated and genuine people Ive met—whether its your commitment to studies or your energy during a shopping spree 

                    You give your best in everything you do. You dont give up, you adapt, and you handle chaos like a calm, stylish terminal warrior 

                    Sure... sometimes you go full-on overaction mode  but I wouldnt have it any other way. Your vibe, your laugh, your presence—its a big reason these months were full of amazing memories.

                    You re truly special. And today, on your 21st, I just want to say:
                    **Thank you for being YOU.**

                    Happy Birthday, coder queen 

                    From the chaotic debugger in your life 
                  </p>
                </motion.div>
              )}

              <button
                onClick={handleClose}
                className="mt-4 text-green-300 underline hover:text-white"
              >
                ✖ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
