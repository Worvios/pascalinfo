"use client";

import { useState, useCallback } from "react";
import { ReactNode } from "react";

// Define a more specific type for the icon
// You can adjust this based on what your icon actually is
type IconType = ReactNode | React.ComponentType<{ className?: string }>;

// Define the Program interface without any 'any' types
interface Program {
  icon: IconType;
  title: string;
  text: string;
  rotateX: number;
  rotateY: number;
  // Replace [key: string]: any with more specific optional properties
  // that you might need for your programs
  link?: string;
  color?: string;
  description?: string;
  difficulty?: string;
  duration?: string;
  category?: string;
  tags?: string[];
}

export default function use3DCardEffect(initialPrograms: Program[]) {
  const [programs, setPrograms] = useState(initialPrograms);

  const handleCardMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      const card = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - card.left;
      const y = e.clientY - card.top;
      const centerX = card.width / 2;
      const centerY = card.height / 2;

      setPrograms((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                rotateX: -(y - centerY) / 20,
                rotateY: (x - centerX) / 20,
              }
            : p
        )
      );
    },
    []
  );

  const handleCardLeave = useCallback((index: number) => {
    setPrograms((prev) =>
      prev.map((p, i) => (i === index ? { ...p, rotateX: 0, rotateY: 0 } : p))
    );
  }, []);

  return {
    programs,
    handleCardMove,
    handleCardLeave,
  };
}
