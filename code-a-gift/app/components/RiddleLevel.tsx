import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import riddles from "../data/riddles";


type Props = {
  level: number;
};

export default function RiddleLevel({ level }: Props) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const riddle = riddles.find((r) => r.id === level);

  useEffect(() => {
    if (level > 1 && !localStorage.getItem(`level_${level - 1}`)) {
      router.push(`/levels/${level - 1}`);
    }
  }, [level, router]);

  const handleCheck = () => {
    if (input.toLowerCase().trim() === riddle?.answer.toLowerCase()) {
      localStorage.setItem(`level_${level}`, "unlocked");
      if (level === riddles.length) {
        router.push("/congrats");
      } else {
        router.push(`/levels/${level + 1}`);
      }
    } else {
      setStatus("Try again... chutney not yet.");
    }
  };

  if (!riddle) return <p>No riddle found for level {level}.</p>;

  return (
    <div>
      <p className="text-lg mb-4">{riddle.question}</p>
      <input
        className="bg-black border-b border-green-400 text-green-300 w-full py-1 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
      />
      <button
        onClick={handleCheck}
        className="border px-3 py-1 hover:bg-green-800"
      >
        Submit
      </button>
      {status && <p className="mt-2 text-red-400">{status}</p>}
    </div>
  );
}
