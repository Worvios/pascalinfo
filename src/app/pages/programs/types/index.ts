// types/program.ts
import { LucideIcon } from "lucide-react";

export interface Program {
  icon: LucideIcon;
  title: string;
  text: string; // Corresponds to description
  rotateX: number;
  rotateY: number;
  url: string;
  // Add originalIndex if the hook needs it internally,
  // or manage it separately in ProgramsSection
  originalIndex?: number; // Optional: if needed by the hook state
}

// You might also want to centralize TranslatedProgram if used elsewhere
export interface TranslatedProgram {
  title: string;
  description: string;
  // Add details if needed globally
  details?: {
    overview: string;
    duration: string;
    skills: string[];
    certification: string;
  };
}
