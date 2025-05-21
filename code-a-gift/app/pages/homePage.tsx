// // RootLayout.tsx or _app.tsx will already wrap this in a provider
// // Make sure Tailwind, Framer Motion, and optionally tsparticles are installed

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import EnvelopeIntro from "./components/EnvelopeIntro";
// import TerminalLayout from "./components/TerminalLayout";
// import AmbientBackground from "./components/AmbientBackground";
// import MessageUnlock from "./components/MessageUnlock";
// import MemoryCarousel from "./components/MemoryCarousel";
// import ThemeToggle from "./components/ThemeToggle";
// import ReactionPrompt from "./components/ReactionPrompt";

// export default function HomePage() {
//   const [showMessageFlow, setShowMessageFlow] = useState(false);

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <AmbientBackground />

//       <TerminalLayout>
//         <div className="absolute top-4 right-4 z-50">
//           <ThemeToggle />
//         </div>

//         <AnimatePresence>
//           {!showMessageFlow && (
//             <EnvelopeIntro onClick={() => setShowMessageFlow(true)} />
//           )}
//         </AnimatePresence>

//         {showMessageFlow && (
//           <div className="mt-16 space-y-10">
//             <MessageUnlock />
//             <MemoryCarousel />
//             <ReactionPrompt />
//           </div>
//         )}
//       </TerminalLayout>
//     </div>
//   );
// }
