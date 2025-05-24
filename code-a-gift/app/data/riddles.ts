type Riddle = {
  id: number;
  question: string;
  answer: string;
  message: string;
};

const riddles: Riddle[] = [
  {
    id: 1,
    question: "I amm not a cake but I have layers. We have both cried here. Where am I?",
    answer: "metro",
    message: "YES! The metro diaries live on",
  },
  {
    id: 2,
    question: "My name sounds like spicy, but I am all about the sauce",
    answer: "chutney",
    message: "Chutney moham = unlocked. You are on fire",
  },
];

export default riddles;
