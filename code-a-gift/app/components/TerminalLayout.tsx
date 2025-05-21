import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function TerminalLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="border border-green-400 p-4 rounded-xl shadow-lg">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
