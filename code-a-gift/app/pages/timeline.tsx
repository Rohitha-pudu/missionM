import TerminalLayout from "../components/TerminalLayout";
import memories from "../data/memories";


export default function Timeline() {
  return (
    <TerminalLayout>
      <h1 className="text-2xl mb-4">Memory Timeline</h1>
      <ul className="list-disc ml-6 space-y-2">
        {memories.map((mem, index) => (
          <li key={index}>
            <span className="text-green-300">{mem.date}</span>: {mem.text}
          </li>
        ))}
      </ul>
    </TerminalLayout>
  );
}
