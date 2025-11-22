import { Move, RotateCw, MessageSquare, Navigation } from "lucide-react";

//BLOCK_TEMPLATES

export const BLOCK_TEMPLATES = {
  motion: [
    {
      type: "move",
      label: "Move",
      icon: Move,
      defaultValue: 10,
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "turn",
      label: "Turn",
      icon: RotateCw,
      defaultValue: 15,
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "goto",
      label: "Go to",
      icon: Navigation,
      defaultX: 0,
      defaultY: 0,
      color: "from-blue-600 to-indigo-600",
    },
    {
      type: "repeat",
      label: "Repeat",
      icon: RotateCw,
      defaultValue: 2,
      color: "from-indigo-500 to-indigo-600",
    },
  ],

  looks: [
    {
      type: "say",
      label: "Say",
      icon: MessageSquare,
      defaultText: "Hello!",
      defaultDuration: 2,
      color: "from-purple-500 to-purple-600",
    },
    {
      type: "think",
      label: "Think",
      icon: MessageSquare,
      defaultText: "Hmm...",
      defaultDuration: 2,
      color: "from-purple-500 to-purple-600",
    },
  ],
};
