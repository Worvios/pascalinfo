"use client";

import { useState, useCallback } from "react";

interface Program {
  icon: any;
  title: string;
  text: string;
  rotateX: number;
  rotateY: number;
  [key: string]: any;
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
